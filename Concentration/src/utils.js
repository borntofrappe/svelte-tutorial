const seeds = ['♥','♦','♣','♠'];
const numbers = Array(9).fill().map((item, index) => index + 1);
const values = [...numbers, 'J', 'Q', 'K'];

function randomItem(arr) {
	const { length } = arr;
	const index = Math.floor(Math.random() * length);
	return arr[index];
}

function randomCard() {
	const seed = randomItem(seeds);
	const value = randomItem(values);
	const card = `${value}${seed}`;
	return card;
}

function randomUpTo(max) {
	return Math.floor(Math.random() * max);
}

function createDeck(cards) {
	const deck = [];
	while(deck.length < cards) {
		const card = randomCard();
		if(!deck.includes(card)) {
			deck.push(card);
		}
	}
	return deck;
}

export function stackDeck(cards) {
	const half = createDeck(cards / 2);
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
	return deck;
}
