<script>
	import { fly } from 'svelte/transition'
	
	import { hierarchy, treemap } from 'd3-hierarchy';
	import { timeFormat } from 'd3-time-format';
	

	export let userId;
	export let description;
	export let created_at;
	// 	export let updated_at;
	export let colors = {};
	
	const date = new Date(created_at);
	const formatDate = timeFormat('%B %-d, %Y');
	
	const dataColors = {
		name: 'Colors',
		children: Object.entries(colors).map(([color, value]) => ({ color, value }))
	};
	
	const width = 100;
	const height = 50;
	
	const root = hierarchy(dataColors).sum(d => d.value);
	const treemapGenerator = treemap()
		.size([width, height])
		.padding(1)
		.round(true);
	
	const dataTreemap = treemapGenerator(root);
	console.log(dataColors)
	
</script>

<style>	
	div {
		font-size: 0.95rem;
		max-width: 320px;
		width: 90vw;
		padding: 0.5rem 1rem;
		color: hsl(0, 0%, 10%);
		background: hsl(0, 0%, 100%);
		border: 3px solid currentColor;
		position: relative;
	}
	
	div::before,
	div::after {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 50%;
	}
	div::before {
		transform: translate(-50%, -5px);
		width: 10px;
		height: 10px;
		border: 3px solid currentColor;
		background: none;
	}
	
	div::after {
		transform: translateX(-50%);
		width: 20px;
		height: 10px;
		background: currentColor;
		clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
	}
	
	div > * + * {
		margin-top: 0.5em;
	}
	
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

<div in:fly={{x: -200}} out:fly={{x: 200}}>	
	<p>
		On <time datetime="{date}">{formatDate(date)}</time>, <span class="highlight">{userId}</span> created <span class="highlight">{description}</span>, a bl.ock with <strong>{dataColors.children.length}</strong> colors
	</p>
	
	<svg viewBox="0 0 {width} {height}" width="300" height="150">
		<rect fill="currentColor" {width} {height} />
		{#each dataTreemap.leaves() as {data, x0, x1, y0, y1}}
			<rect fill="{data.color}" x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" />
		{/each}
	</svg>
</div>
	