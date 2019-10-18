<script>
	import { stackDeck } from './utils.js';
	import Card from './Card.svelte';
	import Victory from './Victory.svelte';

	const cards = 16;
	let deck = stackDeck(cards);

	let victory;

	function handleFlip(e) {
		const  selection  = e.detail;
		const index = deck.findIndex(({id}) => id === selection.id);
		deck[index].isFlipped = !deck[index].isFlipped;

		const flipped = deck.filter(({isFlipped, isPaired}) => !isFlipped && !isPaired);

		if(flipped.length > 2) {
			deck.forEach(card => {
				if(card.id !== selection.id) {
					card.isFlipped = true;
				}
			});
		} else if(flipped.length === 2) {
			const [cardA, cardB] = flipped;
			const indexA = deck.findIndex(({id}) => id === cardA.id);
			const indexB = deck.findIndex(({id}) => id === cardB.id);
			if(cardA.value === cardB.value) {
				deck[indexA].isPaired = true;
				deck[indexB].isPaired = true;
			}
		}

		const hasWon = deck.every(card => card.isPaired);
		if(hasWon) {
			victory = true;
		}
	}

	function handleReset() {
		victory = null;
		deck = stackDeck(cards);
	}

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
		justify-content: center;
	}
</style>

{#if victory}
	<Victory on:reset={handleReset} />
{/if}

<main>
	{#each deck as card (card.id)}
		<Card on:flip={handleFlip} {card} />
	{/each}
</main>
