<script>
    import { onDestroy } from 'svelte';
	import StopWatch from './StopWatch.svelte';
	import Laps from './Laps.svelte';
	import Controls from './Controls.svelte';

	// import the number of milliseconds from the readable stores
	import { time } from './stores.js';

    // lapse is set to consider the time since the start button is first pressed
    let lapse = 0;
	// previous is set to record the time accumulated before the pause button is pressed
    let previous = 0;

    // unsubscribe is set to refer to the function used to unsubscribe from the store
    let unsubscribe;

    // through the start function pair the lapse variable to the time retrieved from the readable store
    function start() {
        // assign the stop function to unsubscribe
        unsubscribe = time.subscribe(value => {
            // add the previous value to the current number of milliseconds
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
        lapse = 0;
        previous = 0;

        laps = [];
        terminate();
    }

    // through the pause function unsubscribe from the store and set previous to match the value held by lapse
    function pause() {
        previous = lapse;
        terminate();
	}

    // describe the booleans to determine the button(s) included in the controls component
    // subscription refers to the state in which the start button has been pressed
    // here the subscription is ongoing and the unsubscribe variable holds a truthy value
    $:subscription = !!unsubscribe;
    // lapsed refers to the state in which the subscription  has started and lapse holds a value greater than 0
    $:lapsed = !!lapse;

	// laps refers to an array describing the number of milliseconds after each lap
	let laps = [];

    // through the lap function include an object specifying the total and partial number of milliseconds
    function lap() {
        const { length } = laps;
        const total = lapse;
        // partial referring to the number of milliseconds between the previous (if existing) and current lap
        const partial = length > 0 ? total - laps[0].total : total;
        laps = [{
            number: length + 1,
            total,
            partial,
        }, ...laps];
    }

    // unsubscribe from the store to avoid memory leaks
    onDestroy(() => {
        terminate();
    });

</script>

<div class="stopwatch">
    <!-- pass the number of milliseconds to the stopwatch component -->
    <StopWatch {lapse} />
    <!-- pass the array of laps to the laps component -->
    <Laps {laps} />
    <!-- following the events disaptched from the controls component call the start/pause/stop/lap function
    pass the necessary booleans to display the corecct button(s)
    -->
	<Controls on:start={start} on:stop={stop} on:pause={pause} on:lap={lap} {subscription} {lapsed} />
</div>
