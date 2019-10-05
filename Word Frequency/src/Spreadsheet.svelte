<script>
    // transition directives for the table and items as they are added/removed
    import { fade, fly } from "svelte/transition";
    // animation directive for items as they are repositioned
    import { flip } from "svelte/animate";

    // use the data received from the parent component to create a table highlighting the words and frequencies
    export let data;
</script>

<style>
    /* second component
dedicate half a width to each column */
    section table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
        table-layout: fixed;
    }
    section table tr {
        line-height: 2.5;
    }
    section table tr th {
        text-transform: uppercase;
        font-size: 1.25rem;
        width: 50%;
        background: hsl(210, 90%, 60%);
        border-bottom: 2px solid hsl(210, 90%, 50%);
        color: hsl(0, 0%, 100%);
        font-weight: 500;
    }
    /* alternate the background color of the cells describing the data */
    section table tr:nth-of-type(even) td {
        background: hsl(210, 90%, 88%);
    }
    section table tr:nth-of-type(odd) td {
        background: hsl(210, 90%, 96%);
    }
</style>

<section class="spreadsheet" transition:fly="{{ x: -25 }}">
    <svg class="icon" viewBox="0 0 90 100" width="45" height="50">
        <use href="#table"></use>
    </svg>
    <table>
        <tr>
            <th>Word</th>
            <th>Frequency</th>
        </tr>
        <!-- for each object include a row with two cells, describing the word and frequency
		it is possible to use the word as a key as this is a unique value
		-->
        {#each data as datum (datum.word)}
        <tr transition:fly="{{ x: -50 }}" animate:flip>
            <td>{datum.word}</td>
            <td class="number">{datum.frequency}</td>
        </tr>
        {/each}
    </table>
</section>
