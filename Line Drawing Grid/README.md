# [Line Drawing Grid](https://svelte.dev/repl/cec6ed73541f43699ef0a154019ecac5)

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

## Points

On the basis of the edges, the script needs to create the points of the line. The article cited at the beginning of this project introduces an algorithm, and then follows a technique using linear interpolation, but I found a much simpler approach in considering the greatest distance between columns and rows.

The goal is to ultimately create a multi-dimensional array, populated with the `column` and `row` of the individual dots. Once created, this collection allows to include the dots with an `each` block, similar to the edges. The difference is that the coordinates are accessed through indexes instead of `column` and `row` properties (a preference).

```svelte
{#each points as point}
<g transform="translate({point[0] * cellSize} {point[1] * cellSize})">
</g>
{/each}
```

The array itself is populated in the `<script>` tags with a reactive declaration.

```svelte
$: points = getPoints(edges)
```

This feature provided by the Svelte compiler allows to have the `points` array updated every time the `edges` array is modified.

`getPoints` receives the array of edges, and returns an array as follows:

- compute difference between the column and row of the two edges. The order doesn't matter at first, but influences which edge to later use when calculating the column and row of the points (in this instance the second).

  ```js
  const dc = edges[0].column - edges[1].column;
  const dr = edges[0].row - edges[1].row;
  ```

- compute the diagonal distance, as the greatest value between the two differences in absolute terms

  ```js
  const d = Math.max(Math.abs(dc), Math.abs(dr));
  ```

- it is not necessary to populate the array if the distance is less than or equal to `1`. In this instance the edges are either overlapping, or close enough not to need a connecting point, and the function returns an empty array

  ```js
  if (d > 1) {
    // create array of points
  }
  return [];
  ```

- if the distance is greater than `1`, populate the array with `d - 1` points. Consider, for instance, how a distance of `3` columns requires two connecting point.

  ```js
  Array(d - 1)
    .fill()
    // create arrays of points
    .map(() => []);
  ```

  For the column and row, consider the position of the second index (this considering the choice made earlier when computing the distance between columns and rows)

  ```js
  const c = edges[1].column;
  const r = edges[1].row;
  ```

  The column and row of this edge are incremented by an integer considering the number of points, and the distance between column and row.

  ```js
  Array(d - 1)
    .fill()
    .map((p, i) => [
      c + Math.floor((i + 1) * (dc / d)),
      r + Math.floor((i + 1) * (dr / d)),
    ]);
  ```

  Consider two edges separated by `4` columns and `3` rows. In this instance, you have three points (considering the greater value of `4`), positioned `1`, `2`, and `3` columns away from the chosen edge. In terms of rows, the points are located `0` (rounded down from `0.75`), `1` (`1.5`) and `2` (`2.25`) rows from the same advantage point.

  Since `dc` and `dr` are computed as the difference between the two edges, and not in absolute terms, the approach works regardless of order. If the distance is negative, the points are positioned to the left or to the top of the edge.

## Grid.svelte

The idea is to here create a component with the instructions necessary to create and manage a grid.

```svelte
<script>
  import Grid from './Grid.svelte';
</script>

<Grid />
```

The component is initialized with a given number of rows and columns, and proceeds to create the grid with a hard-coded cell size.

```svelte
<script>
export let columns = 28;
export let rows = 10;
const cellSize = 20;

</script>
```

Having a fixed size doesn't influence the appearance of the grid, but this is because the `<svg>` element is ultimately scaled to fill the width of its parent container. Without this stylistic choice, grid of different rows and columns would have a different width and height.

A dedicated component requires a couple of modifications to the code. First, the styling applied to the nested SVG requires the use of the `:global()` selector.

```css
:global(main svg) {
  display: block;
  width: 100%;
  height: auto;
}
```

This is because CSS styling in Svelte is component-based, and the element is included through the `<Grid>` component. The following instruction:

```css
main svg {
  display: block;
  width: 100%;
  height: auto;
}
```

Would attribute the styling to the selector `main.svelte-wehiu svg.svelte-osfdi`, where `svelte-wehiu` and `svelte-osfdi` are two random sequences of characters to create a unique class.

Second, the `<pattern>` element used to render the grid lines needs a unique identifier. Such an `id` is initialized in the `<script>` tags with `Math.random()`.

```js
const id = Math.random();
```

The value is then injected in the DOM in the `id` attribute of the `<pattern>` element, and the `fill` attribute of the rectangle using such a pattern.

```svelte
<pattern
  id="pattern-grid-{id}">
</pattern>

<rect
  {width}
  {height}
  fill="url(#pattern-grid-{id})" />
```

Without this precaution, the first pattern would be used by every grid. It is worth mentioning that this has to do with SVG syntax, and not Svelte.
