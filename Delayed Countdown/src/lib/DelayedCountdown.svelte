<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { createTimer } from "./stores.js";

  import { jiggleJS as jiggle, scaleJS as scale } from "./utils.js";

  const dispatch = createEventDispatcher();

  export let delay = 5;
  export let countdown = 20;

  let isDelay;
  let isCountdown;

  let timer;

  onMount(() => {
    timer = createTimer(delay + 1);
    isDelay = true;

    return () => (timer = null);
  });

  $: if (timer && $timer === 0) {
    if (isDelay) {
      timer = createTimer(countdown);
      isDelay = false;
      isCountdown = true;
    } else {
      timer = null;
      dispatch("end");
    }
  }
</script>

<svg viewBox="-15.5 -15.5 30 30">
  {#if isDelay}
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
        {#key $timer - 1}
          <g in:jiggle>
            <text>{$timer - 1}</text>
          </g>
        {/key}
      </g>
    </g>
  {/if}
  {#if isCountdown}
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
        <text>{$timer}</text>
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
