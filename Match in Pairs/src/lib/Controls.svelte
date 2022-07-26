<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const reset = () => {
    dispatch("reset");
  };
</script>

<section class="controls">
  <button on:click={reset}> Reset </button>
</section>

<style>
  button {
    display: block;
    border: none;
    padding: 0.5rem 0.8rem;
    color: hsl(209, 61%, 16%);
    background: hsl(196, 94%, 67%);
    border-radius: 0.5rem;
    font-weight: 700;
  }
</style>
