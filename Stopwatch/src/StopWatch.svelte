<script>
    import { formatTime } from "./utils.js";
    import { tweened } from "svelte/motion";

    // lapse refers to the number of milliseconds in the stopwatch
    export let lapse = 0;

    // rotation refers to the degrees applied to the minutes dial to have a full rotation for 60 seconds
    // multiply the value by 60 for the seconds dial to have a full rotation every second
    $: rotation = ((lapse / 1000 / 60) * 360) % 360;

    // this is a very imperfect way to have the dials rotate smoothly back to 0
    // set a transition on the minutes and seconds dial, but only when lapse is set to 0
    // remove it when lapse is then more than 0
    let seconds;
    let minutes;
    // to avoid constantly setting transition to none add a boolean to short-circuit the second conditional
    let transitioned;

    // minutes and seconds are undefined by default
    $: if (!lapse && minutes && seconds) {
        minutes.style.transition = "transform 0.2s ease-in-out";
        seconds.style.transition = "transform 0.2s ease-in-out";
        transitioned = false;
    }
    $: if (lapse && !transitioned) {
        minutes.style.transition = "none";
        seconds.style.transition = "none";
        transitioned = true;
    }
</script>

<style>
    svg {
        font-family: "Roboto Mono", monospace;
        color: hsl(0, 0%, 5%);
    }
</style>
<svg viewBox="0 0 100 100" width="300" height="300">
    <g transform="translate(50 50)">
        <circle id="dial" cx="0" cy="0" r="42" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="0.3 1.898"></circle>
        <use href="#dial" transform="scale(-1 1)"></use>

        <!-- include the number of milliseconds in the rotation of the minutes dial
        1 full rotation for every 60 seconds
        -->
        <g bind:this="{minutes}" transform="rotate({rotation})">
            <g transform="translate(0 -50)">
                <path d="M -2.25 0 h 4.5 l -2.25 2.5 l -2.25 -2.5" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"></path>
            </g>
        </g>

        <g transform="translate(0 20)">
            <!-- include the number of milliseconds in the rotation of the minutes dial
            1 full rotation for every single second
            -->
            <g bind:this="{seconds}" transform="rotate({(rotation * 60) % 360})">
                <path d="M 0 -1 v -4.5" fill="none" stroke="currentColor" stroke-width="0.4" stroke-linejoin="round" stroke-linecap="round"></path>
            </g>
            <circle r="7" fill="none" stroke="currentColor" stroke-width="0.4"></circle>
            <circle r="1" fill="none" stroke="currentColor" stroke-width="0.4"></circle>
        </g>

        <text text-anchor="middle" fill="currentColor" dominant-baseline="middle" font-size="10" style="font-weight: 300; letter-spacing: 1px;">
            {formatTime(lapse)}
        </text>
    </g>
</svg>
