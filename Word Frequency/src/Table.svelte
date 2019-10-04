<script>
	// import the animation and transition directives to animate the change in the table and rows
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';

	export let data;
</script>

<style>
	table {
		padding: 1.25rem 2rem;
        background: hsl(0, 0%, 100%);
		box-shadow: 0 -1px 10px -5px hsla(0, 0%, 0%, 0.2);
		text-align: center;
		table-layout: fixed;
        min-height: 300px;

	}
	th {
		text-transform: uppercase;
		font-size: 1.25rem;
		width: 50%;
	}
	tr {
		line-height: 2;
	}
	tr:nth-of-type(even) td {
		background: hsl(0, 0%, 95%);
	}
	tr:nth-of-type(odd) td {
		background: hsl(0, 0%, 98%);
	}
</style>

<table transition:fade>
	<tr>
		<th>Word</th>
		<th>Frequency</th>
	</tr>
	<!-- for each object include a row with two cells, describing the word and frequency
	it is possible to use the word as a key as this is a unique value, by design
	-->
	{#each data as datum (datum.word)}
		<tr animate:flip in:fly={{ x: -50 }} out:fly={{x : 50}}>
			<td>{datum.word}</td>
			<td class="number">{datum.frequency}</td>
		</tr>
	{/each}
</table>
