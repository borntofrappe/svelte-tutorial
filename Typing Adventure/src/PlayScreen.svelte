<script>
    const keys = 'qwertyuiopasdfghjklzxcvbnm';

</script>

<style>
    section h2 {
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

    section button:hover {
        background: hsl(0, 0%, 95%);
        box-shadow: initial;

    }

    section button:focus {
        outline: none;
        border: 2px solid hsl(0, 0%, 20%);
        box-shadow: initial;
    }

    section .keyboard {
        max-width: 650px;
    }

    /* styles included once splitting js has had a change to split the actual text */
    h2.splitting .char {
        display: inline-block;
        animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        animation-delay: calc(var(--char-index) * 0.05s + 0.15s);
    }

    .keyboard {
        animation: popIn 0.4s 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
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
    <h2>Articuno</h2>
    <div class="keyboard">
        {#each keys as key}
            <button>{key}</button>
        {/each}
    </div>
</section>