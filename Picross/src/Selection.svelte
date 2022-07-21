<script>
  // dispatch a `selection` event when clicking on one of the buttons
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function select(selection) {
    dispatch('selection', selection);
  }

  // transition the buttons from the left and one after the other
  import { fly } from 'svelte/transition';
  import { backInOut } from 'svelte/easing';

  // include one button for each option
  export let options;
</script>

<section>
  {#each options as option, index}
    <!-- the class describes the property value pairs included in the global stylesheet -->
    <button
      class="btn"
      on:click={() => select(option)}
      in:fly={{ x: -50, delay: 50 * index, duration: 600, easing: backInOut }}
    >
      {option}
    </button>
  {/each}
</section>

<style>
  /* display the buttons in a column */
  section {
    display: flex;
    flex-direction: column;
  }
  section > * + * {
    margin-top: 1rem;
  }
</style>
