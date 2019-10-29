<script>
    import Selection from './Selection.svelte';

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

    $:console.log(selection);

</script>

<!-- pass in the selection component an array describing the levels' names -->
<Selection on:selection="{handleSelection}" options="{levels.map(({name}) => name)}"/>
