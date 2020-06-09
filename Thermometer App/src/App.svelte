<script>
	let value = 30;
</script>

<main>
	<svg viewBox="-50 -50 100 100" width="200" height="200">
	<text text-anchor="middle" font-size="20">{value}</text>
	</svg>

	<form>
		<label>
			Value
			<input type="number" bind:value/>
		</label>
	</form>
</main>

<style>
	
</style>