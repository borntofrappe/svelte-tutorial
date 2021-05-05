# Colorful Building Bl.ocks

## Notes

To celebrate the 10th anniversary of [D3.js](https://d3js.org/), [the D3 community proposed](https://d3js.community/d3-parade-2021) to create a visualization with the data visualization library as the subject. With this project I intend to create a belated entry to such an initiative.

The goal is to consider the [Blockbuilder Search Data](https://observablehq.com/@enjalot/blockbuilder-search-data) and specifically the endpoint describing the colors used in the different blocks, `blocks-colors.json`.

_Please note:_ the plan I have for the visualization is complex enough to warrant a few smaller demos, which are developed in Svelte's own REPL. Here I document the efforts as I try to make the plan a reality.

### [viewBox transition](https://svelte.dev/repl/df0f8d719d8443a89c7fcca52920b7e3?version=3.38.2)

The visualization incorporates an `<svg>` element created with one of the projects created in this repository, `Pixelated SVG`. The visual describes the string _'Colorful building bl.ocks'_ with a series of rectangle elements, and the idea is to update the `viewBox` attribute to focus the attention on the dot separating the 'bl' and 'ocks' letters. Svelte comes in handy to transition the four values of the attribute, and the demo showcases how:

- `viewBoxes` describes two objects with the desired coordinates.

  ```js
  const viewBoxes = [
    {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
    {
      x: 20,
      y: 50,
      width: 10,
      height: 10,
    },
  ];
  ```

- `viewBox` is made into a _tweened_ value picking up the first object

  ```js
  import { tweened } from 'svelte/motion';
  let viewBox = tweened(viewBoxes[0]);
  ```

- as the checkbox is toggled, the value is set with either option

  ```js
  $: if (checked) {
    viewBox.set(viewBoxes[1]);
  } else {
    viewBox.set(viewBoxes[0]);
  }
  ```

  Svelte's own reactive declaration means the value is updated as `checked` itself is updated

- `tweened` creates a store, which means the actual object is finally included by prefixing a dollar sign `$`

  ```html
  <svg
    viewBox="{$viewBox.x} {$viewBox.y} {$viewBox.width} {$viewBox.height}"
  ></svg>
  ```

  Note that it is possible to incorporate the values as an array, which makes for a more concise solution

  ```html
  <svg viewBox="{Object.values($viewBox)}"></svg>
  ```

### [Colors Treemap](https://svelte.dev/repl/b2c64c05fbd641b191407c84e6b688fa?version=3)

Once the visualization is able to render a visual for each bl.ock, describing the most prominent color, the idea is to allow for exploration in the form of a tooltip. Following a click, the tooltip describes a few features of the individual project: the name, description, and also all the colors (not just the most used). `d3-hierarchy` is here helpful to build a treemap to illustrate the absolute frequency of the colors. A hard-coded object is used to illustrate the concept.

The most important step of the demo concerns how the data is structure. The colors are ultimately received with an object describing the color through keys, the frequency through the corresponding values. A hierarchy needs a structure with at least one root element

```js
{
		name: 'Colors',
		children: []
}
```

`children` then contains an array with the colors described with objects

```js
[
  {
    color: '#222222',
    value: 3,
  },
  {
    color: '#ffffff',
    value: 1,
  },
];
```

This structure is enough to have a hierarchy for the treemap layout. Take notice that the `treemap` function specifies a padding to better distinguish the individual tiles; the tiles are separated to see a `<rect/>` underneath, which is especially useful when a color matches the background.

### [canvas Squares](https://svelte.dev/repl/41e881707219450ab6d5d17ad05b1ec8?version=3.38.2)

The demo is focused on rendering a series of squares in a `<canvas>` element with an animation. The goal is to have canvas divvied up in rows and columns, and have the squares scale progressively to cover the entire surface.

In the `<script>` notice that I implement the feature with two alternative methods. with `requestAnimationFrame` and with `d3-timer`. The drawing logic is the same, requiring the `fillRect` function, so that the difference boils down to how the scale is computed:

- with `requestedAnimationFrame` the scale is computed on the basis of `start` and `timestamp`; `start` is necessary to consider when the animation starts

- `d3.timer` provides the number of milliseconds in the argument of the callback function; it is enough to consider the argument relative to the desired duration

### [canvas Blocks](https://svelte.dev/repl/15ecc14fd48f43fa9ad6bfef98a406a0?version=3.38.2)

While `canvas Squares` animates a series of rectangles starting from a set of hard-coded colors, it is ultimately necessary to consider the colors from the desired dataset, `blocks-colors.json`. The demo complies with this necessity by fetching the data with `d3.json` and considering for each datapoint the most used color.

`d3.json` works asynchronously, so it is necessary to include the instruction in an `async` function and execute the code from the `onMount` method.

```js
async function drawCanvas() {
  // fetch and draw
}

onMount(() => {
  drawCanvas();
});
```

Take note that in the REPL I decided to comment the function responsible for fetching the data and drawing the corresponding rectangles. `d3.json` fetches a very large JSON object and I wanted the request to be the result of conscious effort instead of running the code immediately.

```js
onMount(() => {
  // drawCanvas();
});
```
