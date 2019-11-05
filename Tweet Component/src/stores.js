import { readable } from 'svelte/store';

// readable store setting up an interval to describe an instance of the current date
export let time = readable(new Date(), function start(set) {
    let interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return function stop() {
        clearInterval(interval);
    }
});