<script>
	import { hierarchy, treemap } from 'd3-hierarchy';
	import { timeFormat } from 'd3-time-format';
	
	export let id;
	export let userId;
	export let description;
	export let created_at;
	// 	export let updated_at;
	export let colors = {};
	
	const date = new Date(created_at);
	const formatDate = timeFormat('%B %-d, %Y');
	
	let dataColors = {
		name: 'Colors',
		children: []
	}
	
	$: if(colors) {
		dataColors.children = Object.entries(colors).map(([color, value]) => ({ color, value, id: `${id}-${color}` }))
	}
	
	const width = 100;
	const height = 50;
	
	$: root = hierarchy(dataColors).sum(d => d.value);
	const treemapGenerator = treemap()
		.size([width, height])
		.padding(1)
		.round(true);
	
	$: dataTreemap = treemapGenerator(root);
</script>

<style>	
	p {
		line-height: 1.5;
	}
	
	.highlight {
		font-weight: bold;
	}
	
	svg {
		display: block;
		width: 100%;
		height: auto;
	}	
</style>

<p>
	<span class="highlight">{userId}</span> created <a class="highlight" href="https://blockbuilder.org/{userId}/{id}" target="_blank">{description}</a> on <time datetime="{date}">{formatDate(date)}</time>, making use of <strong>{dataColors.children.length}</strong> {dataColors.children.length === 1 ? 'color' : 'colors'}.
</p>

<svg viewBox="0 0 {width} {height}" width="300" height="150">
	<rect fill="currentColor" {width} {height} />
	{#each dataTreemap.leaves() as {data, x0, x1, y0, y1} (data.id)}
	<rect fill="{data.color}" x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" />
	{/each}
</svg>
	