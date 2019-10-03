<script>
	import StopWatch from './StopWatch.svelte';
	import Laps from './Laps.svelte';
	import Controls from './Controls.svelte';

	// import the number of milliseconds from the readable stores
	import { time } from './stores.js';

	// previous is set to record the time accumulated before the pause button is pressed
	let previous = 0;
    // lapse is set to consider the time since the start button is first pressed
    let lapse = 0;

    // unsubscribe is set to refer to the function used to unsubscribe from the store
    let unsubscribe;

    // through the start function pair the lapse variable to the time retrieved from the readable store
    function start() {
        // assign the stop function to unsubscribe
        unsubscribe = time.subscribe(value => {
            // add the previous value
            lapse = value + previous;
        });
    }

    // through the terminate function unsubscribe from the readable store
    function terminate() {
        // check if unsubscribe is truthy (this to cover the situation in which the stop button is pressed after the pause button)
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    }

    // through the stop function unsubscribe from the readable store and reset the values
    function stop() {
        terminate();
        lapse = 0;
        previous = 0;
    }

    // through the pause function unsubscribe from the store and set previous to match the value held by lapse
    function pause() {
        terminate();
        previous = lapse;
	}

	// laps refers to an array describing the number of milliseconds after each lap
	let laps = [];

    $:isSubscribed = !unsubscribe;
    $:isLapsed = !!lapse;
</script>

<div class="stopwatch">
    <!-- pass the number of milliseconds to the stopwatch component -->
    <StopWatch {lapse} />
    <!-- pass the array of laps to the laps component -->
    <Laps {laps} />
    <!-- following the events disaptched from the controls component call the start/pause/stop/lap function  -->
	<Controls on:start={start} on:stop={stop} on:pause={pause} {isSubscribed} {isLapsed} />
</div>
