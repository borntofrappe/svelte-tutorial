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
        background: hsl(0, 0%, 100%);
        border: 2px solid hsl(0, 0%, 90%);
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
        color: hsl(0, 0%, 20%);
        box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
    }

    section button:focus {
        outline: 2px solid hsl(0, 0%, 20%);
        box-shadow: initial;
    }

    /* styles included once splitting js has had a change to split the actual text */
    section.splitting .char {
        display: inline-block;
        animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        animation-delay: calc(var(--char-index) * 50ms + 150ms);
    }

    section.splitting button {
        background: none;
        border: none;
        padding: initial;
        box-shadow: initial;
    }

    section.splitting button .char {
        background: hsl(0, 0%, 100%);
        border: 2px solid hsl(0, 0%, 90%);
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
        color: hsl(0, 0%, 20%);
        box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
        animation-delay: calc(var(--char-index) * 50ms + 650ms);
        position: relative;
    }

    section.splitting button .char+.char {
        border-left: none;
    }

    section.splitting button .char:after {
        content: attr(data-key);
        position: absolute;
        top: 0;
        right: 0;
        font-size: 0.75rem;
        margin: 0.1rem;
    }

    section.splitting button .char:hover {
        background: hsl(0, 0%, 95%);
        box-shadow: initial;
    }

    section.splitting button:focus .char {
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
    <h1>Typing<br /> Adventure</h1>
    <button on:click={()=> {dispatch('play')}}>Play</button>
</section>