# [Donut Values](https://svelte.dev/repl/4a2088067b1c47e7bddbf24f58770c35?version=3.49.0)

Highlight a specific value and an average in a donut chart.

## SVG donut

Playing around with SVG syntax it is actually possible to create the donut chart without a third library like `d3`. The main trick relates to the `pathLength` attribute set on the `<path>` element which creates the outline for the donut.

```svelte
<path {pathLength} />
```

`stroke-dasharray` and `stroke-dashoffset` are relative to the length described by the attribute.

Set `pathLength` to `100` as in 100 percent. Set `stroke-dasharray` to the same amount and then `stroke-dashoffset` to a value corresponding to the input value. Technically `100 - value` since a value of `100` completely hides the path, a value of `0` shows the whole piece.

For the label devoted to the average define a larger path to position the text with `<textPath>`. It would be possible to position the label with `startOffset`, but ultimately I decided to compute an angle and rotate the label from its center.

```svelte
<g transform="rotate({angle})">
  <!-- text & textPath -->
</g>
```

The angle also comes in handy to position a `<mask>` element for a custom indentation carving the donut at the coordinate of the mean.

## Svelte reactivity

Past reactive declarations to compute the offset and the angle, on the basis of the input value and average, it is possible to use the `$:` declaration to call a function whenever the values change.

```svelte
$: update(offset, angle);
```

The goal of the function is to update two `tweened` objects and animate the angle/offset instead of setting the measures immediately.

Make the function `async` to first tween the offset, the outline of the donut. Following this animation tween the angle, so to show the position of the average.

## Donut component

`Donut.svelte` does not require `d3`, but to test out the component the library helps to compute the average from a collection of random values and the color from a color scale.

```js
import { mean } from "d3-array";
import { interpolateCool } from "d3-scale-chromatic";
```

For the average `App.svelte` first creates an array of random values.

```js
const average = mean(values);
```

For the color another random value between 0 and 100 allows to retrieve a color in the specific interpolating function.

```js
const color = interpolateCool(value / 100); // domain [0, 1]
```

In the moment you create multiple copies of the component do remember that the `id` attribute of the shapes defined in the `defs` block needs to be unique.

```svelte
<path id="donut-path-{id}" />
```

Without this step successive `Donut` components would rely on the definitions of the first copy's only.
