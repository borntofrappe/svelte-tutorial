<script>
	import Scatterplot from './Scatterplot.svelte';
	import Hexbin from './Hexbin.svelte'
	import { range } from 'd3-array';

	function getData() {
		return range(300).map((_) => ({
			x: Math.random() ** 0.75,
			y: Math.random() ** 0.75,
		}));
	}
	const data = getData();
</script>

<Scatterplot {data} />
<Hexbin {data} />

<style>
	:global(svg) {
		width: 100%;
		max-width: 500px;
		height: auto;
		display: block;
	}
</style>