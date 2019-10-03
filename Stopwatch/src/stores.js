import { readable } from 'svelte/store';

// set up a readable store which returns the number of milliseconds between the moment the store is subscribed and following an interval
export const time = readable(0, function start(set) {
	const beginning = new Date();
	const beginningTime = beginning.getTime();

	const interval = setInterval(() => {
		const current = new Date();
		const currentTime = current.getTime();
		set(currentTime - beginningTime);
	}, 10);

	return function stop() {
		// ! forcedly set the readable value to 0 before clearing the interval
		// it seems the store would otherwise retain the last value and the application would stagger from this value straight to 0
		set(0);
		clearInterval(interval);
	};
});