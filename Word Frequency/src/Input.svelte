<script>
    /* input component
	- create the array of words & frequency from the textarea element
	- dispatch an _update_ event passing the array as argument
    - include filler text on load and when pressing the load sample button
	*/
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    const dispatch = createEventDispatcher();

    // value bound to the textarea
    let value;
    // array describing the words & frequency
    let data = [];
    0;
    // regular expression identifying words
    const regexWord = /\w+/g;

    /* the idea is to use the regex on the value picked up from the textarea element
	this returns an array of strings which is in turn reduced to an array of objects
	objects describing the word and its frequency
	*/

    function wordsByFrequency(text) {
        return (
            text // array of words
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
                .sort((a, b) => b.frequency - a.frequency)
        );
    }
    function count() {
        data = value ? wordsByFrequency(value) : [];
        dispatch("update", data);
    }

    function parseDOM(text) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const descriptions = xml.querySelectorAll("item description");
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        return description.textContent.match(/<p>([^<]+)<\/p>/)[1];
    }
    function load() {
        // https://podcast.freecodecamp.org/
        fetch("https://podcast.freecodecamp.org/rss")
            .then(response => response.text().then(text => parseDOM(text)))
            .then(text => (value = text));
    }
</script>

<style>
    /* first component
    separate the direct children vertically */
    main > * + * {
        margin-top: 1rem;
    }
    /* have the textarea expand to cover the width of the container, and a fixed height */
    main textarea {
        display: block;
        width: 100%;
        height: 200px;
        font-family: inherit;
        resize: none;
        font-size: 1rem;
        padding: 0.5rem;
        line-height: 1.5;
        /* style the outline with a color matching the palette */
        border: 2px solid hsl(210, 90%, 85%);
        outline-color: hsl(210, 90%, 60%);
    }
    /* display the .controls button in a row */
    main .controls {
        display: flex;
        align-items: center;
    }
    /* separate the buttons horizontally */
    main .controls > * + * {
        margin-left: 0.75rem;
    }
    /* style the buttons to have opposing color and background values */
    main .controls button {
        padding: 0.25rem 1rem;
        color: hsl(0, 0%, 100%);
        background: hsl(210, 90%, 55%);
        border: 2px solid hsl(210, 90%, 55%);
        border-radius: 4px;
        font-size: 1rem;
        font-family: inherit;
        outline-color: hsl(210, 90%, 60%);
    }
    main .controls button:last-of-type {
        color: hsl(210, 90%, 55%);
        background: hsl(0, 0%, 100%);
    }
</style>

<main class="input">
    <svg class="icon" viewBox="0 0 100 60" width="75" height="45">
        <use href="#keyboard"></use>
    </svg>
    <textarea bind:value></textarea>
    <div class="controls">
        <button on:click="{count}">
            Count words
        </button>
        <button on:click="{load}">
            Load sample
        </button>
    </div>
</main>
