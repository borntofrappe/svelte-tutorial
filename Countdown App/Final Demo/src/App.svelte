<script>
  import Input from './Input.svelte';
  import Timer from './Timer.svelte';

  let seconds;
</script>

<div>
  {#if !seconds}
    <Input
      on:countdown={(e) => {
        seconds = e.detail;
      }}
    />
  {:else}
    <Timer
      {seconds}
      on:new={() => {
        seconds = null;
      }}
    />
  {/if}
</div>

<style>
  div {
    max-width: 270px;
    margin: 1rem auto;
  }
</style>
