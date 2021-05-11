<script>
	import data from './data.js';
	import { setContext } from 'svelte';
	import Contributors from './Contributors.svelte';
	import Cumulative from './Cumulative.svelte';
	import { timeParse, timeFormat } from 'd3-time-format';
	
	setContext('data', data)
	setContext('timeParse', timeParse('%Y-%m-%d'))
	setContext('timeFormat', timeFormat('%b %d'))
	setContext('datesFormat', timeFormat('%b %d, %Y'))
</script>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		padding: 0;
		color: hsl(0, 0%, 20%);
	}
	:global(.visually-hidden:not(:focus):not(:active)) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
	}
	div {
		max-width: 750px;
		width: 90vw;
		margin: 1rem auto;
	}
	
	div > :global(* + *) {
		margin-top: 1rem;
	}
</style>

<div>
	<Cumulative />
	<Contributors />
</div>


