<script>
  import icons from './icons.js';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // dispatch the checked event whenever the input is toggled
  let checked;
  $: dispatch('checked', checked);
</script>

<label>
  {#if checked}
  <span class="visibility-hidden">Switch to light palette</span>
  {@html icons.sun} {:else}
  <span class="visibility-hidden">Switch to dark palette</span>
  {@html icons.moon} {/if}

  <input type="checkbox" bind:checked />
</label>

<style>
  label {
    position: relative;
    width: 1.75rem;
    height: 1.75rem;
  }

  label svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .visibility-hidden {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
  }

  label input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>
