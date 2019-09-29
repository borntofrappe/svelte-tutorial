<script>
    import { items } from "./stores.js";
</script>

<main>
    {#each $items as item (item.name)}
    <article>
        <h2>{item.name}</h2>
        <h3>{item.value}</h3>
        <button on:click="{() => items.delete(item.name)}">Remove</button>
    </article>
    {/each}
</main>
