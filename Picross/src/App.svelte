<script>
    import Selection from './Selection.svelte';
    import Game from './Game.svelte';

    // variable describing the selection
    let selection;

    // levels describing the actual content through a string of x(s) and o(s)
    const levels = [
        {
            name: "Star",
            level: "ooxooooxooxxxxxoxxxooxoxo"
        },
        {
            name: "Mobile phone",
            level: "xxxoxxoooxxoxoxxoooxxooox"
        },
        {
            name: "Heart",
            level: "ooxooooooooooooxoooxxxoxx"
        },
        {
            name: "Musical note",
            level: "xxoooxxoxoxxoxooooxxoooxx"
        },
        {
            name: "Moon",
            level: "xxooxxxxoooxxoooooooxooox"
        }
    ];

    // function called when a selection is made in the selection component
    function handleSelection(e) {
        // update the selection with the level matching the name received in through the event
        selection = levels.find(({ name }) => name === e.detail);
    }

</script>

{#if selection}
    <!-- if a level is selected show the game component -->
    <Game level="{selection.level}"/>
{:else}
    <!-- pass in the selection component an array describing the levels' names -->
    <Selection on:selection="{handleSelection}" options="{levels.map(({name}) => name)}"/>
{/if}
