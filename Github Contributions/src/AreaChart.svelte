<script>
	import { getContext } from 'svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { axisLeft, axisBottom } from 'd3-axis';
	import { area, curveBumpX as curve } from 'd3-shape';
	
	const timeParse = getContext('timeParse');
	const timeFormat = getContext('timeFormat');
	export let max;
	export let xAccessor;
	export let yAccessor;
	export let data;	
	
	export let fill = '#fb8532';
	export let dimensions = {
		width: 400,
		height: 200,
		margin: {
			top: 10,
			right: 10,
			bottom: 30,
			left: 35
		}
	}
	dimensions.boundedWidth = dimensions.width - (dimensions.margin.left + dimensions.margin.right);
	dimensions.boundedHeight = dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);
	
	const xScale = scaleBand()
		.domain(data.map(xAccessor))
		.range([0, dimensions.boundedWidth])
		
	const yScale = scaleLinear()
		.domain([0, max])
		.range([dimensions.boundedHeight, 0]);
	
	const areaGenerator = area()
		.x(d => xScale(xAccessor(d)))
		.y0(dimensions.boundedHeight)
		.y1(d => yScale(yAccessor(d)))
		.curve(curve)
	
	const yTicks = yScale.ticks(4)
	const xTicks = xScale.domain().filter((d, i) => i % 6 === 0).slice(1);
</script>

<svg viewBox="0 0 {dimensions.width} {dimensions.height}" width="{dimensions.width}" height="{dimensions.height}">
	<g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
		<g font-size="12">
			<g dominant-baseline="middle" text-anchor="end">
				{#each yTicks as tick}
					<g transform="translate(0 {yScale(tick)})">
						<text fill="currentColor" x="-8">{tick}</text>
						<path fill="none" stroke="currentColor" opacity="0.1" d="M 0 0 h {dimensions.boundedWidth}" />
					</g>
				{/each}
			</g>
			<g text-anchor="middle" transform="translate(0 {dimensions.boundedHeight + 20})">
				{#each xTicks as tick}
					<g transform="translate({xScale(tick)} 0)">
						<text fill="currentColor">{timeFormat(timeParse(tick))}</text>
					</g>
				{/each}
			</g>
		</g>
		
			
		<path d="{areaGenerator(data)}" fill="{fill}" stroke="none" />
	</g>
</svg>
