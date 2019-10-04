<script>
	// import the animation and transition directives to animate the change in the table and rows
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';

	export let data;
</script>

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
			<td>{datum.frequency}</td>
		</tr>
	{/each}
</table>
