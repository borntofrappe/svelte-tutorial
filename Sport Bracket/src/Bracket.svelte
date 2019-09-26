<script>
    // the idea is to recursively call the bracket component with a smaller and smaller array (cut down in half each time)
    // as the array reaches 1 item, the idea is to then include such item in a heading
    // selectWinners allows to halve the array by selecting one item from each couplet
    import { selectWinners } from "./utils.js";

    export let teams;
    // describe the winner as the only item of the input array, if existing
    $: winner = teams.length === 1 && teams[0];
</script>

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
