<script>
    import { getItem } from './utils.js';
    import { onDestroy } from 'svelte';
    import Splitting from './Splitting.svelte';

    let timeout;

    // set up an object describing the item character by character
    let item = getItem();
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


    // string destructured in the .keyboard container to add a button for each character
    const keys = 'qwertyuiopasdfghjklzxcvbnm\'.'.split('').map(character => ({
        value: character,
        ref: null
    }));

    // following the keydown event registered on the window call the handleKey function with the matching lowercase key
    function handleKeydown({ key }) {
        const button = keys.find(({ value, ref }) => value === key.toLowerCase());

        if (button) {
            handleKey(button.value);
            button.ref.style.background = 'hsl(0, 0%, 90%)';
            let timeoutButton = setTimeout(() => {
                button.ref.style.background = 'hsl(0, 0%, 100%)';
                clearTimeout(timeoutButton);
            }, 150)
        }
    }


    onDestroy(() => {
        clearTimeout(timeout);
        clearTimeout(timeoutButton);
    })


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

    section button:hover,
    section button.active {
        background: hsl(0, 0%, 95%);
        box-shadow: initial;
    }

    section button:focus {
        outline: none;
        border: 2px solid hsl(0, 0%, 20%);
        box-shadow: initial;
    }

    section .keyboard {
        max-width: 700px;
    }

    .keyboard {
        animation: popIn 0.4s 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }
</style>

<svelte:window on:keydown={handleKeydown} />

<section>
    <h2 aria-label={item}>
        <Splitting split={goal} />
    </h2>
    <div class="keyboard">
        {#each keys as key (key.value)}
            <button
                bind:this={key.ref}
                on:click={() => handleKey(key.value)}>
                {key.value}
            </button>
        {/each}
    </div>
</section>