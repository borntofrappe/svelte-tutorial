<script>
  import { onDestroy } from "svelte";
  import { shuffle } from "./utils.js";

  export let options = ["👋🏻", "🧡", "✨", "🌍", "🐦", "✏️", "🔥", "🙌"];
  export let gridColumns = 4;
  export let transitionDuration = 250;

  const cards = shuffle([...options, ...options]).map((value) => ({
    value,
    flipped: false,
  }));

  let checking = false;
  let timeout;

  onDestroy(() => {
    if (timeout) clearTimeout(timeout);
  });

  const handleFlip = () => {
    if (checking) return;
    checking = true;

    timeout = setTimeout(() => {
      console.log("check flipped card(s)");
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        console.log("allow to flip another card");
        checking = false;
        clearTimeout(timeout);
      }, 500);
    }, transitionDuration);
  };

  const flipCard = (i) => {
    cards[i].flipped = true;
  };
</script>

<ul
  on:transitionstart={handleFlip}
  style:--grid-columns={gridColumns}
  style:--transition-duration="{transitionDuration / 1000}s"
>
  {#each cards as { value, flipped }, i}
    <li>
      <button
        class:flipped
        on:click={() => {
          if (checking) return;
          flipCard(i);
        }}
        data-value={value}
      >
        🃏
      </button>
    </li>
  {/each}
</ul>

<style>
  li {
    display: inline-block;
    perspective: 200px;
  }

  button {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    display: block;
    aspect-ratio: 1/1;
    transform: rotateY(0deg);
    transform-style: preserve-3d;
    position: relative;
    transition: transform var(--transition-duration, 0.5s) ease-in-out;
    z-index: 0;
  }

  button,
  button::before {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    backface-visibility: hidden;
  }

  button::before {
    content: attr(data-value);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
    z-index: -1;
  }

  button.flipped {
    transform: rotateY(180deg);
  }

  @supports (display: grid) {
    ul {
      display: inline-grid;
      grid-template-columns: repeat(var(--grid-columns, 4), auto);
    }

    li {
      display: unset;
    }
  }
</style>
