# Word Search

[Word search](https://en.wikipedia.org/wiki/Word_search) describes a puzzle game where a sequence of words is hidden in a two-dimensional grid. The player is tasked to find the letters included in all possible directions.

## Canvas

While it is possible to include the letters in an `<svg>` element I prefer to rely on a canvas and the [canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). The demo works to showcase how to ultimately set up the canvas by binding the element and drawing on the context made available on mount.

The relevant functions on the 2D context are:

- `font` to set the font family and size

- `textAlign` and `textBaseline` to horizontally and vertically center the letters in the cell

- `fillText` to render text in the canvas
