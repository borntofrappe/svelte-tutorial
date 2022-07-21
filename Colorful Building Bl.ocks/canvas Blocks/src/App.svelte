<script>
	import { onMount } from 'svelte';
	import { timer } from 'd3-timer';
	import { min } from 'd3-array';
	import { json } from 'd3-fetch';
	
	const size = 500;
	
	const delay = 500;
	const duration = 1250;	
	let canvas;
	
	async function drawCanvas() {
		const data = await json('https://storage.googleapis.com/bb-search-data/parsed/blocks-colors.json?')
		const dimensions = Math.floor(Math.sqrt(data.length));
		const cellSize = size / dimensions;
		
		const squares = data.map(({ colors }, i, { length }) => 	{
			const column = (i % dimensions);
			const row = Math.floor(i / dimensions);
			const x = column * cellSize;
			const y = row * cellSize;
			return {
					color: Object.entries(colors).sort((a, b) => a[1] < b[1] ? 1 : -1)[0][0],
					x,
					y,
				}
		})
		
		const context = canvas.getContext('2d');
		
		const t = timer(function(elapsed) {
			const scale = min([1, (elapsed / duration)]);

			context.clearRect(0, 0, size, size);
			for(const { color, x, y } of squares) {
				context.fillStyle = color;
				context.fillRect(x - (cellSize / 2) * (scale - 1), y - (cellSize / 2) * (scale - 1), cellSize * scale, cellSize * scale);
			}

			if(scale === 1) {
				t.stop();
			}
		}, delay);
	}
	
	onMount(() => {
		drawCanvas();
	})

</script>

<style>
	canvas {
		background: hsl(0, 0%, 20%);
	}
</style>

<canvas bind:this={canvas} width="{size}" height="{size}" />
