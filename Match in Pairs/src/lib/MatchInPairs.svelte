<script>
  import { shuffle } from "./utils.js";

  export let options = ["👋🏻", "🧡", "✨", "🌍", "🐦", "✏️", "🔥", "🙌"];
  export let gridColumns = 4;

  const cards = shuffle([...options, ...options]).map((value) => ({
    value,
    flipped: true,
  }));

  const flipCard = (i) => {
    cards[i].flipped = !cards[i].flipped;
  };
</script>

<ul style:--grid-columns={gridColumns}>
  {#each cards as { value, flipped }, i}
    <li>
      <button class:flipped on:click={() => flipCard(i)} data-value={value}>
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
    transition: transform 0.5s ease-in-out;
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
