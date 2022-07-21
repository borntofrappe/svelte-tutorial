<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  const dispatch = createEventDispatcher();

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  function handleSubmit() {
    dispatch('submit', seconds + minutes * 60 + hours * 3600);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Hours
    <input type="number" bind:value={hours} min="0" />
  </label>
  <label>
    Minutes
    <input type="number" bind:value={minutes} min="0" />
  </label>
  <label>
    Seconds
    <input type="number" bind:value={seconds} min="0" />
  </label>
  <button disabled={!hours && !minutes && !seconds}> Count! </button>
</form>
