<script>
    import Form from './Form.svelte';
    import Victory from './Victory.svelte';
    import { markupTable, checkVictory } from "./utils.js";
    import { createEventDispatcher } from 'svelte';

    // transition the section from the left
    import { fly } from "svelte/transition";
    import { backInOut } from 'svelte/easing';


    // build the data structure included through the table element
    export let level;
    export let name;
    const rows = 5;
    const columns = 5;
    const levelsTable = markupTable(level, rows, columns);


    // gameplay
    // boolean describing the option selected in the input element(s) of type radio
    let isPencil = true;
    // boolean to restrict the logic behind the button presses
    // this to have the component wait until the end of a timeout before moving toward the victory state
    let isPlaying = true;
    // boolean used to describe the appropriate component
    let victory;

    // function receiving the tool from the form component
    // switch the boolean according to the argument passed in the detail property
    function handleChange(e) {
        isPencil = e.detail === 'Pencil';
    }

    // string describing a series of x(s)
    /* ! this approach is rather brittle and can be improved by re-considering the input data structure
    the idea is to update the string and compare it with the level string
    if the two have the same `o` characters, this describes a victory
    */
    let player = Array(level.length).fill('x').join('');

    // function following a click event on a button
    function handleClick() {
        // retrieve the data attributes added on each button
        const cell = this.getAttribute('data-cell');
        // since the first column and row describe the hint, deduct 1 by the row and column describing the position of the button
        const row = this.getAttribute('data-row') - 1;
        const column = this.getAttribute('data-column') - 1;
        const index = row * rows + column;

        // the game-play varies depending on the selected character
        const character = isPencil ? 'o' : 'x';
        // if the selected character matches the cell
        if(character === cell) {
            // include the character in the button
            this.innerHTML = `
            <svg viewBox="0 0 100 100" width="40" height="40">
                <use href="#${cell}"></use>
            </svg>
            `;
            // update the players string
            player = [...player.slice(0, index), character, ...player.slice(index + 1)].join('');

        } else {
            // if the two don't match include a red background for a brief moment, before returning to the original value
            const color = getComputedStyle(this).backgroundColor;
            this.style.background = 'hsl(0, 80%, 60%)';
            // ! use an arrow function to maintain the value of `this` as a reference to the button
            let timeout = setTimeout(() => {
                this.style.background = color;
                clearTimeout(timeout)
            }, 150);

            // remove the existing markup
            this.innerHTML = '';
            // update the players string to include the missing character
            player = [...player.slice(0, index), 'x', ...player.slice(index + 1)].join('');
        }

        // to check for a victory, use the utility function comparing the two strings
        if(checkVictory(level, player)) {
            // toggle the boolean to avoid reacting to a click on the button element
            isPlaying = false;
            // after a brief timeout switch the boolean to highlight the victory state
            let timeout = setTimeout(() => {
                victory = true;
                clearTimeout(timeout);
            }, 1000);
        }
    }

    // dispatch the reset event to reset the value of the `selection` variable
    // this moves the application back to the selection component
    const dispatch = createEventDispatcher();
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

<!-- graphics included in the table -->
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
    <!-- pass the name and string describing the level to highlight the session in the victory component -->
    <Victory
        name="{name}"
        level="{level}"
        on:reset="{handleReset}"/>
{:else}
    <!-- in a wrapping container describe a container for the input elements and the table with the actual level -->
    <section in:fly="{{ x: -50, duration: 600, easing: backInOut }}">

        <Form
            on:change="{handleChange}"/>

        <!-- table using the 2D array to describe the hints through span elements and the grid through button elements
        the <use> elements are included once the player interacts with the table
        -->
        <table>
            {#each levelsTable as row, indexRow}
            <tr>
                {#each row as cell, indexColumn}
                <td>
                    <!-- in the cell include the span elements for the hints or the button for the x and o characters -->
                    {#if (cell === 'x' || cell === 'o')}
                    <button
                        disabled="{!isPlaying}"
                        aria-label="Select cell"
                        data-cell="{cell}"
                        data-row="{indexRow}"
                        data-column="{indexColumn}"
                        on:click="{handleClick}">
                        <!-- <svg viewBox="0 0 100 100">
                            <use href="#{cell}"></use>
                        </svg> -->
                    </button>

                    {:else}

                        {#each [...cell] as hint}
                            <span>{hint}</span>
                        {/each}
                    {/if}
                </td>
                {/each}
            </tr>
            {/each}
        </table>
    </section>
{/if}
