<script>
	import Header from './Header.svelte';
	import Form from './Form.svelte';
	import Description from './Description.svelte';

	// variable describing the information on temperature, speed and wind chill index
	let description;

	// following the submit event dispatched on the form update Description to describe the values passed through the object
	function handleSubmit(event) {
		description = event.detail;
	}
</script>

<div class="app">
	<Header />
	<Form on:submit={handleSubmit} />
	<!-- display the description conditional to the variable having a truthy value -->
	{#if description}
		<!-- spread the properties to have the component pick up the individual values -->
		<Description {...description} />
	{/if}
</div>

