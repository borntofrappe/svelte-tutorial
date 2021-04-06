<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('demos.json');
		const { demos } = await res.json();

		return {
			props: {
				demos
			}
		};
	}
</script>

<script>
	import Card from '$lib/Card.svelte';
	export let demos;
</script>

<svelte:head>
	<title>Demos</title>
</svelte:head>

<section>
	<h1 class="visually-hidden">Demos</h1>
	{#each demos as demo}
		<Card {...demo} />
	{/each}
</section>

<style>
	section {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fit, 18em);
		gap: 1.5rem;
	}

	section > :global(*) {
		color: hsl(0, 0%, 100%);
	}

	section > :global(*:nth-of-type(3n)) {
		background: hsl(240, 8%, 44%);
	}

	section > :global(*:nth-of-type(3n + 1)) {
		background: hsl(15, 100%, 50%);
	}

	section > :global(*:nth-of-type(3n + 2)) {
		background: hsl(204, 100%, 63%);
	}
</style>
