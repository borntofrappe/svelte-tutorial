const seeds = ['e','f','c','`'];
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
export function createDeck(cards) {
	const deck = [];
	while(deck.length < cards) {
		const card = randomCard();
		if(!deck.includes(card)) {
			deck.push(card);
		}
	}
	return deck;
}