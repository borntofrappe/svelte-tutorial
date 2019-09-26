<script>
    // following a click event dispatch the shuffle event to the parent component
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<style>
    button {
        background: #fff;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 0.75rem;
        font-family: inherit;
        text-transform: uppercase;
        font-size: 0.9rem;
        box-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.1);
        transition: all 0.1s ease-in-out;
    }
    button:hover,
    button:focus{
        transform: translateY(1px);
        box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.1);
    }
    button:active {
        transform: translateY(1.5px);
        box-shadow: 0 0px 0px hsla(0, 0%, 0%, 0.1);
    }
</style>

<button on:click={() => dispatch('shuffle')}>
    Shuffle team order
</button>