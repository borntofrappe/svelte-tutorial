<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	
	export let data;
</script>

<table>
	<tr>
		<th>Word</th>
		<th>Frequency</th>
	</tr>
	{#each data as datum (datum.word)}
		<tr animate:flip in:fly={{ x: -50 }} out:fly={{x : 50}}>
			<td>{datum.word}</td>
			<td>{datum.frequency}</td>
		</tr>
	{/each}
</table>
