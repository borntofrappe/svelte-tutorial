<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { linear as easing } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  const dispatch = createEventDispatcher();

  export let countdown;

  let now = Date.now();
  let end = now + countdown * 1000;

  $: count = Math.round((end - now) / 1000);
  $: hours = Math.floor(count / 3600);
  $: minutes = Math.floor((count - hours * 3600) / 60);
  $: seconds = count - hours * 3600 - minutes * 60;

  function updateTimer() {
    now = Date.now();
  }

  let interval = setInterval(updateTimer, 1000);
  $: if (count === 0) clearInterval(interval);

  let isPaused;
  let isResetting;
  let offset = tweened(1, { easing, duration: 1000 });
  $: offset.set(Math.max(count - 1, 0) / countdown);

  function handlePause() {
    offset.set(count / countdown, { duration: 150 });
    clearInterval(interval);
    isPaused = true;
  }

  function handleStart() {
    now = Date.now();
    end = now + count * 1000;
    offset.set(Math.max(count - 1, 0) / countdown);
    interval = setInterval(updateTimer, 1000);
    isPaused = false;
  }

  function handleReset() {
    isResetting = true;
    isPaused = false;
    clearInterval(interval);
    offset.set(1).then(() => {
      isResetting = false;
      now = Date.now();
      end = now + countdown * 1000;
      interval = setInterval(updateTimer, 1000);
    });
  }

  function handleClick() {
    clearInterval(interval);
    dispatch('back');
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<p>
  Counting down from {countdown} seconds: <strong>{count}</strong>
</p>

<p>
  In details:
  {#each Object.entries({ hours, minutes, seconds }) as [key, value]}
    <strong>{value}</strong> {key}&nbsp;
  {/each}
</p>

<p>In a progress bar:</p>

<svg viewBox="-4 -4 108 8" width="216" height="16">
  <g
    fill="none"
    stroke="currentColor"
    stroke-width="8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path opacity="0.1" d="M 0 0 h 100" />
    <path
      d="M 0 0 h 100"
      pathLength="1"
      stroke-dasharray="1"
      stroke-dashoffset={$offset}
    />
  </g>
</svg>

<button on:click={handleClick}> New countdown </button>

{#if !isResetting}
  <button on:click={handleReset}> Reset </button>

  {#if count > 0}
    <button
      on:click={() => {
        if (isPaused) {
          handleStart();
        } else {
          handlePause();
        }
      }}
    >
      {isPaused ? 'Start' : 'Pause'}
    </button>
  {/if}
{/if}

<style>
  svg {
    display: block;
    width: 300px;
    height: auto;
    margin: 1rem 0;
  }
</style>
