<script>
	import Form from './Form.svelte';
	import Table from './Table.svelte';

	// data refers to an array in which to describe the words and their frequency
	let data = [];

	// following the update event use the data included in the event.detail property
	function update(event) {
		data = event.detail;
	}
</script>

<!-- listen for the update event on the form -->
<Form on:update={update} />

<!-- if the array is not empty display the table with the updated data -->
{#if data.length > 0}
	<Table {data} />
{/if}

