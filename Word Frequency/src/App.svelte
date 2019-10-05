<script>
	import Defs from './Defs.svelte';
	import Input from './Input.svelte';
	import Spreadsheet from './Spreadsheet.svelte';
	import Chart from './Chart.svelte';

	// data refers to an array in which to describe the words and their frequency
	let data = [];

	// following the update event update the data with the value received in the detail property
	function update(event) {
		data = event.detail;
	}
</script>

<!-- svg defs block, injecting the symbols later used in the project -->
<Defs/>
<div class="container">

	<!-- input component, featuring the textarea and controls' buttons -->
	<Input on:update={update} />

	<!-- assuming data describes a series of words and their absolute frequency
	the conditional allow to transition the components in and out of the page
	-->
	{#if data.length > 0}
		<!-- spreadsheet component, highlighting the data in a table element -->
		<Spreadsheet {data} />
		<!-- chart component, highlighting the data through a visualization -->
		<Chart {data} />
	{/if}

</div>
