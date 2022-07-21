import { readable } from 'svelte/store';

// set up a readable store which returns the number of milliseconds between the moment the store is subscribed and following an interval
export const time = readable(null, function start(set) {
	const beginning = new Date();
	const beginningTime = beginning.getTime();

	const interval = setInterval(() => {
		const current = new Date();
		const currentTime = current.getTime();
		set(currentTime - beginningTime);
	}, 10);

	return function stop() {
		clearInterval(interval);
	};
});