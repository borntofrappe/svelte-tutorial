# [Premier League Season](https://svelte.dev/repl/2bd49c76c94e4b7d823d3df8afd8eefd?version=3.38.2)

Wikipedia highlights the 2020 to 2021 season of the [Premier League](https://en.wikipedia.org/wiki/2020%E2%80%9321_Premier_League#League_table) with a table dense of information. The goal of this project is to repurpose the data with different visualizations.

_Please note:_ I developed smaller demos with Svelte's own REPL to focus on the d3-specific logic.

## [D3 Hexbin](https://svelte.dev/repl/0ba61470ff4a460992f13d1c559133c7?version=3.38.2)

The `d3-hexbin` module is helpful to bin observations in two dimensions. The result is similar to a scatter plot, but the intent is to reduce the number of data points being drawn to analyse the overall distribution. In the demo `data` is built to be an array of `n` items with a random `x` and `y` value. The measures is picked up by `d3.hexbin` in the `x` and `y` function respectively.

```js
const hexbinGenerator = d3
  .hexbin()
  .x((d) => xScale(d.x))
  .y((d) => yScale(d.y));
```

The bins are rendered with an hexagon.

```svelte
<path d="{hexbinGenerator.hexagon()}" />
```

The number of items behind each bin is then conveyed in two ways:

- through color

  ```svelte
  <path fill="{colorScale(length)}" />
  ```

  The `length` describes the number of items in the array. `colorScale` is instructed to assign a color value using a sequential scale.

- through the size of the hexagon

  ```svelte
  <path d="{hexbinGenerator.radius(radiusScale(length)).hexagon()}" />
  ```

  The hexbin generator function sets up a radius which describes the maximum value to allocate to each bin.

  ```js
  const hexbinGenerator = hexbin()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .radius(20);
  ```

  The radius scale is then built with a range up to the threshold.

  ```js
  const radiusScale = scaleLinear().range([10, 20]);
  ```

Both the color and radius scale use the maximum number of items store in an individual bin.

```js
const maxLength = max(hexbinData, ({ length }) => length);
```

## [D3 Circular Packing](https://svelte.dev/repl/98115eb334d9485cae0cddfb91ac66d2?version=3.38.2)

The `pack` function, similarly to other generator functions in the `d3-hierarchy` module, relies on a root node with a specific structure. To this end, while `data` describes an array of objects with an arbitrary name and value, `root` is built as an object with a `children` field.

```js
const root = {
  children: data,
};
```

`d3.hierarchy` is then able to build the desired nodes tallying the value in the chosen field.

```js
const hierarchyData = hierarchy(root).sum(({ value }) => value);
```

`d3.pack` receives the hierarchy and adds the properties necessary to draw the nodes `x` and `y` for the coordinates, `r` for the radius.

```js
const packData = pack().size([width, height])(hierarchyData);
```

To draw the nodes, a hierarchy provides several helper functions, like `.nodes()` to consider each node. To skip the root node and consider only the objects in the `children` field, `hierarchy.leaves` provides the nodes without children themselves.

```svelte
{#each packData.leaves() as { x, y, r, data }}
{/each}
```

`data` describes the original data point, and allows to retrieve the value, or name if need be.

## Final Demo

The project starts with a table similar to the one proposed [on wikipedia](https://en.wikipedia.org/wiki/2020%E2%80%9321_Premier_League#League_table). The `<Table />` component provides a useful exercise with Svelte `each` and `if` blocks.

Past the table, `Points.svelte` considers the points scored by the different teams with a circular pack. Instead of rendering circles with a solid color, however, the `<circle />` elements benefit from a `fill` referencing a `<pattern />` element.

```html
<circle fill="url(#p)" />
```

The SVG syntax is beyond the scope of this project, but suffice it to say that the pattern actually describes a non-repeating pattern to draw a ball with a series of hexagons. The pattern is helpful to have the visual scale to the size of whichever element uses it.

Next to the visualization, a series of `<text>` element highlight a specific data point with additional information. By default the project highlights a team at random, but when hovering on a specific value, the metrics are updated to match the selection.

Finally, `Goals.svelte`, but most importantly `Footballbin.svelte` focus on the correlation between the goals scored, taken and other variables with a hexbin. Once again, and instead of rendering regular hexagons, the bins are highlighted with the pattern of the football. Moreover, the data points are surrounded by a frame hinting at a goal post and layered on a series of grid lines to evoke the goal post net. Exactly like the circular packing component, the visualization includes a series of `<text>` element with more details on the chosen bin.
