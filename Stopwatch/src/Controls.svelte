<script>
    // dispatch start/stop/pause/lap events following a click on the button
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let isSubscribed = false;
    export let isLapsed = false;

    function start() {
        dispatch("start");
    }
    function stop() {
        dispatch("stop");
    }
    function pause() {
        dispatch("pause");
    }
    function lap() {
        dispatch("lap");
    }
</script>
<style>
    /* display the button(s) in a row */
    div {
        display: flex;
        border: 1px solid hsl(0, 0%, 25%);
        border-radius: 20px;
    }
    div button {
        font-size: 0.9rem;
        color: hsl(0, 0%, 10%);
        font-family: inherit;
        padding: 0.5rem;
        flex-grow: 1;
        width: 0;
        border: none;
        background: none;
        margin: 0; /* by default svelte applies a margin to the bottom of the button */
    }
    /* include a border on all button but the first, to avoid a border when only one element exist */
    div button:not(:first-of-type) {
        border-left: 1px solid hsl(0, 0%, 25%);
    }
</style>
<div class="controls">
    {#if isSubscribed}
    <button on:click="{start}">Start</button>
    {:else}
    <button on:click="{pause}">Pause</button>
    <button on:click="{stop}">Reset</button>
    {/if}
</div>
