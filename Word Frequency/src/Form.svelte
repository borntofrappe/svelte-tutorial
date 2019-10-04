<script>
    /* form component
	- create the array of words & frequency from the input element
	- dispatch an _update_ event passing the array as argument
	*/
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // value bound to the input element
    let value;
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

<form on:submit|preventDefault="{handleSubmit}">
    <input type="text" bind:value />
    <button>
        Count
    </button>
</form>
