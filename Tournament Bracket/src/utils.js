/* selectWinners
input: array of teams
output: halved array removing one item from every couplet
*/
export function selectWinners(teams) {
	const { length } = teams;
	const half = Array(length / 2)
		.fill()
		.map((item, index) => {
			// for the winner select one item from each couplet of the input array (meaning the first or second item, the third or the fourth and so forth)
			const winner = Math.floor(Math.random() * 2);
			return teams[index * 2 + winner];
		});
	return half;
}

/* uniqueIntegers
input: integer describing the number of integers and maximum value to be returned
output: array of unique integers up to the input value
*/
function uniqueIntegers(max) {
    // create an array and include a random integer at every nth-position, as long as that integer is not already in the array
    const arr = Array(max).fill();
    let index = 0;
    while(arr.includes()) {
        const unique = Math.floor(Math.random() * max);
        if(!arr.includes(unique)) {
            arr[index] = unique;
            index += 1;
        }
    }
    return arr;
}

/* shuffleArray
input: array of teams
output: array in which the items are shuffled at random
*/
export function shuffleTeams(teams) {
    const { length } = teams;
    // create an array of unique integers up to the length of the input array
    const indexes = uniqueIntegers(length);
    // return an array as big as the input array, including the items in the order described by the indexes array
	const arr = Array(length).fill().map((item, index) => teams[indexes[index]]);
	return arr;
};

