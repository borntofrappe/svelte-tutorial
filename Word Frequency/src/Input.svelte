<script>
    // dispatcher to have the data traverse back to the parent component
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // value bound to the textarea
    let value;
    // regular expression identifying words
    const regexWord = /\w+/g;
    // regular expression the text in between p tags
    const regexParagraph = /<p>([^<]+)<\/p>/;

    /* the idea is to use the regex on text
    this allows to retrieve an array of strings, which is in turn reduced to an array of objects
    objects describing the words and absolute frequencies
    */
    function wordsByFrequency(text) {
        return (
            text
                // array of words
                .match(regexWord)
                // array of _lowercase_ words
                .map(word => word.toLowerCase())
                // array describing for each word 1 objects with the word's own value and its frequency
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

    // function following a click on the _count words_ button
    function count() {
        // ! if no text is present include the default text in the textarea element
        if (!value) {
            value = `Empty textarea\n${defaultText()}`;
        } else {
            // use the defined function to compute the array of objects from the value
            const update = wordsByFrequency(value);
            dispatch("update", update);
        }
    }

    /* function returning a default text
    used if the promise fails or if the parsing function fails to retrieve a valid / new paragraph
    */
    function defaultText() {
        return "If you press the count button, you should see the absolute frequency of these words in a table and pie chart. If you press the load button instead, you should see the first paragraph from an episode of the freeCodeCamp podcast. Or this message. Consider it a default. This message.";
    }

    // function parsing the information retrieved from the rss feed to consider the first paragraph of an episode picked at random
    function parseDOM(text) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const descriptions = xml.querySelectorAll("item description");
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        const description = descriptions[randomIndex];
        const { textContent } = description;
        const paragraph = textContent.match(regexParagraph)[1].trim();

        // return the paragraph only if it represents a truthy value (some episodes don't have one) and if the same text is not already showed in the textarea
        return paragraph && paragraph !== value ? paragraph : defaultText();
    }

    // function following a press on the _load sample_ button
    function load() {
        // fetch the information from the rss feed of the freecodecamp podcast
        // https://podcast.freecodecamp.org/
        value = "Loading sample text...\nWait for it :)";
        fetch("https://podcast.freecodecamp.org/rss")
            .then(response =>
                response
                    .text()
                    // parse the text to retrieve the text of the first paragraph for an episode at random
                    .then(text => parseDOM(text))
            )
            // update the value with the returned text
            .then(text => (value = text))
            // if the promise fail show the error and the default text
            .catch(err => (value = `${err}\n${defaultText()}`));
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
    <!-- bind the value of the textarea to the variable bearing the same name -->
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
