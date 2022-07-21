<script>
	import { interpolateSinebow as interpolate } from 'd3-scale-chromatic'
	const duration = 0.5;
	
	const n = 15;
	const cellSize = 5;
	const padding = 1;
	const width = n * cellSize;
	const height = cellSize;
	const blocks = Array(n).fill().map((_, i, { length }) => {		
		return {
			color: interpolate(i / length),
			x: i * cellSize,
			delay: i * duration / n
		}
	});
</script>

<style>
	svg {
		display: block;
		width: 100%;
		height: auto;
	}
	
	svg .scale {
		transform: scale(0.2);
	}
	
	svg:hover .scale {
		transform: scale(0.5);
	}
</style>

<svg viewBox="{-cellSize / 2} {-cellSize / 2} {width} {height}">
		{#each blocks as { color, x, delay }}
			<g transform="translate({x} 0)">
				<g class="scale" style="transition: transform {duration}s {delay}s ease-in-out;">
					<rect transform="translate({-cellSize / 2} {-cellSize / 2})" fill={color} stroke={color} width={cellSize} height={cellSize} />
				</g>
			</g>
		{/each}
</svg>