<script>
	import Form from './Form.svelte';
	import Table from './Table.svelte';
	import Visualization from './Visualization.svelte';

	// data refers to an array in which to describe the words and their frequency
	let data = [];

	// following the update event use the data included in the event.detail property
	function update(event) {
		data = event.detail;
	}
</script>
<style>
	.container {
		display: flex;
		flex-direction: column;
		max-width: 450px;
		width: 95vw;
		margin: 1rem auto;
	}
	.container > * + * {
		margin-top: 1rem;
	}

	@supports (display: grid) {
		@media (min-width: 600px) {
			.container {
				display: grid;
				max-width: 750px;
				grid-template-areas: 'form form' 'table visualization';
				grid-gap: 1rem;
			}

			.container > * + * {
				margin-top: 0;
			}
		}
	}
</style>

<div class="container">

	<!-- listen for the update event on the form -->
	<Form on:update={update} />

	<!-- if the array is not empty display a table and svg to highlight the data -->
	{#if data.length > 0}
		<Table {data} />
	{/if}

</div>
