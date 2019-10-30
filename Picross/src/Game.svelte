<script>
    import Form from './Form.svelte';
    import Victory from './Victory.svelte';
    import { markupTable, compareLetter } from "./utils.js";
    import { createEventDispatcher } from 'svelte';
    import { fly } from "svelte/transition";
    import { backInOut } from 'svelte/easing';


    // table
    export let level;
    export let name;
    const rows = 5;
    const columns = 5;
    const levelsTable = markupTable(level, rows, columns);


    // gameplay
    let isDrawing = true;
    let isPlaying = true;
    function handleChange(e) {
        isDrawing = e.detail === 'Pencil';
    }

    let player = Array(level.length).fill('x').join('');


    function handleClick() {
        if(isPlaying) {
            const cell = this.getAttribute('data-cell');

            const tool = isDrawing ? 'o' : 'x';
            const row = this.getAttribute('data-row') - 1;
            const column = this.getAttribute('data-column') - 1;
            const index = row * rows + column;

            if(cell === tool) {
                this.innerHTML = `
                <svg viewBox="0 0 100 100" width="40" height="40">
                    <use href="#${cell}"></use>
                </svg>
                `;
                player = [...player.slice(0, index), tool, ...player.slice(index + 1)].join('');

            } else {
                const color = getComputedStyle(this).backgroundColor;
                this.style.background = 'hsl(0, 80%, 60%)';
                let timeout = setTimeout(() => {
                    this.style.background = color;
                    clearTimeout(timeout)
                }, 150);
                this.innerHTML = '';
                player = [...player.slice(0, index), 'x', ...player.slice(index + 1)].join('');
            }

            if(compareLetter('o', level, player)) {
                isPlaying = false;
                let timeout = setTimeout(() => {
                    victory = true;
                    clearTimeout(timeout);
                }, 1000);
            }
        }
    }

    // victory
    let victory;
    const dispatch = createEventDispatcher();
    // dispatch a reset event to move the application back to the selection screen
    function handleReset() {
        dispatch('reset');
    }

</script>

<style>
    /* display the controls and table in a row */
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem 3rem;
        background: hsla(0, 0%, 100%, 0.5);
    }

    /* collapse the borders */
    table {
        border-collapse: collapse;
    }

    /* remove the borders for the cells representing the "hints" */
    tr:first-of-type td,
    tr td:first-of-type {
        border: none;
        /* reset the width to have the cell expand to cover the span's size */
        width: initial;
        height: initial;
    }
    /* align the cells toward the rest of the table */
    tr:first-of-type td {
        vertical-align: bottom;
    }
    tr td:first-of-type {
        text-align: right;
    }
    /* slightly separate the span elements included in the first column */
    tr td:first-of-type span {
        margin-right: 0.5rem;
    }
    /* position the span elements included in the first row atop one another */
    tr:first-of-type td span {
        display: block;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    /* style the span elements */
    tr td span {
        font-weight: 700;
        font-size: 1.25rem;
    }

    /* include a solid border for the rest of the table */
    td {
        border: 1px solid hsl(0, 0%, 70%);
    }
    /* change the background of selected buttons */
    table td:nth-of-type(odd) button {
        background: hsl(0, 0%, 100%);
    }
    table td:nth-of-type(even) button {
        background: hsl(0, 0%, 96%);
    }
    table tr:nth-last-of-type(odd) td:nth-last-of-type(odd) button {
        background: hsl(0, 0%, 98%);
    }
    table tr:nth-last-of-type(odd) td:nth-last-of-type(even) button {
        background: hsl(0, 0%, 94%);
    }

    /* have the nested button, occupy a fixed width and height */
    table tr td button {
        width: 45px;
        height: 45px;
        display: block;
        background: hsl(0, 0%, 100%);
        border: none;
    }
    /* stretch the svg to cover the width and height of the parent button */
    table tr td button svg {
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    /* for smaller viewports display the controls atop the table */
    @media (max-width: 550px) {
        section {
            flex-direction: column;
        }
    }
</style>

<svg style="opacity: 0; position: absolute; top: 100%; left: 100%; width: 0; height: 0;" viewBox="0 0 100 100">
    <defs>
        <clipPath id="clip-x">
            <rect x="0" y="0" width="60" height="60" transform="translate(20 20)"></rect>
        </clipPath>
        <linearGradient id="gradient-o" x1="0.5" x2="0.5" y1="0" y2="1">
            <stop stop-color="#001b85" offset="0"></stop>
            <stop stop-color="#2275dd" offset="0.5"></stop>
            <stop stop-color="#94cdff" offset="1"></stop>
        </linearGradient>
    </defs>

    <symbol id="x" clip-path="url(#clip-x)">
        <g transform="translate(50 50) scale(0.65)">
            <g transform="translate(-50 -50)">
                <path d="M 0 0 l 100 100 m -100 0 l 100 -100" stroke="#3890EC" stroke-width="18" fill="none"></path>
            </g>
        </g>
    </symbol>

    <symbol id="o">
        <rect x="0" y="0" width="100" height="100" fill="url(#gradient-o)"></rect>
        <path d="M 0 100 v -100 h 100" stroke="#fff" stroke-width="10" fill="none"></path>
        <path d="M 100 0 v 100 h -100" stroke="#000" stroke-width="10" fill="none"></path>
    </symbol>
</svg>

{#if victory}
    <Victory
        name="{name}"
        level="{level}"
        on:reset="{handleReset}"/>
{:else}
    <!-- in a wrapping container describe a container for the input elements and the table with the actual level -->
    <section in:fly="{{ x: -50, duration: 600, easing: backInOut }}">
        <Form on:change="{handleChange}"/>

        <!-- table using the 2D array to describe the hints through span elements and the grid through button elements
        the <use> elements are included once the player interacts with the table
        -->
        <table>
            {#each levelsTable as row, indexRow}
            <tr>
                {#each row as cell, indexColumn}
                <td>
                    {#if (cell === 'x' || cell === 'o')}
                    <button aria-label="Select cell" data-cell="{cell}" data-row="{indexRow}" data-column="{indexColumn}" on:click="{handleClick}">
                        <!-- <svg viewBox="0 0 100 100">
                            <use href="#{cell}"></use>
                        </svg> -->
                    </button>
                    {:else} {#each [...cell] as hint}
                    <span>{hint}</span>
                    {/each} {/if}
                </td>
                {/each}
            </tr>
            {/each}
        </table>
    </section>
{/if}
