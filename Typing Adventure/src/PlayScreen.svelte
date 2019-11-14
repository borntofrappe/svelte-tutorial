<script>
    import { getItem } from './utils.js';
    import { onDestroy } from 'svelte';

    // set up an object describing the item character by character
    let item = getItem();
    let timeout;
    $: goal = item.split('').map(character => ({
        // the id allows to include a new set of span elements once the item is re-assigned
        id: Math.random(),
        value: character,
        correct: false,
    }));

    // function receiving as input the character to match against the goal string
    function handleKey(key) {
        // find the first incorrect character
        const incorrectIndex = goal.findIndex(character => !character.correct);

        // if the key matches the character, switch its correct property
        // else reset every character's correct property to false
        if (key === goal[incorrectIndex].value.toLowerCase()) {
            goal[incorrectIndex].correct = true;
        } else {
            goal = goal.map(({ id, value }) => ({
                id,
                value,
                correct: false
            }));
        }

        // if every character is correct, establish a victory
        // following a brief timeout re-assign the item to show a new string
        const victory = goal.every(character => character.correct);
        if (victory) {
            let timeout = setTimeout(() => {
                item = getItem();
                clearTimeout(timeout);
            }, 200);
        }
    }

    // following the keydown event registered on the window call the handleKey function with the matching lowercase key
    function handleKeydown({ key }) {
        handleKey(key.toLowerCase());
    }


    onDestroy(() => {
        clearTimeout(timeout);
    })

    // string destructured in the .keyboard container to add a button for each character
    const keys = 'qwertyuiopasdfghjklzxcvbnm\'';
</script>

<style>
    section h2 {
        font-family: 'Catamaran', sans-serif;
        font-size: 3.5rem;
        letter-spacing: 0.01rem;
    }

    section button {
        font-family: inherit;
        background: hsl(0, 0%, 100%);
        border: 2px solid hsl(0, 0%, 90%);
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
        color: hsl(0, 0%, 20%);
        box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
    }

    section button:hover {
        background: hsl(0, 0%, 95%);
        box-shadow: initial;

    }

    section button:focus {
        outline: none;
        border: 2px solid hsl(0, 0%, 20%);
        box-shadow: initial;
    }

    section .keyboard {
        max-width: 650px;
    }

    /* styles included once splitting js has had a change to split the actual text */
    h2 span {
        display: inline-block;
        animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        animation-delay: calc(var(--char-index) * 0.05s + 0.15s);
    }

    .keyboard {
        animation: popIn 0.4s 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }

    @keyframes popIn {
        0% {

            opacity: 0;
            transform: translateY(20px);
        }

        100% {
            opacity: initial;
            transform: initial;
        }
    }
</style>

<svelte:window on:keydown={handleKeydown} />

<section>
    <h2 aria-label={item}>
        {#each goal as letter, i (letter.id)}
            <span aria-hidden="true" style="animation-delay: {i * 0.04 + 0.15}s; color: {letter.correct ? 'hsl(130, 70%, 60%)' : 'inherit'}">{letter.value}</span>
        {/each}
    </h2>
    <div class="keyboard">
        {#each keys as key}
            <button on:click={() => handleKey(key)}>{key}</button>
        {/each}
    </div>
</section>