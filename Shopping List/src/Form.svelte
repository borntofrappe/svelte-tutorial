<script>
    // import the items as described in the store
    import { items } from "./stores.js";

    // variables bound to the input elements
    let name;
    let value;

    // following the submit event, proceed to update the store by adding the item or updating its value (if existing)
    function handleSubmit() {
        // findIndex returns -1 if a match is not found
        const index = $items.findIndex(item => item.name === name);
        if (index === -1) {
            items.create(name, value);
        } else {
            items.update(name, value);
        }
        this.reset();
    }
</script>

<!-- display a form with 2 fields
    - input[type="text"], describing the name
    - input[type="number"], describing the value (price, cost, currently undecided)

-->
<form on:submit|preventDefault="{handleSubmit}">
    <!-- for the input of type text include a series of options through a datalist item
    use also the existing items in the placeholder
    -->
    <input required type="text" bind:value="{name}" placeholder="{$items[0] ? $items[0].name : 'Something tasty'}" list="items" />
    <datalist id="items">
        {#each $items as item (item.name)}
        <option value="{item.name}"></option>
        {/each}
    </datalist>
    <input required type="number" bind:value placeholder="0" min="0" />

    <button>
        Add
    </button>
</form>
