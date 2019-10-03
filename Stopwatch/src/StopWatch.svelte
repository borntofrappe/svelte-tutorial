<script>
    import { formatTime } from "./utils.js";

    // lapse refers to the number of milliseconds in the stopwatch
    export let lapse = 0;
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
        <g class="rotate" transform="rotate({(lapse / 1000 / 60 * 360) % 360})">
            <g transform="translate(0 -50)">
                <path d="M -2.25 0 h 4.5 l -2.25 2.5 l -2.25 -2.5" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"></path>
            </g>
        </g>
        <g transform="rotate(0)">
            <!-- hard-coded value -->
            <g class="mark" transform="translate(0 0)" opacity="0">
                <!-- hard-coded value -->
                <g transform="translate(0 -38)">
                    <circle r="1" fill="currentColor"></circle>
                </g>
            </g>
        </g>

        <g transform="translate(0 20)">
            <!-- include the number of milliseconds in the rotation of the minutes dial
            1 full rotation for every single second
            -->
            <g class="rotate" transform="rotate({(lapse / 1000 * 360) % 360})">
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
