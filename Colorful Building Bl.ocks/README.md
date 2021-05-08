# [Colorful Building Bl.ocks](https://svelte.dev/repl/63d826e34edb4d78bd2e2d9bc7e63936?version=3.38.2)

## Notes

To celebrate the [10th anniversary](https://d3js.community/d3-10) of the [d3 library](https://d3js.org/), the community proposed [d3 Parade 2021](https://d3js.community/d3-parade-2021) with the goal of creating data visualizations focused on d3.

The goal of this project is to participate to the initiative exploring the bl.ocks created through [Blockbuilder](https://blockbuilder.org/) and more specifically their color. The [dataset](https://observablehq.com/@enjalot/blockbuilder-search-data?ui=classic) is curated by the d3 community to provide a rather sizable JSON file with every single color used by every single bl.ock. The data is mapped to a canvas element, describing the color most frequently used by each bl.ock, and later a treemap visualization to detail all the colors for the selected block.

_Please note:_ the visualization is complex enough to warrant a few smaller demos, which are developed in Svelte's own REPL.

### Smaller Demos

#### [viewBox Transition](https://svelte.dev/repl/df0f8d719d8443a89c7fcca52920b7e3?version=3.38.2)

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

#### [treemap Colors](https://svelte.dev/repl/b2c64c05fbd641b191407c84e6b688fa?version=3.38.2)

Once the visualization is able to render a visual for each bl.ock, describing the most prominent color, the idea is to allow for exploration in the form of a tooltip. Following a click, the component describes a few features of the individual project: the name, description, and also all the colors used by the selected demo. `d3-hierarchy` is helpful to build a treemap to illustrate the absolute frequency of the colors. A hard-coded object is used to illustrate the concept.

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

#### [canvas Squares](https://svelte.dev/repl/41e881707219450ab6d5d17ad05b1ec8?version=3.38.2)

The demo is focused on rendering a series of squares in a `<canvas>` element with an animation. The goal is to have canvas divvied up in rows and columns, and have the squares scale progressively to cover the entire surface.

In the `<script>` notice that I implement the feature with two alternative methods. with `requestAnimationFrame` and with `d3-timer`. The drawing logic is the same, requiring the `fillRect` function, so that the difference boils down to how the scale is computed:

- with `requestedAnimationFrame` the scale is computed on the basis of `start` and `timestamp`; `start` is necessary to consider when the animation starts

- `d3.timer` provides the number of milliseconds in the argument of the callback function; it is enough to consider the argument relative to the desired duration

#### [canvas Blocks](https://svelte.dev/repl/15ecc14fd48f43fa9ad6bfef98a406a0?version=3.38.2)

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

Take note that in the REPL I decided to comment the function responsible for fetching the data and drawing the corresponding rectangles.

```js
onMount(() => {
  // drawCanvas();
});
```

`d3.json` fetches a very large JSON object and I wanted the request to be the result of conscious effort instead of running the code immediately. The precaution is not present in the local demo since it is necessary to install the packages and then explicitly run the project on localhost.

#### [Highlight Component](https://svelte.dev/repl/f92e7d25d67c4e2685c9fce55c1fb87f?version=3.38.2)

The visualization described in `treemapColors` is ultimately included in a component shown when selecting a specific project. This demo focuses on the visual by describing its overall structure, format and style.

The specific demo has an `<input>` element of type `checkbox` to toggle the component and relies on `d3-time-format` to provide the date in a convenient format.

#### [Colorful Blocks](https://svelte.dev/repl/727983571cf443eab883669193f371bf?version=3.38.2)

In this rather small demo I set out to create an `<svg>` element with a series of adjacent squares, animated on hover and colored with a function from the `d3-scale-chromatic` module.

The visual is meant to support how the demo studies the colors of the bl.ocks,

### [Final Demo](https://svelte.dev/repl/63d826e34edb4d78bd2e2d9bc7e63936?version=3.38.2)

The demos are condensed in a project explaining the visualization and the dataset.

Anchor links and buttons are styled to provide more color. On hover and focus, the elements loop through 10 colors of the rainbow, retrieved with `d3.interpolateRainbow`.

```js
const rainbow = Array(10)
  .fill()
  .map((_, i, { length }) => d3.interpolateRainbow(i / rainbow));
/*
[
rgb(110, 64, 170),
rgb(191, 60, 175),
rgb(254, 75, 131),
rgb(255, 120, 71),
rgb(226, 183, 47),
rgb(175, 240, 91),
rgb(82, 246, 103),
rgb(29, 223, 163),
rgb(35, 171, 216),
rgb(76, 110, 219),
]
*/
```

The container housing the `<svg>` and `<canvas>` includes an additional `<svg>` element, shown if the fetch request fails. In this instance the idea is to show the logo for the d3 library on top of the otherwise working canvas.

A footer is also included to describe the visualization, or lack thereof.

_Please note_: beside Svelte's own REPL, the demo is recreated on [codesandbox](https://codesandbox.io/s/colorful-building-blocks-5f14s).
