<script>
  import { onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { shuffle } from "./utils.js";

  export let options = ["👋🏻", "🧡", "✨", "🌍", "🐦", "✏️", "🔥", "🙌"];
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

<main>
  <div>
    <section>
      <progress value={$progress} />
      <p>
        Pairs matched
        <span>{matches.length}/{options.length}</span>
      </p>
    </section>

    <section>
      <p>
        Total moves
        <span>{moves}</span>
      </p>
    </section>
  </div>

  <ul
    on:transitionstart={handleFlip}
    on:transitionend={handleFlipped}
    style:--grid-columns={gridColumns}
    style:--transition-duration="{transitionDuration / 1000}s"
  >
    {#each cards as { value, flipped, locked }, i}
      <li>
        <button
          class:flipped
          on:click={() => {
            if (preventFlip || locked) return;
            flipCard(i);
          }}
          data-value={value}
        >
          🃏
        </button>
      </li>
    {/each}
  </ul>

  <button on:click={handleReset}>Reset</button>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background: hsl(0, 0%, 97%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  main {
    max-width: 24rem;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
  }

  div {
    display: flex;
    gap: 0.5rem;
  }

  div > * {
    width: 100%;
  }

  main > ul {
    margin-top: 0.5rem;
  }

  section {
    padding: 1rem;
    background: hsl(0, 0%, 100%);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  section > progress {
    width: 100%;
  }

  section > p {
    margin-top: auto;
  }

  ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
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
    display: block;
    aspect-ratio: 1/1;
    box-sizing: border-box;
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

  p {
    font-size: 0.9rem;
  }

  p > span {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
  }

  main > button {
    border: none;
    align-self: center;
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
    background: hsl(0, 0%, 100%);
    border-radius: 0.5rem;
    font-weight: 700;
  }

  @supports (display: grid) {
    ul {
      display: inline-grid;
      grid-template-columns: repeat(var(--grid-columns, 4), auto);
      gap: 0.5rem;
    }
  }
</style>
