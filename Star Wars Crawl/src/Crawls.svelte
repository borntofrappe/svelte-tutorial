<script>
	export let title;
	export let text;
</script>

<style>
	main {
		color: hsl(60, 100%, 50%);
	}
	h1 {
		text-align: center;
	}
	p {
		line-height: 2;
	}
</style>

<main>
	<h1>
		{title}
	</h1>
	<p>
		{text}
	</p>
</main>