<script>
    import { time } from "./stores.js";
    import { convertToRoman } from "./utils.js";
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
<style>
    :global(*) {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    :global(body) {
        min-height: 100vh;
        font-family: serif;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    svg {
        width: 100vmin;
        max-width: 400px;
        height: auto;
        display: block;
    }
</style>

<svg viewBox="-50 -50 100 100" width="300" height="300">
    <defs>
        <circle id="outer" r="49.75" />
        <circle id="inner" r="32.75" />
        <circle id="border-outer" r="47.75" />
        <circle id="border-inner" r="30.75" />
        <path id="trace" d="M 0 -36 a 36 36 0 0 1 0 72 36 36 0 0 1 0 -72 36 36 0 0 1 0 72 36 36 0 0 1 0 -72" />

        <mask id="circle--mask">
            <use href="#outer" fill="hsl(0, 0%, 1000%)" />
            <use href="#inner" fill="hsl(0, 0%, 0%)" />
        </mask>
        <g id="hand--minutes">
            <path d="M 0 -42 q 0 8 2.5 16 a 2.5 2.5 0 0 1 -5 0 q 2.5 -8 2.5 -16" fill="hsl(0, 0%, 0%)" stroke-linecap="round" stroke="none" />
            <g fill="hsl(0, 0%, 0%)" stroke-linecap="round" stroke="hsl(0, 0%, 0%)" stroke-width="0.5">
                <path d="M 0 -26 q 0 10 1 16 t -1 10 m 0 -26 q 0 10 -1 16 t 1 10" />
            </g>
            <circle r="2" cy="-20" fill="hsl(0, 0%, 0%)" stroke="none" />
        </g>

        <g id="hand--hours">
            <path d="M 0 -28 q 0 8 2.5 12 a 2.5 2.5 0 0 1 -5 0 q 2.5 -4 2.5 -12" fill="hsl(0, 0%, 0%)" stroke-linecap="round" stroke="none" />
            <g fill="hsl(0, 0%, 0%)" stroke-linecap="round" stroke="hsl(0, 0%, 0%)" stroke-width="0.5">
                <path d="M 0 -16 q 0 5 1 9 t -1 7 m 0 -16 q 0 5 -1 9 t 1 7" />
            </g>
            <circle r="2" cy="-10" fill="hsl(0, 0%, 0%)" stroke="none" />
        </g>
    </defs>
    <g stroke="hsl(0, 0%, 0%)" stroke-width="0.5" fill="none">
        <use href="#outer" />
        <use href="#inner" />
        <use href="#border-outer" />
        <use href="#border-inner" />
    </g>

    <g mask="url(#circle--mask)">
        {#each numbers as number, index}
        <g transform="rotate(-150)">
            <text text-anchor="middle" font-size="12">
                <textPath href="#trace" startOffset="{25 + (50 /12 * index)}%" letter-spacing="-2">
                    {convertToRoman(number)}
                </textPath>
            </text>
        </g>
        <path transform="rotate({15 + 30 * number})" d="M 0 0 v -50" fill="none" stroke="hsl(0, 0%, 0%)" stroke-width="0.25" />
        {/each}
    </g>
    <g>
        <circle r="3" fill="hsl(0, 0%, 0%)" stroke="none" />
        <g transform="rotate({$minutes * 6})">
            <use href="#hand--minutes" />
        </g>

        <g transform="rotate({$hours >= 12 ? ($hours - 12) * 30 : $hours + 30})">
            <use href="#hand--hours" />
        </g>
    </g>
</svg>
