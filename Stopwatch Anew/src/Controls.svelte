<script>
  import { stopwatch } from "./stores.js";
  import { fly } from "svelte/transition";
  import icons from "./icons";

  let isRunning;

  const handleStart = () => {
    stopwatch.start();
    isRunning = true;
  };

  const handleStop = () => {
    stopwatch.stop();
    laps.clear();
    isRunning = false;
  };

  const handleLap = () => {
    // TODO consider laps
  };

  const handlePause = () => {
    stopwatch.pause();
    isRunning = false;
  };

  const duration = 150;
</script>

{#if $stopwatch > 0}
  <div in:fly={{ delay: duration }} out:fly={{ duration }}>
    {#if isRunning}
      <button on:click={handleLap}>
        <span class="visually-hidden">Set lap</span>
        {@html icons.lap}
      </button>
      <button on:click={handlePause}>
        <span class="visually-hidden">Pause</span>
        {@html icons.pause}
      </button>
    {:else}
      <button on:click={handleStop}>
        <span class="visually-hidden">Stop</span>
        {@html icons.stop}
      </button>
      <button on:click={handleStart}>
        <span class="visually-hidden">Start</span>
        {@html icons.start}
      </button>
    {/if}
  </div>
{:else}
  <div in:fly={{ delay: duration }} out:fly={{ duration }}>
    <button on:click={handleStart}>
      <span class="visually-hidden">Start</span>
      {@html icons.start}
    </button>
  </div>
{/if}

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 2.5rem;
  }

  button {
    border-radius: 50%;
    width: 3.25rem;
    height: 3.25rem;
    border: none;
    box-shadow: 0 0 0.1rem -0.05rem currentColor,
      0 0 1rem -0.5rem hsla(0, 0%, 0%, 0.2);
    background: none;
    padding: 0.7rem;
  }

  button > :global(svg) {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
