<script>
	export let data;

	import { scaleLinear, scaleBand } from 'd3-scale';
	import { max, extent } from 'd3-array';
	
	const dimensions = {
    width: 550,
    height: 300,
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50,
    }
  };
	
	dimensions.boundedWidth = dimensions.width - (dimensions.margin.left + dimensions.margin.right);
	dimensions.boundedHeight = dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);
	
	const xScale = scaleBand().domain(data.map(d => d.year)).range([0, dimensions.boundedWidth]).padding(0.5);	
	
	const yScale = scaleLinear().domain([0, max(data, d => d.time)]).range([dimensions.boundedHeight, 0]).nice();
	
	const yTicks = yScale.ticks(5);
	const xTicks = xScale.domain().filter(d => d % 10 === 0);
</script>

<article>
	<h2>
		<slot name="heading">
				<span>Column chart main message</span>
		</slot>
	</h2>
	
	<p>
		<slot name="brief">
			<span>Column chart brief description</span>
		</slot>
	</p>
	
	<svg viewBox="0 0 {dimensions.width} {dimensions.height}" width="{dimensions.width}" height="{dimensions.height}">
		<g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
			<g>
				<path fill="none" stroke="currentColor" stroke-width="1" d="M 0 {dimensions.boundedHeight} h {dimensions.boundedWidth}" />
				{#each yTicks as yTick}
				<g transform="translate(0 {yScale(yTick)})">
					<path fill="none" stroke="currentColor" stroke-width="1" opacity="0.2" d="M 0 0 h {dimensions.boundedWidth}" />
					<text font-size="9" font-weight="bold" x="-3" text-anchor="end" fill="currentColor" stroke="none">{yTick} min</text>
				</g>
				{/each}
				<g fill="currentColor">
					{#each xTicks as xTick}
					<g transform="translate({xScale(xTick)} {dimensions.boundedHeight})" text-anchor="middle" font-size="9" font-weight="bold">
						<line stroke="currentColor" stroke-width="1" x0="0" x1="0" y0="0" y1="3" />
						<text y="12">{xTick}</text>
					</g>
					{/each}
				</g>
			</g>	

			
			{#each data as { year, time }, i}
			<g transform="translate({xScale(year)} {yScale(time)})">
				<rect fill="{i === data.length - 1 ? '#ff3232' : '#0386c3'}" height="{dimensions.boundedHeight - yScale(time)}" width="{xScale.bandwidth()}" />
			</g>
			{/each}
		</g>
	</svg>

	<p>
		Source: <a href="https://ressources.data.sncf.com/explore/dataset/meilleurs-temps-des-parcours-des-trains/table/?disjunctive.relations&dataChart=eyJxdWVyaWVzIjpbeyJjb25maWciOnsiZGF0YXNldCI6Im1laWxsZXVycy10ZW1wcy1kZXMtcGFyY291cnMtZGVzLXRyYWlucyIsIm9wdGlvbnMiOnsiZGlzanVuY3RpdmUucmVsYXRpb25zIjp0cnVlfX0sImNoYXJ0cyI6W3sidHlwZSI6ImNvbHVtbiIsImZ1bmMiOiJBVkciLCJ5QXhpcyI6IjE5ODJfMCIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiM2NmMyYTUifV0sInhBeGlzIjoicmVsYXRpb25zIiwibWF4cG9pbnRzIjo1MCwic29ydCI6IiJ9XSwidGltZXNjYWxlIjoiIn0%3D"><abbr title="National Company of French Railways">SNCF</abbr></a>
	</p>
</article>



<style>
	article > h2 {
		font-size: 1rem;
	}
	
	article > p {
		font-size: 0.9rem;
	}
	
	article > svg {
		width: 100%;
		height: auto;
		display: block;
		color: #828282;
	}
	
	
</style>