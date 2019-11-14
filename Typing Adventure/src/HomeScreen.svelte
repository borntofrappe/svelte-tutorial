<script>
    import { createEventDispatcher } from 'svelte';
    import Splitting from './Splitting.svelte';

    const dispatch = createEventDispatcher();
</script>

<style>
    section h1 {
        font-family: 'Catamaran', sans-serif;
        font-size: 3.5rem;
        letter-spacing: 0.01rem;
    }

    section button {
        font-family: inherit;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: hsl(0, 0%, 20%);
    }

    section button:focus {
        outline: 2px solid hsl(0, 0%, 20%);
    }
</style>


<section>
    <h1 aria-label="Typing Adventure">
        <Splitting string="Typing Adventure" />
    </h1>
    <button aria-label="Play" on:click={()=> {dispatch('play')}}>
        <Splitting string="Play" btn={true} delay={0.65} />
    </button>
</section>