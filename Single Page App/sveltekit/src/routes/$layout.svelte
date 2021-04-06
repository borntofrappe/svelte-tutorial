<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div>
	<Nav />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		position: relative;
		max-width: 62em;
		width: 90vw;
		padding: 2em;
		align-self: center;
		line-height: 1.75;
	}

	div :global(footer) {
		margin-top: auto;
	}
</style>
