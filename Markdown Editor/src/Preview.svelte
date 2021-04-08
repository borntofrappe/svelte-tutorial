<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // include the markup through the @html syntax
  export let markup;
</script>

<nav>
  <!-- on click dispatch the event to show the edit component -->
  <button
    on:click={() => dispatch('edit')}
    title="Edit markdown"
    aria-label="Edit markdown"
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <g
        transform="translate(5 5)"
        stroke-width="10"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
      >
        <path d="M 73 0 l 17 17 -45 45 -17 0 0 -17 45 -45" />
        <path
          d="M 35 10 h -25 a 10 10 0 0 0 -10 10 v 60 a 10 10 0 0 0 10 10 h 60 a 10 10 0 0 0 10 -10 v -25"
        />
      </g>
    </svg>
  </button>
</nav>

{@html markup}

<style></style>
