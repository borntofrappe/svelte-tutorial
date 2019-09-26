import { writable } from 'svelte/store';

// starting from a hard-coded array of names
const teams = [
		'Turtles',
		'Hummingbirds',
		'Dolphins',
		'Lambs',
		'Lions',
		'Giraffes',
		'Wolves',
		'Pellicans'
    ];

export const names = writable(teams);

