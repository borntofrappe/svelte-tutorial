<script>
  import { onMount } from "svelte";

  import { scaleJS as scale } from "./utils.js";

  import Countdown from "./Countdown.svelte";
  import Timer from "./Timer.svelte";

  export let countdown = 5;
  export let timer = 20;

  onMount(() => {
    isCountdown = true;
  });

  let isCountdown;
  let isTimer;
</script>

<svg viewBox="-15.5 -15.5 30 30">
  {#if isCountdown}
    <g transition:scale={{ duration: 200 }}>
      <Countdown
        on:end={() => {
          isCountdown = false;
          isTimer = true;
        }}
        time={countdown}
      />
    </g>
  {/if}
  {#if isTimer}
    <g in:scale={{ delay: 200 }}>
      <Timer time={timer} />
    </g>
  {/if}
</svg>

<style>
  svg {
    outline: 1px solid;
    max-width: 10rem;
  }
</style>
