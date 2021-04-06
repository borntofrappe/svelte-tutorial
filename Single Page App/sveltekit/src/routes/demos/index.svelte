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

<a href="demos/add"
	>Add new demo

	<svg viewBox="0 0 100 100" width="1em" height="1em">
		<g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round">
			<g transform="translate(76 24)">
				<path
					d="M -20 0 h -37.5 a 15 15 0 0 0 -15 15 v 42.5 a 15 15 0 0 0 15 15 h 42.5 a 15 15 0 0 0 15 -15 v -37.5"
				/>
				<circle cx="0" cy="0" r="20" />
				<path stroke-width="5" d="M 0 -7 v 14 m -7 -7 h 14" />
			</g>
		</g>
	</svg>
</a>

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

	a {
		border-bottom: 1px solid currentColor;
		display: inline-block;
		margin: 2rem 0.5rem 1rem;
		font-size: 1.25rem;
	}
</style>
