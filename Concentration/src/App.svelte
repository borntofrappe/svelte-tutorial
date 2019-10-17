<script>
	import { createDeck } from './utils.js';
	import Card from './Card.svelte';
	const deck = createDeck(16);
</script>
<style>
	main {
		margin: 1rem auto;
		width: 90vw;
		max-width: 700px;
		display: grid;
		grid-template-columns: repeat(auto-fit, 140px);
		grid-auto-rows: max-content;
		grid-gap: 1rem;
		justify-content: space-evenly;
	}
</style>

<main>
	{#each deck as card}
		<Card {card} />
	{/each}
</main>
