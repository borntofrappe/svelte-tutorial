# [Two Way Binding](https://svelte.dev/repl/a471604a71ce4f5886974b2f54f537e0?version=3.38.2)

## Notes

The goal of this project is to illustrate how Svelte manages to bind state both ways. Taking the `<input>` of type `range` as a for instance, the slider is kept up to date with the value. Change one, and the other follows suit.

```html
<script>
  let value;
</script>
<input type="range" min="0" max="100" bind:value />
```

From this starting point, the demo considers a `tweened` object to have the value change smoothly over time. The metric is then used to influence a few properties of an `<svg>` element.

As the value is updated without the `bind:` declaration, note that it is necessary to parse the value retrieved from `e.target`

```js
function handleInput(e) {
  // parseInt(e.target.value, 0)
}
```
