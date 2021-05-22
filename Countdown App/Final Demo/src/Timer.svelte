<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { linear as easing } from 'svelte/easing';

  export let countdown;

  let isPaused;
  const duration = 1000;

  function handleNew() {
    dispatch('new');
  }

  function handleStart() {
    isPaused = false;
  }

  function handlePause() {
    isPaused = true;
  }

  function handleReset() {}
</script>

<svg viewBox="-50 -50 100 100" width="250" height="250">
  <title>Remaining seconds: {countdown}</title>
  <g
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle stroke="hsl(208, 100%, 50%)" r="46" />
    <path
      stroke="currentColor"
      d="M 0 -46 a 46 46 0 0 1 0 92 46 46 0 0 1 0 -92"
      pathLength="1"
      stroke-dasharray="1"
      stroke-dashoffset={0}
    />
  </g>
  <g fill="hsl(208, 100%, 50%)" stroke="none">
    <g transform="scale(-1 1)">
      <g transform="rotate({0})">
        <g transform="translate(0 -46)">
          <circle r="4" />
        </g>
      </g>
    </g>
  </g>

  <g
    fill="currentColor"
    font-weight="bold"
    text-anchor="middle"
    dominant-baseline="middle"
    font-size="14"
  >
    <text y="2">
      {countdown}
    </text>
  </g>
</svg>

<div>
  <button on:click={handleNew}>New timer</button>

  {#if isPaused}
    <button on:click={handleStart}>
      <span class="visually-hidden">Start timer</span>

      <svg viewBox="-50 -50 100 100" width="30" height="30">
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="20"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M -25 -40 l 60 40 -60 40z" />
        </g>
      </svg>
    </button>
  {:else}
    <button on:click={handlePause}>
      <span class="visually-hidden">Pause timer</span>
      <svg viewBox="-50 -50 100 100" width="30" height="30">
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="20"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M -25 -30 v 60 m 50 0 v -60" />
        </g>
      </svg>
    </button>
  {/if}

  <button on:click={handleReset}>Reset timer</button>
</div>

<style>
  svg {
    width: 100%;
    height: auto;
    display: block;
    margin: 1rem auto 2rem;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  button:nth-of-type(odd) {
    font-size: 0.9rem;
    color: inherit;
    border: none;
    background: none;
    text-transform: capitalize;
  }

  button:nth-of-type(odd):hover {
    text-decoration: underline;
  }

  button:nth-of-type(2) {
    margin: 0 1rem;
    color: inherit;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    padding: 1rem;
    background: hsl(208, 100%, 50%);
    box-shadow: 0px 1px 2px hsl(208, 100%, 50%);
    transition: box-shadow 0.2s ease-in-out;
  }

  button:nth-of-type(2):hover,
  button:nth-of-type(2):focus {
    box-shadow: 0px 1px 5px hsl(208, 100%, 50%);
  }

  button:nth-of-type(2) svg {
    margin: initial;
    width: 100%;
    height: auto;
    display: block;
  }
</style>
