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
