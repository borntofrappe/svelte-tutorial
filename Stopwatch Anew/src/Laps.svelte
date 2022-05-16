<script>
  import icons from "./icons";

  import { laps } from "./stores";
</script>

<ol>
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
    height: 10rem;
    overflow-y: scroll;
  }

  li {
    padding: 0.75rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem 0;
  }

  span:first-of-type {
    display: flex;
    align-items: center;
    gap: 0.5rem 0;
  }

  span > :global(svg) {
    width: 1.5em;
    height: auto;
    display: inline-block;
    color: hsl(0, 0%, 80%);
  }

  span {
    color: hsl(0, 0%, 37%);
  }

  span:last-of-type {
    color: hsl(0, 0%, 17%);
  }
</style>
