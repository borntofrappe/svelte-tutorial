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

## Points

The approach will be refined as the grid ultimately draws the line, but immediately, it is possible to draw points with an array describing the column and row of each dot.

```js
const points = [
  [2, 7],
  [12, 3],
];
```

The values are then mapped to the `x` and `y` position of the shape through the `transform` attribute of a `<g>` group element.

```svelte
<g transform="translate({point[0] * cellSize} {point[1] * cellSize})"></g>
```

To note, the `each` block provided by the compiler.

```svelte
{#each points as point}
  <!-- draw point -->
{/each}
```
