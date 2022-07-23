<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { createTimer } from "./stores.js";

  import { jiggleJS as jiggle, scaleJS as scale } from "./utils.js";

  const dispatch = createEventDispatcher();

  export let countdown = 5;
  export let timer = 20;

  let isCountdown;
  let isTimer;

  let time;

  onMount(() => {
    time = createTimer(countdown + 1);
    isCountdown = true;
  });

  $: if (time && $time === 0) {
    if (isCountdown) {
      time = createTimer(timer);
      isCountdown = false;
      isTimer = true;
    } else {
      time = null;
      dispatch("end");
    }
  }
</script>

<svg viewBox="-15.5 -15.5 30 30">
  {#if isCountdown}
    <g transition:scale={{ duration: 200 }}>
      <circle r="10" fill="#f9c801" stroke="#3c3c3c" />
      <g
        text-anchor="middle"
        dominant-baseline="central"
        font-family="sans-serif"
        paint-order="stroke"
        fill="#ffffff"
        stroke="#3c3c3c"
        stroke-width="1.65"
        stroke-linejoin="round"
        stroke-linecap="round"
        font-size="14"
      >
        {#key $time - 1}
          <g in:jiggle>
            <text>{$time - 1}</text>
          </g>
        {/key}
      </g>
    </g>
  {/if}
  {#if isTimer}
    <g in:scale={{ delay: 200 }}>
      <g
        text-anchor="middle"
        dominant-baseline="central"
        font-family="sans-serif"
        paint-order="stroke"
        fill="#ffffff"
        stroke="#3c3c3c"
        stroke-width="1.65"
        stroke-linejoin="round"
        stroke-linecap="round"
        font-size="14"
      >
        <text>{$time}</text>
      </g>
    </g>
  {/if}
</svg>

<style>
  svg {
    outline: 1px solid;
    max-width: 10rem;
  }
</style>
