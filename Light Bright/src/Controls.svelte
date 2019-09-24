<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let disabled;

	function clear() {
		dispatch('clear');
	}

	function remove() {
		dispatch('remove');
	}
</script>
<button on:click={remove} {disabled}>Remove previous</button>
<button on:click={clear} {disabled}>Clear board</button>