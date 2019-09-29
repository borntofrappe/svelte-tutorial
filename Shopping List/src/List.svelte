<script>
    // import the items as described in the store
    import { items } from "./stores.js";
</script>

<!-- include each item in an article
! the name is meant to be unique, so it should be safe to use as a key for the looped element
-->
<main>
    {#each $items as item (item.name)}
    <article>
        <h2>{item.name}</h2>
        <h3>{item.value}</h3>
        <!-- following a click on the button update the store with the delete operation -->
        <button on:click="{() => items.delete(item.name)}">Remove</button>
    </article>
    {/each}
</main>
