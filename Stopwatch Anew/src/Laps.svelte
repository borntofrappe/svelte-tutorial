<script>
  import icons from "./icons";
  import { fade, slide, fly } from "svelte/transition";

  import { laps } from "./stores";
</script>

<ol reversed>
  {#each $laps as { number, increment, total } (number)}
    <li in:slide out:fly={{ duration: 150 }}>
      <p in:fade>
        <span>
          {@html icons.lap}
          {number}
        </span>
        <span>
          + {increment}
        </span>
        <span>
          {total}
        </span>
      </p>
    </li>
  {/each}
</ol>

<style>
  ol {
    padding: 1rem;
    height: 20rem;
    overflow-y: auto;
  }

  ol::-webkit-scrollbar {
    width: 0.4rem;
  }

  ol::-webkit-scrollbar-track {
    background: hsl(189, 100%, 95%);
  }

  ol::-webkit-scrollbar-thumb {
    border: 0.1rem solid hsl(189, 100%, 95%);
    border-radius: 0.5rem;
    background: var(--theme-color, #2283f6);
  }

  ol li::marker {
    content: "";
  }

  p {
    display: flex;
    gap: 0 0.75rem;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
  }

  p span:first-of-type {
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
  }

  p span > :global(svg) {
    width: 1.5em;
    height: auto;
    display: block;
    color: hsl(0, 0%, 85%);
  }

  p span:not(:last-of-type) {
    color: hsl(0, 0%, 50%);
  }
</style>
