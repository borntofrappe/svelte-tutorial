import { writable } from 'svelte/store';

function createMetric() {
	const metrics = ['c', 'a', 'd'];
	const { subscribe, set } = writable('c');
	
	return {
		subscribe,
		set: (metric) => {
			if(!metrics.includes(metric)) return;
			set(metric);
		}
	}
}

export const metric = createMetric();