<script>
	export let progress
	export let matches
	export let total
	export let moves
</script>

<section>
		<progress value={progress} />
		<p>
			Pairs matched
			<span>{matches}/{total}</span>
		</p>
	</section>

	<section>
		<p>
			Total moves
			<span>{moves}</span>
		</p>
	</section>