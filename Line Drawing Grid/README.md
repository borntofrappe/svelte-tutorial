# Line Drawing Grid

This project is inspired by a specific article from [Red Blob Games](https://www.redblobgames.com), discussing [how to draw a line with a series of connecting points](https://www.redblobgames.com/grids/line-drawing.html#orthogonal-steps). The post details different methods to achieve the pixelated design, but for this specific demo, it does so with a series of interactive SVG elements. The goal is to here recreate such a feature. It is likely that the focus is as much on SVG syntax as it is on Svelte, but the benefits of the compiler should be apparent in the moment you manage event listeners.

## Grid

The first step is to draw the SVG elements with a solid background and a grid. In the post cited above, the grid is populated with a series of `<rect />` elements, but the same effect can be achieved with a `<pattern>`, drawing one rectangle and repeating the same in the fill of a single rectangle.

The solution is imperfect, since the visual is cropped around the edges, but for the project at hand, what matters is inside the grid.

In terms of Svelte, the `<svg>` element already benefits from the way the compiler includes variables in the DOM tree. The size of the element, and the size of the individual cell, are included from the script and directly modify the appearance of the vector graphic.

```html
<script>
  const width = 600;
  const height = 200;
  const cellSize = 20;
</script>
```

## Edges

It is possible to draw the edges of the line with an array describing the column and row of two dots.

```js
const edges = [
  { column: 0, row: 0 },
  { column: 5, row: 3 },
];
```

In the script, the actual column and row are computed at random, with a `do...while` loop to make sure that the edges do not overlap. Regardless, the column and row are then used in the `transform` attribute of the `<g>` group element positioning the individual dots.

```svelte
<g transform="translate({edge.column * cellSize} {edge.row * cellSize})"></g>
```

Svelte provides an `each` block to conveniently loop through the array.

The `each` block provided by Svelte compiler.

```svelte
{#each edges as edge}
  <g>
    <!-- draw edge -->
  </g>
{/each}
```

## Update edges

To update the position of the dots in the grid I decided to listen for the `mousedown` event on the individual edges. In this instance, a variable describing the index of the selected edge is updated.

```svelte
<g on:mousedown={() => (selectedEdge = i)}>
```

The index is provided as the second argument in the `each` block.

```svelte
{#each edges as edge, i}
{/each}
```

The variable is set when the `mousedown` event is registered on the edges, but it is then reset to `null` when the `mouseup` event is registered on the entire `<svg>` element. This is because, ultimately, I want to update the edges considering the `mousemove` event, again on the wrapping `<svg>`.

```svelte
<svg
  on:mouseup={() => (selectedEdge = null)}
  on:mousemove={handleMouseMove}
</svg>
```

I prefer this setup to having the listeners in the `<g>` group elements describing the edges, as it allows to modify one edge at a time (the one set on `mousedown`).

`handleMouseMove` is finally where the position of the edges is updated. `selectedEdge` already describes which edge to modify, so that all that is necessary is the value of the column and row matching the mouse coordinates.

It is here necessary to know the mouse coordinates, but also the position of the SVG element and the size of the individual cell. The size of the SVG element changes according to the viewport, padding, so that it is not possible to rely on the `width` and `height` and `cellSize` used to draw the grid.

`getBoundingClientRect` provides the desired values for the position and size of the wrapping SVG.

```js
const { x, y, width } = svg.getBoundingClientRect();
```

The method is applied on the HTML element, which in Svelte, is referenced through a variable and the `this` binding.

```svelte
<script>
  let svg;
</script>

<svg bind:this={svg}>
</svg>
```

On the basis of the `width` (or height), the size of the cell is computed knowing the number of columns (or rows).

```js
const cellSize = Math.floor(width / columns);
```

The column and row are then found comparing the mouse coordinates against said size.

```js
const column = Math.floor((e.clientX - x) / cellSize);
```

_Please note:_ I can't understand why, but it is possible for the column to exceed the acceptable range of `[0, columns - 1]`. I use `Math.min` and `Math.max` to avoid this undesirable situation.
