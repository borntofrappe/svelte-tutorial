<script>
  // import the items as described in the store
  import { items } from './stores.js';

  // variables bound to the input elements
  let name;
  let value;

  // following the submit event, proceed to update the store by adding the item or updating its value (if existing)
  function handleSubmit() {
    // findIndex returns -1 if a match is not found
    const index = $items.findIndex((item) => item.name === name);
    if (index === -1) {
      items.create(name, value);
    } else {
      items.update(name, value);
    }
    this.reset();
  }
</script>

<!-- form component
  introduce the component with a heading
  describe the form with input elements of type text and number
-->
<section>
  <h2>
    <!-- the icon is provided by the svg component -->
    <span>
      <svg viewBox="0 0 100 100" width="40" height="40">
        <use href="#add" />
      </svg>
    </span>
    Add Items
  </h2>
  <!-- display a form with 2 fields
      - input[type="text"], describing the name
      - input[type="number"], describing the value (price, cost, currently undecided)

  -->
  <form on:submit|preventDefault={handleSubmit}>
    <!-- wrap each input in a label -->
    <label>
      <span>Key</span>
      <input
        required
        type="text"
        bind:value={name}
        placeholder={$items[0] ? $items[0].name : 'Something tasty'}
        list="items"
      />
      <!-- specify a series of options to be listed in the input of type text -->
      <datalist id="items">
        {#each $items as item (item.name)}
          <option value={item.name} />
        {/each}
      </datalist>
    </label>
    <label>
      <span>Value</span>
      <input required type="number" bind:value placeholder="0" min="0" />
    </label>

    <!-- describe the action of the icon button through aria attributes -->
    <button aria-label="Create entry" aria-describedby="description">
      <span id="description" hidden
        >Add the key value pair to the list of items</span
      >
      <svg viewBox="0 0 100 100" width="40" height="40">
        <use href="#create" />
      </svg>
    </button>
  </form>
</section>

<style>
  /* display the input in a wrapping row
      flip the hue for the color and background
  */
  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: hsl(240, 25%, 20%);
    background: hsla(240, 25%, 95%, 1);
    padding: 0.75rem 1rem;
    border-radius: 5px;
  }
  /* display the text for the label and the input element in a column */
  form label {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    line-height: 2;
  }
  /* remove the default background and border in favor of a border-òeft */
  form label input {
    font-size: 1.1rem;
    color: inherit;
    font-family: inherit;
    background: none;
    border: none;
    padding: 0.5rem 0.75rem;
    border-left: 0.25rem solid currentColor;
  }
  /* remove the default background and border from the button */
  form button {
    align-self: flex-end;
    background: none;
    border: none;
    color: inherit;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.25rem;
    margin: 0.25rem 0;
  }
  form button svg {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
