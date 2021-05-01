# [Await](https://svelte.dev/repl/9435f7a61ec94c1795d21db886baa680?version=3.38.1)

## Notes

This project was developed with Svelte's own [REPL](https://svelte.dev/repl). The goal is to illustrate the syntax for an `await` block by evaluating the three states of a promise in the context of drawing a map of the world.

### World

For the world, the data is made available in topojson format from the `world-atlas` module. The `topojson` library is necessary to convert the data into geojson syntax and `d3-geo` is finally able to project the geojson format to draw the world, graticule and countries.

### await then catch

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

### transition

While beyond the scope of this demo, I decided to expand the concept by including a transition between the possible states. In this light, the text for the `await` block fades out while the SVG elements for the world (or the error message) fade in. You can see this attempt [in this demo](https://svelte.dev/repl/9435f7a61ec94c1795d21db886baa680?version=3.38.1) again built in Svelte's own REPL.
