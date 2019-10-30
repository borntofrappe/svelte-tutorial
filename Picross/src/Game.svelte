<script>
    import { markupTable } from "./utils.js";
    export let level;
    const rows = 5;
    const columns = 5;
    const levelsTable = markupTable(level, rows, columns);

    function handleChange(e) {
        console.log(e);
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

    /* display the buttons in a column, at the top of the row */
    form {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-right: 2rem;
        margin-bottom: 2rem;
    }
    /* separate the buttons vertically */
    form > * + * {
        margin-top: 1rem;
    }
    /* include the labels as circles with a fixed width and height */
    label {
        width: 65px;
        height: 65px;
        padding: 1rem;
        border-radius: 50%;
        color: hsl(0, 0%, 5%);
        border: 4px solid currentColor;
        background: hsl(0, 0%, 100%);
        position: relative;
    }
    /* by default reduce the scale and opacity of the graphic nested in each label
set the original values when the connected input of type radio is checked
*/
    label input + svg {
        opacity: 0.5;
        transform: scale(0.8);
        transition: all 0.25s ease-in-out;
    }
    label input:checked + svg {
        opacity: 1;
        transform: scale(1);
    }
    /* position the input of type radio on top of the svg graphic */
    label input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    label svg {
        display: block;
        width: 100%;
        height: 100%;
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
        /* have each cell occupy a fixed width and height */
        width: 45px;
        height: 45px;
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

    /* have the nested button, occupy the available width and height */
    td button {
        display: block;
        width: 100%;
        height: 100%;
        background: hsl(0, 0%, 100%);
        border: none;
    }
    /* stretch the svg to cover the width and height of the parent button */
    td button svg {
        position: absolute;
        top: 0%;
        left: 0%;
        display: block;
        width: 100%;
        height: 100%;
    }

    /* for smaller viewports the table starts to be more brittle */
    @media (max-width: 550px) {
        /* display the controls atop the table */
        section {
            flex-direction: column;
        }
        /* display the controls in a row */
        form {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-evenly;
            align-items: center;
        }
        /* remove the space included between the controls */
        form > * + * {
            margin-top: 0;
        }
        label {
            width: 60px;
            height: 60px;
        }
    }
</style>

<svg style="opacity: 0; position: absolute; top: 100%; left: 100%;" viewBox="0 0 100 100">
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

<!-- in a wrapping container describe a container for the input elements and the table with the actual level -->
<section>
    <!-- input of type radio using an svg graphic to describe the two modalities of the game -->
    <form on:submit|preventDefault on:change="{handleChange}">
        <label aria-label="Select pencil" for="pencil">
            <!-- by default check the first input -->
            <input type="radio" name="tool" id="pencil" checked />
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <g stroke="none" fill="currentColor">
                    <path d="M 0 100 h 30 l 70 -70 l -30 -30 l -70 70"></path>
                </g>
            </svg>
        </label>

        <label aria-label="Select eraser" for="easer">
            <input type="radio" name="tool" id="erase" />
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <g stroke="none" fill="currentColor">
                    <path d="M 0 0 h 20 l 30 30 l 30 -30 h 20 v 20 l -30 30 l 30 30 v 20 h -20 l -30 -30 l -30 30 h -20 v -20 l 30 -30 l -30 -30"></path>
                </g>
            </svg>
        </label>
    </form>

    <table>
        {#each levelsTable as row}
        <tr>
            {#each row as cell}
            <td>
                {#if (cell === 'x' || cell === 'o')}
                <button aria-label="Select cell">
                    <svg viewBox="0 0 100 100">
                        <use href="#{cell}"></use>
                    </svg>
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
