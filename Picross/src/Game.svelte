<script>
    export let level;

    let tool = "pencil";
    function handleInput(e) {
        console.log(e);
    }

    const rows = 5;
    const columns = 5;

    // 2D array describing the level according to its rows (picking the characters in groups of `rows`)
    const levelRows = Array(rows)
        .fill()
        .map((character, row) => [...level.slice(row * rows, row * rows + rows)]);

    // 2D array describing the level according to its columns (picking every 5th character)
    const levelColumns = Array(columns)
        .fill()
        .map((character, column) =>
            Array(columns)
                .fill()
                .map((item, col) => level[column + columns * col])
        );

    // 2D array describing the rows prepended with a string describing the contiguous characters
    const tableRows = levelRows.map(row => {
        const hintsRow = row.reduce(
            (acc, curr) => {
                const { character, hints } = acc;
                if (character === curr) {
                    hints[hints.length - 1] += 1;
                    return {
                        character,
                        hints
                    };
                }
                return {
                    character: curr,
                    hints: [...hints, 1]
                };
            },
            {
                character: "",
                hints: []
            }
        );
        return [hintsRow.hints.join(""), ...row];
    });

    // 1D array describing the first row of the table, with an empty cell followed by the strings describing the contiguous characters in the column
    const tableColumns = [
        "",
        ...levelColumns.map(column => {
            const hintsCol = column.reduce(
                (acc, curr) => {
                    const { character, hints } = acc;
                    if (character === curr) {
                        hints[hints.length - 1] += 1;
                        return {
                            character,
                            hints
                        };
                    }
                    return {
                        character: curr,
                        hints: [...hints, 1]
                    };
                },
                {
                    character: "",
                    hints: []
                }
            );
            return hintsCol.hints.join("");
        })
    ];

    // 2D array describing the table through each individual cell
    const levelsTable = [tableColumns, ...tableRows];
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
        margin-bottom: 1rem;
        /* rotate the container to direct the input elements toward the table to the right */
        transform: rotate(45deg);
    }
    /* separate the buttons vertically */
    form > * + * {
        margin-top: 1rem;
    }
    /* rotate the labels backwards to avoid rotating the icons */
    label {
        transform: rotate(-45deg);
        /* include the labels as circles with a fixed width and height */
        width: 65px;
        height: 65px;
        padding: 1rem;
        border-radius: 50%;
        color: hsl(0, 0%, 5%);
        border: 4px solid currentColor;
        background: hsl(0, 0%, 100%);
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
        /* align the cells toward the rest of the table */
        text-align: right;
        vertical-align: bottom;
        /* reset the width to have the cell expand to cover the span's size */
        width: initial;
        height: initial;
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

    /* have the nested button, or svg element, occupy the available width and height */
    td button {
        display: block;
        width: 100%;
        height: 100%;
        background: hsl(0, 0%, 100%);
        border: none;
    }
    td svg {
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
        div {
            transform: rotate(0);
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-evenly;
            align-items: center;
        }
        /* remove the space included between the controls */
        div > * + * {
            margin-top: 0;
        }
        label {
            transform: rotate(0);
            width: 60px;
            height: 60px;
        }
        /* reduce the size of the buttons and span elements */
        td button {
            width: 40px;
            height: 40px;
        }
        tr td span {
            font-size: 1rem;
        }
    }
</style>

<!-- in a wrapping container describe a container for the input elements and the table with the actual level -->
<section>
    <!-- input of type radio using an svg graphic to describe the two modalities of the game -->
    <form on:submit|preventDefault on:input="{handleInput}">
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
                <button></button>
                {:else} {#each [...cell] as hint}
                <span>{hint}</span>
                {/each} {/if}
            </td>
            {/each}
        </tr>
        {/each}
    </table>
</section>
