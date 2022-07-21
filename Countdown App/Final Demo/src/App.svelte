<script>
  import Keypad from './Keypad.svelte';
  import Timer from './Timer.svelte';

  let countdown;
</script>

<div>
  {#if countdown}
    <Timer
      on:new={() => {
        countdown = null;
      }}
      {countdown}
    />
  {:else}
    <Keypad
      on:countdown={(e) => {
        countdown = e.detail;
      }}
    />
  {/if}
</div>

<style>
  div {
    max-width: 300px;
    margin: 1rem auto;
    padding: 1rem;
  }
</style>
