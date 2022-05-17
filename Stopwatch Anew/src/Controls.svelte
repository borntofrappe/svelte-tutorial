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
