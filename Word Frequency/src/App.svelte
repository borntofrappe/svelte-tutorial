<script>
	import Form from './Form.svelte';
	import Table from './Table.svelte';
	
	let data = [];
	
	function update(e) {
		data = e.detail;
	}
</script>

<Form on:update={update} />

{#if data.length > 0}
	<Table {data} />
{/if}

