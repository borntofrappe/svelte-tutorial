<script>
  import { onMount } from "svelte";

  import { scaleJS as scale } from "./utils.js";

  import Countdown from "./Countdown.svelte";
  import Timer from "./Timer.svelte";

  export let countdown = 5;
  export let timer = 20;

  onMount(() => {
    isCounter = true;
  });

  let isCounter;
  let isTimer;
</script>

<svg viewBox="-15.5 -15.5 30 30">
  {#if isCounter}
    <g transition:scale>
      <Countdown time={countdown} />
    </g>
  {/if}
  {#if isTimer}
    <Timer time={timer} />
  {/if}
</svg>

<style>
  svg {
    outline: 1px solid;
    max-width: 10rem;
  }
</style>
