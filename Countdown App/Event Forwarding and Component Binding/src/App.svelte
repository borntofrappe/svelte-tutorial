<script>
  /* Helpful resources
		https://svelte.dev/tutorial/component-bindings
		https://svelte.dev/tutorial/dom-event-forwarding
	*/

  import Input from './Input.svelte';
  let value = '';
</script>

<h1 style="color: {value ? 'currentColor' : '#ccc'}">
  {value || 'Your input value'}
</h1>

<Input
  bind:value
  on:submit={() => {
    console.log(`Submit value: ${value}`);
  }}
/>

<style>
  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(body) {
    padding: 0.5rem 1rem;
  }

  h1 {
    margin: 1rem 0;
  }
</style>
