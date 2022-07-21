# Await

## Notes

The goal is to illustrate the syntax for an `await` block with a couple of demos.

### [World Data](https://svelte.dev/repl/9435f7a61ec94c1795d21db886baa680?version=3.38.1)

The example explores how the `await` block evaluates the three states of a promise in the context of drawing a map of the world.

The data is made available in topojson format from the `world-atlas` module. The `topojson` library is necessary to convert the data into geojson syntax and `d3-geo` is finally able to project the geojson format to draw the world, graticule and countries.

#### await then catch

As detailed in the tutorial, it is possible to consider the possible states of a promise with different blocks:

- an initiation `await` block for the pending state

  ```svelte
  {#await promise}

  {/await}
  ```

- a continuation block `:then` for when the promise resolves

  ```svelte
  {:then data}
  ```

- a continuation block `:catch` for when the promise is rejected instead

  ```svelte
  {:catch error}
  ```

The syntax is included in the `<svg>` element so that the demo draws different elements.

#### transition

While beyond the scope of this demo, I decided to expand the concept by including a transition between the possible states. In this light, the text for the `await` block fades out while the SVG elements for the world (or the error message) fade in. You can see this attempt [in this demo](https://svelte.dev/repl/9435f7a61ec94c1795d21db886baa680?version=3.38.1) again built in Svelte's own REPL.

### [Pokemon Search](https://svelte.dev/repl/8593b0e8b60e4a78900ff4ff584a03a2?version=3.38.2)

This example shows how to handle a promise that doesn't immediately return a value.

Data is retrieved from the [PokeAPI](https://pokeapi.co) to consider general information for a pokemon in the available dataset.

#### promise

It is not possible to include the data directly in the DOM, as the information is retrieved in JSON format.

```svelte
<script>
  const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
</script>

<!-- would NOT work -->
{#await promise then value} {/await}
```

To fix this, the promise refers to an async function which processes the data before returning the necessary JavaScript object.

```js
async function fetchData(n = 1) {
  try {
  } catch (error) {}
}
const promise = fetchData();
```

In the `try` block the information received through the API is processed through the `.json` function and returned.

```js
const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
const data = await res.json();
return data;
```

In the `catch` block the script throws an error.

```js
throw new Error(error);
```

The error can be later picked up in the `await` block provided by Svelte.

```svelte
{#await promise then value}

{:catch error}

{/await}
```
