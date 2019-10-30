<script>
    import Selection from './Selection.svelte';
    import Game from './Game.svelte';

    // variable describing the selection and differentiating the two components
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

    // function called when a selection is made in the Selection component
    function handleSelection(e) {
        // update the selection with the level matching the name received in through the event
        selection = levels.find(({ name }) => name === e.detail);
    }

    // function called when the reset button is clicked in the Game component
    function handleReset() {
        // reset selection to present the selection's screen
        selection = null;
    }

</script>

{#if selection}
    <!-- pass to the Game component the level the name and level of the selection -->
    <Game
        {...selection}
        on:reset="{handleReset}"/>
{:else}
    <!-- pass in the Selection component an array describing the levels' names
    it is not necessary to pass the string representing the actual level
    -->
    <Selection
        options="{levels.map(({name}) => name)}"
        on:selection="{handleSelection}"/>
{/if}
