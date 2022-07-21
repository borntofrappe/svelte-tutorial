// possible values for the cards, with four seeds and ten numbers + figures
const seeds = ['♥','♦','♣','♠'];
const numbers = Array(9).fill().map((item, index) => index + 1);
const figures = ['J', 'Q', 'K']
const values = [...numbers, ...figures];

// utility function returning a random item from an array
function randomItem(arr) {
	const { length } = arr;
	const index = Math.floor(Math.random() * length);
	return arr[index];
}

// function creating a random card from the seeds and values array
function randomCard() {
	const seed = randomItem(seeds);
	const value = randomItem(values);
	const card = `${value}${seed}`;
	return card;
}

// function returning an integer up to a maximum
function randomUpTo(max) {
	return Math.floor(Math.random() * max);
}

// function creating a deck of a prescribed number of cards
function createDeck(cards) {
	const deck = [];
	// the idea is to include _unique_ values for the card
	while(deck.length < cards) {
		const card = randomCard();
		if(!deck.includes(card)) {
			deck.push(card);
		}
	}
	return deck;
}

// function creating a deck in which a set of card is repeated twice and shuffled in order
// the game is meant to match the cards in pairs
export function stackDeck(cards) {
	const half = createDeck(cards / 2);
	/* each card is built as an object with the following properties
	- value, describing the actual card
	- isFlipped, to describe whether or not the card should be rotated (by default rotated on its back)
	- isPaired, to describe if the card has been paired
	- id, to differentiate the cards
	*/
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
