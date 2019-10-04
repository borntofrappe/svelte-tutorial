<script>
	import Defs from './Defs.svelte';
	import Input from './Input.svelte';
	import Spreadsheet from './Spreadsheet.svelte';
	import Chart from './Chart.svelte';

	// data refers to an array in which to describe the words and their frequency
	let data = [];

	// following the update event use the data included in the .detail property
	function update(event) {
		data = event.detail;
	}
</script>

<!-- include the icons described in the defs block -->
<Defs/>
<div class="container">

	<!-- listen for the update event on the form -->
	<Input on:update={update} />

	<!-- display the chart and the graphic only if the array is not empty -->
	{#if data.length > 0}
		<Spreadsheet {data} />
		<Chart {data} />
	{/if}

</div>
