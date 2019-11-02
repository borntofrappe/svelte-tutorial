<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let markdown;
    let value = markdown;

    function handlePreview() {
        dispatch("preview", value);
    }
</script>
<style>
    textarea {
        padding: 1rem 1.5rem;
        line-height: 1.75;
        width: 100%;
        min-height: 100vh;
        font-family: "Overpass", sans-serif;
        font-size: 1rem;
        resize: none;
    }
    textarea:focus {
        outline: 2px solid hsl(100, 90%, 35%);
    }
</style>


<nav>
    <!-- TODO: functionality behind the first three buttons -->
    <button title="Add code block" aria-label="Add code block">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path id="bracket--left" d="M 30 18 l -30 27 30 27" />
                <use href="#bracket--left" transform="translate(90 0) scale(-1 1)" />
            </g>
        </svg>
    </button>
    <button title="Add link" aria-label="Add link">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path id="curve--left" d="M 35 25 h -10 a 20 20 0 0 0 0 40 h 10" />
                <use href="#curve--left" transform="translate(90 0) scale(-1 1)" />
                <path d="M 30 45 h 30" />
            </g>
        </svg>
    </button>
    <button title="Download markdown" aria-label="Download markdown">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
                <path d="M 45 0 v 60 l -22 -22 m 22 22 l 22 -22" />
                <path d="M 0 60 v 20 a 10 10 0 0 0 10 10 h 70 a 10 10 0 0 0 10 -10 v -20" />
            </g>
        </svg>
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

<textarea bind:value></textarea>
