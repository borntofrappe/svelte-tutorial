<script>
    // dispatch a selection event when clicking on one of the buttons
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function select(selection) {
        dispatch("selection", selection);
    }

    // include one button for each option
    export let options = ["Star"];
</script>

<style>
    /* display the buttons in a column */
    section {
        display: flex;
        flex-direction: column;
    }
    section > * + * {
        margin-top: 1rem;
    }
</style>

<section>
    {#each options as option, index}
    <button on:click="{() => select(option)}">{option}</button>
    {/each}
</section>
