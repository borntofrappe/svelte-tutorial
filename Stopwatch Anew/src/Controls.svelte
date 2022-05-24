<script>
  import { stopwatch, laps } from "./stores.js";
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
    laps.add($stopwatch);
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
        <span class="visually-hidden">Resume</span>
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
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 2.8rem;
  }

  button {
    color: var(--theme-color, #2283f6);
    margin: 0;
    padding: 0;
    display: block;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    padding: 0.75rem;
    border: none;
    background: hsl(0, 0%, 100%);
    box-shadow: 0 0 1rem -0.5rem currentColor,
      0 0.25rem 0.4rem -0.4rem currentColor;
    transition: box-shadow 0.25s ease-out;
  }

  button:hover {
    box-shadow: 0 0 0.5rem -0.5rem currentColor,
      0 0.25rem 0.2rem -0.4rem currentColor;
    background: hsla(0, 0%, 0%, 0.1);
  }

  button > :global(svg) {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
