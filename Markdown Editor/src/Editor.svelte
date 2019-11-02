<script>
    import { createEventDispatcher, onDestroy } from "svelte";
    const dispatch = createEventDispatcher();
    import { toLocalStorage } from "./utils.js";

    // transition to fade in the icon to show the file has been saved
    import { fly } from "svelte/transition";

    // initialize a variable from the markdown file
    export let markdown;
    let value = markdown;

    // variable bound to the text area, in order to scroll at the bottom when appending elements
    let textarea;

    // function adding the input string in the textarea element, and at the point specified by the cursor
    function updateValue(string) {
        const { selectionEnd } = textarea;
        value = `${value.slice(0, selectionEnd)}${string}${value.slice(selectionEnd)}`;
    }

    // following a click on the code button, append a series of backtick
    function handleCode() {
        const block = `\n\`\`\`\n\n\`\`\`\n`;
        updateValue(block);
    }

    // following a click on the link button, append the syntax for url []()
    function handleLink() {
        const link = "[link](url)";
        updateValue(link);
    }

    // following a click on the save button toggle a boolean to change the icon and call the function to save to local storage
    let isSaved = false;
    function handleSave() {
        isSaved = true;
        toLocalStorage(value);
    }

    // following the input event on the textarea remove the saved icon to show the default action
    function handleInput(e) {
        if (isSaved) {
            isSaved = false;
        }
    }

    // following a click on the preview button, dispatch the event to show the preview
    function handlePreview() {
        // pass the value to the component to update the markdown
        dispatch("preview", value);
    }
</script>

<nav>
    <button on:click="{handleCode}" title="Add code block" aria-label="Add code block">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path id="bracket--left" d="M 30 18 l -30 27 30 27" />
                <use href="#bracket--left" transform="translate(90 0) scale(-1 1)" />
            </g>
        </svg>
    </button>
    <button on:click="{handleLink}" title="Add link" aria-label="Add link">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path id="curve--left" d="M 35 25 h -10 a 20 20 0 0 0 0 40 h 10" />
                <use href="#curve--left" transform="translate(90 0) scale(-1 1)" />
                <path d="M 30 45 h 30" />
            </g>
        </svg>
    </button>

    <button on:click="{handleSave}" title="Save to local storage" aria-label="Save to local storage">
        {#if isSaved}
        <svg in:fly="{{ duration: 300, delay: 150 }}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path transform="translate(30 75) rotate(-45)" d="M 0 0 v -42.5" />
                <path transform="translate(30 75) rotate(45)" d="M 0 0 v -85" />
            </g>
        </svg>
        {:else}
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path d="M 10 0 h 52 l 28 25 v 55 a 10 10 0 0 1 -10 10 h -70 a 10 10 0 0 1 -10 -10 v -70 a 10 10 0 0 1 10 -10" />
                <path d="M 20 0 v 25 h 40" />
                <path d="M 20 90 v -40 h 50 v 40" />
            </g>
        </svg>
        {/if}
    </button>

    <!-- on click dispatch the preview event to show the appropriate component -->
    <button on:click="{handlePreview}" title="Preview markdown" aria-label="Download markdown">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
                <mask id="mask--circle" maskUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="24" fill="black" />
                </mask>
            </defs>
            <g mask="url(#mask--circle)">
                <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="currentColor">
                    <path d="M 0 45 c 25 -40 65 -40 90 0 -25 40 -65 40 -90 0" />
                </g>
            </g>
            <g transform="translate(50 50)">
                <circle cx="0" cy="0" r="14" fill="currentColor" />
            </g>
        </svg>
    </button>
</nav>

<textarea bind:this="{textarea}" bind:value on:input="{handleInput}"></textarea>
