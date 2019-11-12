<script>
    import { randomPokemon } from './utils.js';
    // initialize a value with a random item with the utility function
    let pokemon = randomPokemon();

    // keep track of user input
    let input = '';

    // following a keydown event on the window compare the input and pokemon string
    function handleKeydown(e) {
        const { key } = e;
        input += key;

        const { length } = input;
        // add log statements describing a possible match
        if (input.toLowerCase() === pokemon.slice(0, length).toLowerCase()) {
            console.log('matching');
            // when the string is completely matched update pokemon with a new random value
            if (length === pokemon.length) {
                console.log('win');
                input = '';
                pokemon = randomPokemon()
            }
        } else {
            input = '';
        }
        console.log(input);
    }
</script>
<!-- listen for the keydown event on the entire window -->
<svelte:window on:keydown={handleKeydown} />

<!-- in the heading display the pokemon -->
<h1>{pokemon}</h1>