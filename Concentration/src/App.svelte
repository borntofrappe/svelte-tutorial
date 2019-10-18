<script>
	import { createDeck, randomUpTo } from './utils.js';
	import Card from './Card.svelte';
	const half = createDeck(8);
	let deck = [...half].map((value) => ({
		value,
		isFlipped: true,
		isPaired: false,
		id: Math.random(),
	}));

	for(let value of half) {
		const { length } = deck;
		const index = randomUpTo(length);
		const card = {
			value,
			isFlipped: true,
			isPaired: false,
			id: Math.random(),
		};
		deck = [...deck.slice(0, index), card, ...deck.slice(index)];
	}


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
			console.log('victory');
		}
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

<main>
	{#each deck as card (card.id)}
		<Card on:flip={handleFlip} {card} />
	{/each}
</main>
