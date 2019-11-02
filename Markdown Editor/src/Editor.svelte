<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let markdown;
    let value = markdown;

    function handleInput() {
        dispatch("update", value);
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
<textarea bind:value on:input="{handleInput}"></textarea>
