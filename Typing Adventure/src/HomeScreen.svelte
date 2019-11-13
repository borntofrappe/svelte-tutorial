<script>
    import { createEventDispatcher } from 'svelte';
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
        box-shadow: initial;
    }

    section span {
        display: inline-block;
        animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }

    section button span {
        background: hsl(0, 0%, 100%);
        border: 2px solid hsl(0, 0%, 90%);
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
        color: hsl(0, 0%, 20%);
        box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
        animation-delay: calc(var(--char-index) * 50ms + 650ms);
        position: relative;
    }

    section button span+span {
        border-left: none;
    }

    section button span:after {
        content: attr(data-key);
        position: absolute;
        top: 0;
        right: 0;
        font-size: 0.75rem;
        margin: 0.1rem;
    }

    section button span:hover {
        background: hsl(0, 0%, 95%);
        box-shadow: initial;
    }

    section button:focus span {
        box-shadow: initial;
    }

    @keyframes popIn {
        0% {

            opacity: 0;
            transform: translateY(20px);
        }

        100% {
            opacity: initial;
            transform: initial;
        }
    }
</style>


<section>
    <h1 aria-label="Typing Adventure">
        {#each 'Typing Adventure' as character, i}
            {#if character !== ' '}
                <span aria-hidden="true" style="animation-delay: {i * 0.04 + 0.15}s;">{character}</span>
            {:else}
                <br/>
            {/if}
        {/each}
    </h1>
    <button
        aria-label="Play"
        on:click={()=> {dispatch('play')}}>
            {#each 'Play' as character, i}
                <span
                    aria-hidden="true"
                    data-key={character.charCodeAt(0)}
                    style="animation-delay: {i * 0.04 + 1}s;">
                        {character}
                    </span>
            {/each}
    </button>
</section>