<script>
    // import the items as described in the store
    import { items } from "./stores.js";
</script>

<style>
    /* display the items as squares in a grid */
    main {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, 150px);
        grid-auto-rows: 150px;
        grid-gap: 2rem;
    }
    /* display the text elements in a column */
    article {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: hsla(240, 25%, 50%, 0.1);
        border: 5px solid currentColor;
        border-radius: 25px;
        position: relative;
    }
    article h2 {
        font-weight: 400;
        font-size: 1.25rem;
    }
    article p {
        font-size: 2.25rem;
        font-weight: 700;
    }
    /* absolute position the button in the top right corner */
    article button {
        position: absolute;
        top: 0%;
        right: 0%;
        transform: translate(50%, -50%);
        background: none;
        border: none;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        color: inherit;
        background: currentColor;
        /* use the same hue as the background to fake a clip on the border underneath */
        box-shadow: 0 0 0 0.5rem hsl(240, 25%, 20%);
    }
    article button svg {
        display: block;
        width: 100%;
        height: 100%;
        color: hsl(240, 25%, 20%);
    }
</style>

{#if $items.length > 0}
<!-- introduce the section with a heading and describe the items in a main element -->
<section>
    <h2>
        <span class="icon">
            <svg viewBox="0 0 100 100" width="40" height="40">
                <use href="#list"></use>
            </svg>
        </span>
        List items
    </h2>

    <!-- display the articles in a grid, specifying the name and numerical values in a column -->
    <main>
        {#each $items as item (item.name)}
        <article style="border-color: {item.color}">
            <h2>{item.name}</h2>
            <p>{item.value}</p>
            <!-- following a click on the button update the store with the delete operation -->
            <button on:click="{() => items.delete(item.name)}" aria-label="Delete">
                <svg viewBox="0 0 100 100" width="30" height="30">
                    <use href="#delete"></use>
                </svg>
            </button>
        </article>
        {/each}
    </main>
</section>
{/if}
