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
