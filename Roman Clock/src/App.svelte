<script>
	import Clock from './Clock.svelte';
    import { time } from "./stores.js";
    import { tweened } from "svelte/motion";
    import { quintInOut } from "svelte/easing";

    const options = {
        easing: quintInOut,
        duration: 500
    };

	// initialize hours and minutes t refer to the current time
    let hours = tweened($time.getHours(), options);
    let minutes = tweened($time.getMinutes(), options);

	// update the variables only as the hours and minutes change
    $: hours.set($time.getHours());
    $: minutes.set($time.getMinutes());
</script>

<Clock {hours} {minutes} />
