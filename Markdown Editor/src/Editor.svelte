<script>
    import { createEventDispatcher, onDestroy } from "svelte";
    const dispatch = createEventDispatcher();
    import { toLocalStorage } from "./utils.js";
    import { fly } from "svelte/transition";

    export let markdown;
    let textarea;
    let value = markdown;
    function handlePreview() {
        dispatch("preview", value);
    }

    function handleCode() {
        value += `\n\`\`\`\n\n\`\`\``;
        textarea.scrollTop = textarea.scrollHeight;
    }

    function handleLink() {
        value += `[link](url)`;
        textarea.scrollTop = textarea.scrollHeight;
    }

    function handleDownload() {
        console.log("download");
    }

    let isSaved = false;
    function handleSave() {
        isSaved = true;
        toLocalStorage(value);
    }
    function handleInput(e) {
        if (isSaved) {
            isSaved = false;
        }
    }
</script>
<style></style>

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
    <button on:click="{handleDownload}" title="Download markdown" aria-label="Download markdown">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path d="M 45 0 v 60 l -22 -22 m 22 22 l 22 -22" />
                <path d="M 0 60 v 20 a 10 10 0 0 0 10 10 h 70 a 10 10 0 0 0 10 -10 v -20" />
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
