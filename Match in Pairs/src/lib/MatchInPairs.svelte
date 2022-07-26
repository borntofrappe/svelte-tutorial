<script>
  import { onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { shuffle, emojis } from "./utils.js";

  import Data from "./Data.svelte";
  import Controls from "./Controls.svelte";

  export let options = shuffle(emojis).slice(-8);
  export let gridColumns = 4;
  export let transitionDuration = 250;
  export let delayDuration = 400;

  const getCards = (options) =>
    shuffle([...options, ...options]).map((value) => ({
      value,
      flipped: false,
      locked: false,
    }));

  let cards = getCards(options);

  let preventFlip = false;
  let timeout;

  let moves = 0;
  const progress = tweened(0);

  $: matches = cards
    .filter(({ locked }) => locked)
    .map(({ value }) => value)
    .reduce(
      (acc, curr) => (acc.includes(curr) ? [...acc] : [...acc, curr]),
      []
    );
  $: progress.set(matches.length / options.length);

  onDestroy(() => {
    if (timeout) clearTimeout(timeout);
  });

  const handleFlip = () => {
    if (preventFlip) return;

    preventFlip = true;
    moves++;
  };

  const handleFlipped = () => {
    const indexes = [];
    let index = cards.findIndex(({ flipped, locked }) => flipped && !locked);
    while (index !== -1) {
      let i =
        indexes.length === 0 ? index : index + indexes[indexes.length - 1] + 1;
      indexes.push(i);
      index = cards
        .slice(i + 1)
        .findIndex(({ flipped, locked }) => flipped && !locked);
    }

    if (indexes.length < 2) {
      preventFlip = false;
    } else {
      const [i1, i2] = indexes;
      if (cards[i1].value === cards[i2].value) {
        cards[i1].locked = true;
        cards[i2].locked = true;
        preventFlip = false;
      } else {
        timeout = setTimeout(() => {
          cards[i1].flipped = false;
          cards[i2].flipped = false;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            preventFlip = false;
            clearTimeout(timeout);
          }, transitionDuration);
        }, delayDuration);
      }
    }
  };

  const handleReset = () => {
    preventFlip = true;

    const indexes = [];
    let index = cards.findIndex(({ flipped }) => flipped);
    while (index !== -1) {
      let i =
        indexes.length === 0 ? index : index + indexes[indexes.length - 1] + 1;
      indexes.push(i);
      index = cards.slice(i + 1).findIndex(({ flipped }) => flipped);
    }

    moves = 0;

    if (indexes.length === 0) {
      cards = getCards(options);
      preventFlip = false;
    } else {
      indexes.forEach((index) => {
        cards[index].flipped = false;
      });

      timeout = setTimeout(() => {
        cards = getCards(options);
        preventFlip = false;
        clearTimeout(timeout);
      }, transitionDuration);
    }
  };

  const flipCard = (i) => {
    cards[i].flipped = true;
  };
</script>

<div>
  <article>
    <Data
      progress={$progress}
      matches={matches.length}
      total={options.length}
      {moves}
    />

    <ul
      on:transitionstart={handleFlip}
      on:transitionend={handleFlipped}
      style:--grid-columns={gridColumns}
      style:--transition-duration="{transitionDuration / 1000}s"
    >
      {#each cards as { value, flipped, locked }, i}
        {@const id = `title-${value}-${i}`}
        <li>
          <button
            aria-labelledby={id}
            class:flipped
            on:click={() => {
              if (preventFlip || locked) return;
              flipCard(i);
            }}
            data-value={value}
          >
            🃏
          </button>
          <span class="visually-hidden" {id}
            >{flipped ? `Card ${value}` : "Flip card"}</span
          >
        </li>
      {/each}
    </ul>

    <Controls on:reset={handleReset} />
  </article>
</div>

<style>
  div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  article {
    gap: 0.5rem;
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
  }

  article > :global(.datum) {
    grid-column: span 1;
  }

  article > ul,
  article > :global(.controls) {
    grid-column: 1/-1;
  }

  ul {
    padding: 0;
    list-style: none;
    display: inline-grid;
    justify-content: center;
    grid-template-columns: repeat(var(--grid-columns, 4), auto);
    gap: 0.5rem;
  }

  li {
    perspective: 200px;
  }

  li button {
    border: none;
    background: none;
    margin: 0;
    transform: rotateY(0deg);
    transform-style: preserve-3d;
    transition: transform var(--transition-duration, 0.5s) ease-in-out;
    position: relative;
    z-index: 0;
  }

  li button,
  li button::before {
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    backface-visibility: hidden;
    padding: 1rem;
    background: hsl(0, 0%, 100%);
    border-radius: 0.5rem;
  }

  li button::before {
    box-sizing: border-box;
    content: attr(data-value);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
    z-index: -1;
  }

  li button.flipped {
    transform: rotateY(180deg);
  }

  li button:hover {
    background: hsl(0, 0%, 99%);
  }
</style>
