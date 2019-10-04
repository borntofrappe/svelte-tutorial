<script>
    /* form component
	- create the array of words & frequency from the input element
	- dispatch an _update_ event passing the array as argument
	*/
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // value bound to the input element
    let value = "initial text value to just see the table";
    // array describing the words & frequency
    let data = [];
    0;
    // regular expression identifying words
    const regexWord = /\w+/g;

    /* the idea is to use the regex on the value picked up from the input element
	this returns an array of strings which is in turn reduced to an array of objects
	objects describing the word and its frequency
	*/
    function handleSubmit() {
        if (value) {
            data = value
                // array of words
                .match(regexWord)
                // array of _lowercase_ words
                .map(word => word.toLowerCase())
                // array describing for each word 1 objects with the string value and its frequency
                .reduce((acc, curr) => {
                    const index = acc.findIndex(({ word }) => word === curr);
                    if (index === -1) {
                        return [
                            ...acc,
                            {
                                word: curr,
                                frequency: 1
                            }
                        ];
                    }
                    acc[index].frequency += 1;
                    return acc;
                }, [])
                // sorted in descending order
                .sort((a, b) => b.frequency - a.frequency);
        } else {
            // ! if value doesn't hold a value reset data to an empty array
            data = [];
        }
        dispatch("update", data);
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        padding: 1.25rem 1rem;
        background: hsl(0, 0%, 100%);
        box-shadow: 0 -1px 10px -5px hsl(0, 0%, 0%, 0.2);
    }
    form > * + * {
        margin-top: 1rem;
    }
    textarea {
        width: 100%;
        min-height: 200px;
        font-family: inherit;
        font-size: 1rem;
        line-height: 1.5;
        resize: none;
        border: 2px solid hsl(220, 80%, 85%);
        padding: 0.5rem;
    }
    button {
        align-self: flex-start;
        padding: 0.5rem 1rem;
        background: hsl(211, 92%, 58%);
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
        color: hsl(0, 0%, 100%);
    }
</style>

<form on:submit|preventDefault="{handleSubmit}">
    <textarea bind:value></textarea>
    <button>
        Count
    </button>
</form>
