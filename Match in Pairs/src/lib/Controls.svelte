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
    margin-left: auto;
    margin-right: auto;
    display: block;
    border: none;
    padding: 0.5rem 0.8rem;
    background: hsl(0, 0%, 100%);
    border-radius: 0.5rem;
  }
</style>
