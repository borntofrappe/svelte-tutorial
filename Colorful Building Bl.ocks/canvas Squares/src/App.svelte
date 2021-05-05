<script>
	import { onMount, onDestroy } from 'svelte';
	import { timer } from 'd3-timer';
	import { min } from 'd3-array';
	
	const size = 500;
	const dimensions = 10;
	const cellSize = size / dimensions;
	
	const delay = 500;
	const duration = 1250;	
	let canvas;
	
	let squares = Array(dimensions ** 2).fill().map((_, i, { length }) => {
		/*
		// rainbow colors
		const color =  `hsl(${i * 360 / length}, 84%, 62%)`;
		*/
		const color =  `hsl(${Math.floor(Math.random() * 360)}, 84%, 62%)`;
		const column = (i % dimensions);
		const row = Math.floor(i / dimensions);
		const x = column * cellSize;
		const y = row * cellSize;
		return {
			color,
			x,
			y
		}
	});
	
	/*
	// requestAnimationFrame
	let timeout;
	*/
	onMount(() => {
		const context = canvas.getContext('2d');
		
		/*
		// requestAnimationFrame
		let start;
		function draw(timestamp) {
			if(!start) {
				start = timestamp;
			}
			
			const scale = Math.min(1, (timestamp - start) / duration);
			
			context.clearRect(0, 0, size, size);
			for(const { color, x, y } of squares) {
				context.fillStyle = color;
				context.fillRect(x - (cellSize / 2) * (scale - 1), y - (cellSize / 2) * (scale - 1), cellSize * scale, cellSize * scale);
			}

			if(scale < 1) {
				requestAnimationFrame(draw);
			}
		}
		
		timeout = setTimeout(() => {
			clearTimeout(timeout)
			requestAnimationFrame(draw);			
		}, delay);
		*/
							
		// d3.timer
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
	})
	
	/*
	// requestAnimationFrame
	onDestroy(() => {
		if (timeout) clearTimeout(timeout)
	})
	*/
</script>

<style>
	canvas {
		background: hsl(0, 0%, 20%);
	}
</style>

<canvas bind:this={canvas} width="{size}" height="{size}" />
