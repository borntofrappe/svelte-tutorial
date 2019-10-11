<script>
	import Form from './Form.svelte';
	import Result from './Result.svelte';

	// variable describing the information on temperature, speed and wind chill index
	let result;

	// following the submit event dispatched on the form update result to describe the values passed through the object
	function handleSubmit(event) {
		result = event.detail;
	}
</script>

<div class="app">
	<Form on:submit={handleSubmit} />
	<!-- display the result conditional to the variable having a truthy value -->
	{#if result}
		<!-- spread the properties to have the component pick up the individual values -->
		<Result {...result} />
	{/if}
</div>

