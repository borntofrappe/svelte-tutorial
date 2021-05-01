<script>
	import { json } from 'd3-fetch';
	import { geoAzimuthalEqualArea, geoPath, geoGraticule10 } from 'd3-geo';
	import * as topojson from 'topojson';
	
	const sphere = { type: 'Sphere' }
	const width = 500;
	const height = 500;
	
	const promise = json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
	
	const projection = geoAzimuthalEqualArea().fitSize([width, height], sphere)
	const graticule = geoGraticule10();
	const pathGenerator = geoPath(projection)
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" >
	<g>
		<path fill="hsl(0, 0%, 96%)" d="{pathGenerator(sphere)}" />
		<path stroke="hsl(0, 0%, 88%)" stroke-width="0.5" fill="none" d="{pathGenerator(graticule)}" />
		{#await promise}
			<text x={width / 2} y={height / 2} text-anchor="middle" dominant-baseline="middle" font-size="32">Fetching data</text>
		{:then data}
				<g fill="hsl(0, 0%, 82%)" stroke="hsl(0, 0%, 82%)">
					{#each topojson.feature(data, data.objects.countries).features as feature, i} 
						<path d="{pathGenerator(feature)}" />
					{/each}
				</g>
		{:catch error}
				<text x={width / 2} y={height / 2 - 24} text-anchor="middle" dominant-baseline="middle" font-size="32">Error</text>
				<text x={width / 2} y={height / 2 + 18} text-anchor="middle" dominant-baseline="middle" font-size="18">{error}</text>
		{/await}
	</g>
</svg>
 
<style>
	svg {
		max-width: 500px;
		width: 100%;
		height: auto;
		display: block;
		filter: drop-shadow(0 1px 5px hsla(0, 0%, 0%, 0.2));
	}
	svg text {
		fill: hsl(0, 0%, 30%);
		font-weight: bold;
		font-size: '1rem';
	}
</style>