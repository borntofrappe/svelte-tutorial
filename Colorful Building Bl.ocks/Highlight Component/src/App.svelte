<script>
	import Highlight from './Highlight.svelte'
	
	const data = {
		userId: "borntofrappe",
		description: "treemap Colors",
		created_at: "2021-05-05T21:42:52Z",
		updated_at: "2021-05-06T23:15:53Z",
 		colors: {
			'#222222': 3,
			'#ffffff': 1,
			'#999999': 2,
			'#555555': 1,
			'#ff0000': 1,
			'#a52a2a': 2,
			}
	};
	
	let checked;
	
</script>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	:global(.visually-hidden:not(:focus):not(:active)) {
		clip: rect(0 0 0 0); 
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap; 
		width: 1px;
	}
</style>

<label>
	<input type="checkbox" bind:checked />
	<span>{checked ? 'Hide' : 'Show'} component</span>
</label>

{#if checked}
	<Highlight {...data} />
{/if}
