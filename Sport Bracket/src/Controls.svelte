<script>
    // following a click event dispatch the shuffle event to the parent component
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('shuffle')}>
    Shuffle team order
</button>