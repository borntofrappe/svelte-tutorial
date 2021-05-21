<script>
  import Keypad from './Keypad.svelte';

  let seconds;
  $: console.log(seconds);
</script>

<div>
  <Keypad
    on:countdown={(e) => {
      seconds = e.detail;
    }}
  />
</div>

<style>
  div {
    max-width: 270px;
    margin: 1rem auto;
  }
</style>
