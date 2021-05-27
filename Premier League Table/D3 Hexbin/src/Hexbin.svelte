<script>
	import { scaleLinear, scaleSequential } from 'd3-scale';
	import { interpolateYlGnBu as interpolate } from 'd3-scale-chromatic';
	import { hexbin } from 'd3-hexbin';
	
	export let data;
	
	const dimensions= {
		width: 400,
		height: 300,
		margin: {
			top: 15,
			right: 15,
			bottom: 30,
			left: 30
		}
	}
	
	dimensions.boundedWidth = dimensions.width - (dimensions.margin.left + dimensions.margin.right)
	dimensions.boundedHeight = dimensions.height - (dimensions.margin.top + dimensions.margin.bottom)
	
	const xScale = scaleLinear().domain([0, 1]).range([0, dimensions.boundedWidth])
	const yScale = scaleLinear().domain([0, 1]).range([dimensions.boundedHeight, 0])
	
	const xTicks = xScale.ticks(4)
	const yTicks = yScale.ticks(4)
	
	const radii = [10, 20];
	
	const hexbinGenerator = hexbin().x(d => xScale(d.x)).y(d => yScale(d.y)).radius(radii[1]).extent([dimensions.boundedWidth, dimensions.boundedHeight])
	
	const hexbinData = hexbinGenerator(data);
	
	const maxLength = hexbinData.reduce((acc, {length}) => length > acc ? length : acc, 0)
	
	const colorScale = scaleSequential(interpolate)
	const radiusScale = scaleLinear().domain([1, maxLength]).range(radii)
</script>

<svg viewBox="0 0 {dimensions.width} {dimensions.height}" width={dimensions.width} height={dimensions.height}>
	<defs>
		<clipPath id="clip">
			<rect fill="none" stroke="currentColor" stroke-width="1" width={dimensions.boundedWidth} height={dimensions.boundedHeight} />
		</clipPath>
	</defs>
	<g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
		<g font-size="12">
			<rect fill="none" stroke="currentColor" stroke-width="1" width={dimensions.boundedWidth} height={dimensions.boundedHeight} />
			<g transform="translate(0 {dimensions.boundedHeight})" text-anchor="middle" dominant-baseline="hanging">
				{#each xTicks.slice(1) as xTick}
					<g transform="translate({xScale(xTick)} 4)">
						<text>{xTick}</text>
					</g>
				{/each}
			</g>
			<g text-anchor="end">
				{#each yTicks as yTick}
					<g transform="translate(-4 {yScale(yTick)})">
						<text>{yTick}</text>
					</g>
				{/each}
			</g>
		</g>
		<g clip-path="url(#clip)">
			{#each hexbinData as {x, y, length}}
				<g transform="translate({x} {y})">
					<path d="{hexbinGenerator.radius(radiusScale(length)).hexagon()}" fill="{colorScale(length / maxLength)}" />
				</g>
			{/each}
		</g>
	</g>
</svg>