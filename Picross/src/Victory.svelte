<script>
    // dispatch a reset event when clicking the button
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { markupSVG } from "./utils.js";
    import { fly } from "svelte/transition";
    import { backInOut } from "svelte/easing";

    const width = 100;
    const height = 100;
    const columns = 5;
    const rows = 5;

    export let level;
    export let name;
    const levelsSVG = markupSVG(level, rows);

    $: console.log(levelsSVG);
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

<section in:fly="{{ x: -50, duration: 650, easing: backInOut }}">
    <div>
        <h1>{name}</h1>
        <svg viewBox="0 0 {width} {height}" {width} {height}>
            <defs>
                <rect id="foreground" fill="hsl(0, 0%, 5%)" x="0" y="0" width="{width / columns}" height="{height / rows}"></rect>
                <rect opacity="0" id="background" fill="hsl(0, 0%, 100%)" x="0" y="0" width="{width / columns}" height="{height / rows}"></rect>
            </defs>
            {#each levelsSVG as row, y} {#each [...row] as cell, x}
            <use href="#{cell === 'x' ? 'background' : 'foreground'}" x="{x * width / columns}" y="{y * height / rows}"></use>
            {/each} {/each}
        </svg>
    </div>
    <button class="select" on:click="{() => {dispatch('reset');} }">Select new level</button>
</section>
