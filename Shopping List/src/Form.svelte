<script>
    // import the items as described in the store
    import { items } from "./stores.js";

    // variables bound to the input elements
    let name;
    let value;
    function handleSubmit() {
        // update the data in the store
        if (name && value) {
            // if the item isn't already listed, add the name and value to the end of the array
            const index = $items.findIndex(item => item.name === name);
            if (index === -1) {
                items.create(name, value);
            } else {
                // else update the value
                items.update(name, value);
            }
        }
        this.reset();
    }
</script>

<!-- form with 2 fields
    - input of type text, describing the name of the item
    - input of type number, describing the value for the item

-->

<form on:submit|preventDefault="{handleSubmit}">
    <!-- for the input of type text include a series of options through a datalist item -->
    <input required type="text" bind:value="{name}" placeholder="{$items[0] ? $items[0].name : 'Something tasty'}" list="items" />
    <!-- in the list describe the elements already existing in the store -->
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
