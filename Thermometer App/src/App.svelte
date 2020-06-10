<script>
	import Display from './Display.svelte';
	let value = 35;
	let min = 30;
	let max = 40;

	$: if(value <= min) {
		min = value;
	}
	$: if(value >= max) {
		max = value;
	}

</script>

<main>
	<Display {value} {min} {max} />
	
	<form on:submit|preventDefault>
		<label>
			Value
			<input type="number" bind:value />
		</label>
		<label>
			Min
			<input type="number" bind:value={min}/>
		</label>
		<label>
			Max
			<input type="number" bind:value={max}/>
		</label>
	</form>
</main>

<style>
</style>