/* information recovered from this wiki page
https://en.wikipedia.org/wiki/Wind_chill#North_American_and_United_Kingdom_wind_chill_index
*/

// function computing the wind chill index with the provided temperature and speed
// ! accept as argument a boolean to describe whether to give the metric or imperial version
export function windChill(isMetric, temperature, speed) {
	return isMetric ? Math.round(13.12 + 0.6215 * temperature - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temperature * Math.pow(speed, 0.16)) : Math.round(35.74 + 0.6215 * temperature - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temperature * Math.pow(speed, 0.16));
}

// object describing the bounds for the input elements
export const bounds = {
	temperature: {
		metric: 10,
		imperial: 50,
	},
	speed: {
		metric: 4.8,
		imperial: 3
	}, 
}