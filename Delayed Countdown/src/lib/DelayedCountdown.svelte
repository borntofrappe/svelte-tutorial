<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { createTimer } from "./stores.js";

  import { jiggleJS as jiggle, scaleJS as scale, scaleCSS } from "./utils.js";

  const dispatch = createEventDispatcher();

  export let delay = 5;
  export let countdown = 20;

  let isDelay;
  let isCountdown;

  let timer;

  onMount(() => {
    timer = createTimer(delay + 1);
    isDelay = true;

    return () => timer.remove();
  });

  $: if (timer && $timer === 0) {
    if (isDelay) {
      timer.start(countdown);
      isDelay = false;
      isCountdown = true;
    } else {
      timer.remove();
      dispatch("end");
      isOver = true;
    }
  }

  let isPaused;
  let isOver;
  const toggleTimer = () => {
    if (isOver) return;

    isPaused = !isPaused;
    if (isPaused) {
      timer.pause();
    } else {
      timer.start($timer);
    }
  };
</script>

<div>
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

  {#if !isOver}
    <button transition:scaleCSS on:click={toggleTimer}>
      {#if isPaused}
        <span class="visually-hidden">Resume</span>
        <svg viewBox="-15.5 -15.5 30 30">
          <g
            fill="#ffffff"
            stroke="#3c3c3c"
            stroke-width="1.65"
            stroke-linejoin="round"
            stroke-linecap="round"
          >
            <path stroke-dasharray="40" d="M -6 -8 l 12 8 -12 8z" />
          </g>
        </svg>
      {:else}
        <span class="visually-hidden">Pause</span>
        <svg viewBox="-15.5 -15.5 30 30">
          <g
            fill="#ffffff"
            stroke="#3c3c3c"
            stroke-width="1.65"
            stroke-linejoin="round"
            stroke-linecap="round"
          >
            <path stroke-dasharray="38" d="M -8 -8 h 5 v 16 h -5z" />
            <path d="M 2 -8 h 5 v 16 h -5z" />
          </g>
        </svg>
      {/if}
    </button>
  {/if}
</div>

<style>
  div {
    width: 12rem;
    margin-left: auto;
    margin-right: auto;
  }

  svg,
  button {
    display: block;
  }

  div > svg {
    width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    width: 4rem;
    margin-left: auto;
    margin-right: auto;
    background: none;
    border: none;
  }

  button > svg {
    width: 100%;
    height: auto;
  }
</style>
