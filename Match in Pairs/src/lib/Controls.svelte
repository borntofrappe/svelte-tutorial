<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	const reset = () => {
		dispatch('reset')
	}
</script>

<section>
	<button on:click={reset}>
		Reset
	</button>
</section>
