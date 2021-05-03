<script>
	import { tweened } from 'svelte/motion'
	import { cubicInOut as easing } from 'svelte/easing'
	import { fly, fade } from 'svelte/transition'
	
	const dimensions = 20;
	const colors = Array(dimensions ** 2).fill().map((_, i, { length }) => `hsl(${360 / length * i}, 80%, 60%)`)
	
	const duration = 1250;
	const coordinates = [
		{
			x: 0,
			y: 0,
			width: 550,
			height: 160
		},
		{
			x: 360,
			y: 130,
			width: 10,
			height: 10
		}
	]
	
	const coords = tweened(coordinates[0], {
		easing,
		duration
	})
	
	let svg;
	let canvas;

	function handleInput(e) {
		const {checked} = e.target;
		if(checked) {
			const promise = coords.set(coordinates[1])
			promise
				.then(() => {
					const { width, height } = svg.getBoundingClientRect();
					canvas.width = width;
					canvas.height = height;
					const context = canvas.getContext('2d');
					const cellSize = Math.ceil(width / Math.floor(colors.length ** 0.5));
					for(let i = 0; i < colors.length; i += 1) {
						context.fillStyle = colors[i];
						context.strokeStyle = colors[i];
						const column = i % dimensions;
						const row = ~~(i / dimensions)
						context.fillRect(column * cellSize, row * cellSize, cellSize, cellSize)
						context.strokeRect(column * cellSize, row * cellSize, cellSize, cellSize)
					}
					
			})
		} else {
			coords.set(coordinates[0])
		}
	}
	let checked;
	
</script>

<label>
	<input type="checkbox" bind:checked on:input={handleInput} />
	<span>zoom {checked ? 'out' : 'in'}</span>
</label>

<style>
	main {
		max-width: 500px;
		width: 90vw;
		margin: 1rem auto;
		position: relative;
	}
	svg {
		width: 100%;
		height: auto;
		display: block;
	}
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>

