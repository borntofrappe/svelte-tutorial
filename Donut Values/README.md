# Donut Values

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
