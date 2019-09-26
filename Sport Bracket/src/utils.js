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