<main>
<svg bind:this={svg} xmlns="http://www.w3.org/2000/svg" viewBox="{$coords.x} {$coords.y} {$coords.width} {$coords.height}"><g fill="currentColor" stroke="currentColor"><rect x="70" y="110" width="10" height="10"></rect><rect x="70" y="120" width="10" height="10"></rect><rect x="70" y="130" width="10" height="10"></rect><rect x="80" y="130" width="10" height="10"></rect><rect x="90" y="130" width="10" height="10"></rect><rect x="90" y="120" width="10" height="10"></rect><rect x="90" y="110" width="10" height="10"></rect><rect x="110" y="110" width="10" height="10"></rect><rect x="110" y="120" width="10" height="10"></rect><rect x="110" y="130" width="10" height="10"></rect><rect x="110" y="90" width="10" height="10"></rect><rect x="130" y="90" width="10" height="10"></rect><rect x="130" y="100" width="10" height="10"></rect><rect x="130" y="110" width="10" height="10"></rect><rect x="130" y="120" width="10" height="10"></rect><rect x="130" y="130" width="10" height="10"></rect><rect x="170" y="90" width="10" height="10"></rect><rect x="170" y="100" width="10" height="10"></rect><rect x="170" y="110" width="10" height="10"></rect><rect x="170" y="120" width="10" height="10"></rect><rect x="170" y="130" width="10" height="10"></rect><rect x="160" y="130" width="10" height="10"></rect><rect x="150" y="130" width="10" height="10"></rect><rect x="150" y="120" width="10" height="10"></rect><rect x="150" y="110" width="10" height="10"></rect><rect x="160" y="110" width="10" height="10"></rect><rect x="30" y="90" width="10" height="10"></rect><rect x="30" y="100" width="10" height="10"></rect><rect x="30" y="110" width="10" height="10"></rect><rect x="30" y="120" width="10" height="10"></rect><rect x="30" y="130" width="10" height="10"></rect><rect x="40" y="130" width="10" height="10"></rect><rect x="50" y="130" width="10" height="10"></rect><rect x="50" y="120" width="10" height="10"></rect><rect x="50" y="110" width="10" height="10"></rect><rect x="40" y="110" width="10" height="10"></rect><rect x="190" y="110" width="10" height="10"></rect><rect x="190" y="120" width="10" height="10"></rect><rect x="190" y="130" width="10" height="10"></rect><rect x="190" y="90" width="10" height="10"></rect><rect x="210" y="110" width="10" height="10"></rect><rect x="210" y="120" width="10" height="10"></rect><rect x="210" y="130" width="10" height="10"></rect><rect x="220" y="110" width="10" height="10"></rect><rect x="230" y="110" width="10" height="10"></rect><rect x="230" y="120" width="10" height="10"></rect><rect x="230" y="130" width="10" height="10"></rect><rect x="250" y="110" width="10" height="10"></rect><rect x="250" y="120" width="10" height="10"></rect><rect x="250" y="130" width="10" height="10"></rect><rect x="260" y="130" width="10" height="10"></rect><rect x="270" y="130" width="10" height="10"></rect><rect x="270" y="120" width="10" height="10"></rect><rect x="270" y="110" width="10" height="10"></rect><rect x="260" y="110" width="10" height="10"></rect><rect x="270" y="140" width="10" height="10"></rect><rect x="270" y="150" width="10" height="10"></rect><rect x="260" y="150" width="10" height="10"></rect><rect x="250" y="150" width="10" height="10"></rect><rect x="300" y="90" width="10" height="10"></rect><rect x="300" y="100" width="10" height="10"></rect><rect x="300" y="110" width="10" height="10"></rect><rect x="300" y="120" width="10" height="10"></rect><rect x="300" y="130" width="10" height="10"></rect><rect x="310" y="130" width="10" height="10"></rect><rect x="320" y="130" width="10" height="10"></rect><rect x="320" y="120" width="10" height="10"></rect><rect x="320" y="110" width="10" height="10"></rect><rect x="310" y="110" width="10" height="10"></rect><rect x="340" y="90" width="10" height="10"></rect><rect x="340" y="100" width="10" height="10"></rect><rect x="340" y="110" width="10" height="10"></rect><rect x="340" y="120" width="10" height="10"></rect><rect x="340" y="130" width="10" height="10"></rect><rect x="360" y="130" width="10" height="10"></rect><rect x="380" y="110" width="10" height="10"></rect><rect x="380" y="120" width="10" height="10"></rect><rect x="380" y="130" width="10" height="10"></rect><rect x="390" y="130" width="10" height="10"></rect><rect x="400" y="130" width="10" height="10"></rect><rect x="400" y="120" width="10" height="10"></rect><rect x="400" y="110" width="10" height="10"></rect><rect x="390" y="110" width="10" height="10"></rect><rect x="430" y="110" width="10" height="10"></rect><rect x="420" y="110" width="10" height="10"></rect><rect x="420" y="120" width="10" height="10"></rect><rect x="420" y="130" width="10" height="10"></rect><rect x="430" y="130" width="10" height="10"></rect><rect x="450" y="130" width="10" height="10"></rect><rect x="450" y="120" width="10" height="10"></rect><rect x="450" y="110" width="10" height="10"></rect><rect x="450" y="100" width="10" height="10"></rect><rect x="470" y="110" width="10" height="10"></rect><rect x="470" y="130" width="10" height="10"></rect><rect x="460" y="120" width="10" height="10"></rect><rect x="500" y="100" width="10" height="10"></rect><rect x="490" y="110" width="10" height="10"></rect><rect x="500" y="120" width="10" height="10"></rect><rect x="490" y="130" width="10" height="10"></rect><rect x="30" y="50" width="10" height="10"></rect><rect x="30" y="40" width="10" height="10"></rect><rect x="30" y="30" width="10" height="10"></rect><rect x="30" y="20" width="10" height="10"></rect><rect x="30" y="10" width="10" height="10"></rect><rect x="40" y="10" width="10" height="10"></rect><rect x="50" y="10" width="10" height="10"></rect><rect x="60" y="10" width="10" height="10"></rect><rect x="30" y="60" width="10" height="10"></rect><rect x="40" y="60" width="10" height="10"></rect><rect x="50" y="60" width="10" height="10"></rect><rect x="60" y="60" width="10" height="10"></rect><rect x="80" y="40" width="10" height="10"></rect><rect x="80" y="50" width="10" height="10"></rect><rect x="80" y="60" width="10" height="10"></rect><rect x="90" y="60" width="10" height="10"></rect><rect x="100" y="60" width="10" height="10"></rect><rect x="100" y="50" width="10" height="10"></rect><rect x="100" y="40" width="10" height="10"></rect><rect x="90" y="40" width="10" height="10"></rect><rect x="120" y="20" width="10" height="10"></rect><rect x="120" y="30" width="10" height="10"></rect><rect x="120" y="40" width="10" height="10"></rect><rect x="120" y="50" width="10" height="10"></rect><rect x="120" y="60" width="10" height="10"></rect><rect x="140" y="40" width="10" height="10"></rect><rect x="140" y="50" width="10" height="10"></rect><rect x="140" y="60" width="10" height="10"></rect><rect x="150" y="60" width="10" height="10"></rect><rect x="160" y="60" width="10" height="10"></rect><rect x="160" y="50" width="10" height="10"></rect><rect x="160" y="40" width="10" height="10"></rect><rect x="150" y="40" width="10" height="10"></rect><rect x="180" y="60" width="10" height="10"></rect><rect x="180" y="50" width="10" height="10"></rect><rect x="180" y="40" width="10" height="10"></rect><rect x="190" y="40" width="10" height="10"></rect><rect x="230" y="20" width="10" height="10"></rect><rect x="210" y="60" width="10" height="10"></rect><rect x="210" y="50" width="10" height="10"></rect><rect x="210" y="40" width="10" height="10"></rect><rect x="210" y="30" width="10" height="10"></rect><rect x="220" y="20" width="10" height="10"></rect><rect x="220" y="40" width="10" height="10"></rect><rect x="240" y="40" width="10" height="10"></rect><rect x="240" y="50" width="10" height="10"></rect><rect x="240" y="60" width="10" height="10"></rect><rect x="250" y="60" width="10" height="10"></rect><rect x="260" y="60" width="10" height="10"></rect><rect x="260" y="50" width="10" height="10"></rect><rect x="260" y="40" width="10" height="10"></rect><rect x="280" y="20" width="10" height="10"></rect><rect x="280" y="30" width="10" height="10"></rect><rect x="280" y="40" width="10" height="10"></rect><rect x="280" y="50" width="10" height="10"></rect><rect x="280" y="60" width="10" height="10"></rect></g><rect width="520" height="160" opacity="0"></rect></svg>
	
	{#if checked}
		<canvas in:fly={{delay: duration}} out:fade bind:this={canvas} />	
	{/if}
</main>
	