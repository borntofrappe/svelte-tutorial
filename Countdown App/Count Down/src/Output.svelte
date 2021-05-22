<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
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

<button on:click={handleClick}> New countdown </button>
