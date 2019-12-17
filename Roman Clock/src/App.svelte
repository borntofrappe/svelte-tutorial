<script>
	import Clock from './Clock.svelte';
    import { time } from "./stores.js";
    import { tweened } from "svelte/motion";
    import { quintInOut } from "svelte/easing";

    const options = {
        easing: quintInOut,
        duration: 500
    };

    let hours = tweened($time.getHours(), options);
    let minutes = tweened($time.getMinutes(), options);

    $: hours.set($time.getHours());
    $: minutes.set($time.getMinutes());

    const numbers = Array(12)
        .fill()
        .map((val, index) => index + 1);
</script>

<Clock {hours} {minutes} />
