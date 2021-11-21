# [World Coordinates](https://svelte.dev/repl/bbb26de08d694a89bdf7077688d23f62?version=3.44.2)

## Motivation

In the process of creating a visualization highlighting the travel of one Phileas Fogg around the globe, [live on CodePen](https://codepen.io/borntofrappe/pen/yLoZyEa), I found myself needing the coordinates describing the path on the globe. With Svelte I was able to quite rapidly set up a playground satisfying this need.

The idea is to plot the entire world in the top section of the page and listen to mouse events on the same `<svg>` element.
Each mouse click has the effect of adding the point in world coordinates in an unordered list, with two buttons allowing to copy the longitude/latitude pair and to remove the same point.

Past the list, additional buttons allow to copy the entire list of coordinates (which is exactly what I did for the data visualization) and to remove every selection.

## Libraries

Different modules from the `d3` library and the `topojson` package allow to create the visualization, while the interaction is left to Svelte. `copy-to-clipboard` is installed to simplify how the values are copied to the clipboard.

I believe the small project is effective to show the potential of Svelte for prototyping, creating a first, working solution with relative ease.
