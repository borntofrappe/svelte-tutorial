<script>
	import { tweened } from 'svelte/motion';
	
	const viewBoxes = [
		{
			x: 0,
			y: 0,
			width: 100,
			height: 100,
		},
		{
			x: 20,
			y: 50,
			width: 10,
			height: 10,
		}
	];
	
	let viewBox = tweened(viewBoxes[0]);
	let checked;
	$: if(checked) {
		viewBox.set(viewBoxes[1]);
	} else {
		viewBox.set(viewBoxes[0]);
	}
</script>

<label>
	<span>zoomed {checked ? 'in' : 'out'}</span>
	<input type="checkbox" bind:checked />
</label>

<svg viewBox="{Object.values($viewBox)}" width="300" height="300">
	<rect width="100" height="100" />
	<rect x="20" y="50" width="10" height="10" fill="yellow" />
</svg>
