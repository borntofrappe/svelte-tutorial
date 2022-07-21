<script>
	const colors = {
		  '#222222': 3,
			'#ffffff': 1,
			'#999999': 2,
			'#555555': 1,
			'#ff0000': 1,
			'#a52a2a': 2,
	};
	
	const data = {
		name: 'Colors',
		children: Object.entries(colors).map(([color, value]) => ({ color, value }))
	};
	
	const width = 100;
	const height = 50;
	
	import { hierarchy, treemap } from 'd3-hierarchy';
	const root = hierarchy(data).sum(d => d.value);
	const treemapGenerator = treemap()
		.size([width, height])
		.padding(1)
		.round(true);
	
	const dataTreemap = treemapGenerator(root);
</script>

<style>
	svg {
		display: block;
		max-width: 600px;
		width: 90vw;
		height: auto;
		margin: 1rem auto;
	}
</style>

<svg viewBox="0 0 {width} {height}" width="300" height="150">
	<rect {width} {height} />
	{#each dataTreemap.leaves() as {data, x0, x1, y0, y1}}
		<rect fill="{data.color}" x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" />
	{/each}
</svg>