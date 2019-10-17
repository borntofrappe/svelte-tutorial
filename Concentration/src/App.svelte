<script>
	import { createDeck } from './utils.js';
	import Card from './Card.svelte';
	const deck = createDeck(16);	
</script>
<style>
	:global(body) {
		background: hsl(0, 0%, 10%);
	}
	main {
		display: grid;
		grid-template-columns: repeat(4, 150px);
		grid-auto-rows: 150px;
		grid-gap: 0.5rem;
		justify-content: center;
	}
</style>

<main>
	{#each deck as card}
		<Card {card} />
	{/each}
</main>
