<script>
    // the idea is to recursively call the bracket component with a smaller and smaller array (cut down in half each time)
    // as the array reaches 1 item, the idea is to then include such item in a heading
    // selectWinners allows to halve the array by selecting one item from each couplet
    import { selectWinners } from "./utils.js";

    export let teams;
    // describe the winner as the only item of the input array, if existing
    $: winner = teams.length === 1 && teams[0];
</script>

<style>
    /* to align the names vertically, stretch the list items in a flex-column  */
    ul {
        display: flex;
        flex-direction: column;
        /* flex grow to have the lists stretch and cover the available width (same as the heading) */
        flex-grow: 1;
        list-style: none;
    }
    ul li,
    h2 {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem 0.5rem;
        text-align: center;
    }
    ul li {
        position: relative;
    }
    /* with pseudo elements draw the following structure next to each couplet
    ---
        |
        |
    ---

    this by drawing half the structure on the even items and the mirrored tructure on the odd ones
    */
    ul li:before,
    ul li:after {
        position: absolute;
        content: "";
        top: 50%;
        left: 100%;
        background: currentColor;
    }
    ul li:before {
        width: 1rem;
        height: 2px;
        transform: translate(-100%, -50%);
    }
    ul li:after {
        width: 2px;
        height: 100%;
    }
    ul:nth-of-type(n) li:nth-of-type(odd):after {
        transform: translate(0%, 0%);
    }
    ul:nth-of-type(n) li:nth-of-type(even):after {
        transform: translate(0%, -100%);
    }
</style>

<!-- display the winner in a heading or an unordered list with the teams if no winner is identified -->
{#if winner}
<h2>{winner}</h2>
{:else}
<ul>
    {#each teams as team}
    <li>{team}</li>
    {/each}
</ul>

<!-- call the component itself passing as argument half the array
	this means the component renders a series of <ul> elements until a winner is described in the <h2> element
	-->
<svelte:self teams="{selectWinners(teams)}" />
{/if}
