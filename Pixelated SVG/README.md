## [Pixelated SVG](https://svelte.dev/repl/c10d39e4e247479f88f4381ca4a3eec2?version=3.38.1)

## Notes

The goal of this demo is to provide an environment to produce pixelated vector graphics, that is `.svg` files made up entirely of rectangles. Thanks to Svelte and two-way binding, it is possible to rapidly have the canvas expand or contract to consider a variable number of columns, rows, as well as a different size for the individual cells.

### Data URL

It is possible to download an `.svg` file with the shapes described in the canvas and thanks to an anchor link with an attribute of `download`. The `href` attribute refers to a data URL, which includes a string describing the `<svg>` element following a prescribed sequence, `data:image/svg+xml,`.

The feature doesn't work in the REPL as the environment blocks the download option.

### tick

The [`tick` method](https://svelte.dev/tutorial/tick) is useful to have the `href` attribute consider the `<svg>` element _after_ the DOM has a chance to be updated.

```js
await tick();
href = getDataUrl(canvas);
```

Without this precaution the data URL will refer to the element without the last modification.
