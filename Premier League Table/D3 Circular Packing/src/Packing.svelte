<script>
		import { scaleLinear, scaleSequential } from 'd3-scale';
	import { interpolateHsl as interpolate } from 'd3-interpolate';
	import { hierarchy, pack } from 'd3-hierarchy';
	import { max } from 'd3-array';
	
	export let data;
	
	const dimensions= {
		width: 400,
		height: 400,
		margin: {
			top: 15,
			right: 15,
			bottom: 15,
			left: 15
		}
	}
	
	dimensions.boundedWidth = dimensions.width - (dimensions.margin.left + dimensions.margin.right)
	dimensions.boundedHeight = dimensions.height - (dimensions.margin.top + dimensions.margin.bottom)
	
	const root = {
		children: data
	}
	
	const packData = pack().size([dimensions.boundedWidth, dimensions.boundedHeight])(hierarchy(root).sum(({points}) => points))
	
	const colorScale = scaleLinear().domain([0, max(data, d => d.points)]).range(['hsl(0, 80%, 60%)', 'hsl(120, 60%, 52%)']).interpolate(interpolate)
</script>

<svg viewBox="0 0 {dimensions.width} {dimensions.height}" width={dimensions.width} height={dimensions.height}>
	<defs>
		<path id="hexagon" fill="currentColor" d="M -1.25 -2 h 2.5 l 1 2 -1 2 h -2.5 l -1 -2z" />
		<pattern id="pattern" viewBox="-5 -5 10 10" width="0.5" height="0.5">
			<path fill="none" stroke="currentColor" d="M 0 0 l 5 5z l 5 -5z l -5 5z l -5 -5" stroke-width="0.25" />
			<use href="#hexagon" />
			<use x="5" y="5" href="#hexagon" />
			<use x="5" y="-5" href="#hexagon" />
			<use x="-5" y="5" href="#hexagon" />
			<use x="-5" y="-5" href="#hexagon" />
		</pattern>
	</defs>
	<g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
		{#each packData.leaves() as {x, y, r, data}}
			<g transform="translate({x} {y})">
					<circle {r} fill="{colorScale(data.points)}" stroke-width="2" />
					<text y="1" dominant-baseline="middle" text-anchor="middle">{data.points}</text>
				</g>
		{/each}
	</g>
</svg>