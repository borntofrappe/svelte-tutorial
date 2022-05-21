<script>
  import icons from "./icons";

  import { laps } from "./stores";
</script>

<ol reversed>
  {#each $laps as { number, increment, total }}
    <li>
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
    </li>
  {/each}
</ol>

<style>
  ol {
    padding: 1rem;
    height: 18rem;
    overflow-y: auto;
  }

  ol li::marker {
    content: "";
  }

  ol li {
    display: flex;
    gap: 0 0.75rem;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
  }

  li span:first-of-type {
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
  }

  li span > :global(svg) {
    width: 1.5em;
    height: auto;
    display: block;
    color: hsl(0, 0%, 85%);
  }

  li span:not(:last-of-type) {
    color: hsl(0, 0%, 50%);
  }
</style>
