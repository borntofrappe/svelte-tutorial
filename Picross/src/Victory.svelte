<script>
    import { markupSVG } from "./utils.js";
    // dispatch a reset event when clicking the button
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { fly } from "svelte/transition";
    import { backInOut } from "svelte/easing";

    // build the data structure included through the table element
    const width = 100;
    const height = 100;
    const columns = 5;
    const rows = 5;

    export let level;
    export let name;
    const levelsSVG = markupSVG(level, rows);
</script>
<style>
    /* center the button */
    section {
        text-align: center;
    }
    section > * + * {
        margin-top: 1rem;
    }
    div > * + * {
        margin-top: 2rem;
    }
    /* use a semitransparent background for the container describing the heading and svg element */
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 4rem;
        background: hsla(0, 0%, 100%, 0.5);
    }

    h1 {
        font-size: 2rem;
        text-align: center;
    }
    svg {
        display: block;
        width: 200px;
        height: 200px;
    }
</style>

<!-- display the level through its name and use an svg element to draw the shape through a series of squares -->
<section>
    <div in:fly="{{ x: -50, duration: 650, easing: backInOut }}">
        <h1>{name}</h1>
        <svg viewBox="0 0 {width} {height}" {width} {height}>
            <defs>
                <rect id="foreground" fill="hsl(0, 0%, 5%)" x="0" y="0" width="{width / columns}" height="{height / rows}"></rect>
                <rect opacity="0" id="background" fill="hsl(0, 0%, 100%)" x="0" y="0" width="{width / columns}" height="{height / rows}"></rect>
            </defs>
            <!-- for each row -->
            {#each levelsSVG as row, y}
            <!-- for each column -->
            {#each [...row] as cell, x}
            <!-- include a use element according to the cell's value, and positioned inside the madeup grid according to the index -->
            <use href="#{cell === 'x' ? 'background' : 'foreground'}" x="{x * width / columns}" y="{y * height / rows}"></use>
            {/each} {/each}
        </svg>
    </div>

    <button in:fly="{{ x: -50, duration: 650, easing: backInOut, delay: 100 }}" class="btn" on:click="{() => {dispatch('reset');} }">
        Select new level
    </button>
</section>
