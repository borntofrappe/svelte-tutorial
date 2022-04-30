# Connect the Dots

The goal is to create a component which considers a path element, breaks up the lines/curves/arcs in a series of points and displays each point with an incrementing number. In so doing the idea is to create a small game where the player is tasked to connect the points and trace the outline of the not-so-hidden figure.

## Points

Use `getTotalLength` to find the length of the path element. Use `getPointAtLength` to find the points at increments of the total measure. The approach works, but suffers in the moment the increment occurs between actual segments in the path element. A different approach would be to consider the syntax of the `d` attribute with regular expressions, so to locate the connecting point. I chose not to pursue this route not because of complexity, but also because the approach would contrast how user input is ultimately registered.

## User input

Instead of tracing user input point by point the idea is to consider a start and end coordinate in a `<line>` element. These coordinates are then bound to the coordinates prescribed by the points, so that users can only instantiate a line on a point and terminate said line in the point which follows — or the first point as the drawing comes to a close.

Use `isConnecting` as a controlling variable, so to only draw as the mouse has first been pressed on a selected point.

With the boolean listen to different mouse events on different nodes:

- on the wrapping `<svg>` element listen to `mouseup` and `mouseleave`. In this instance set the controlling variable to `false` and remove the last line — this is to ensure that the project only draws complete segments from point to point. To avoid removing multiple lines condition the operation to `isConnecting` being actually `true`

- on the point describing the start index listen to the `mousedown` event. Here set the controlling variable to `true` and initialize a line from the very same spot

- on the point following the start index listen to the `mouseenter` event. Here complete the line connecting the two points and update the index. Increment the index so that the application consider the segment which follows

## Helpers

In the DOM use `{#if}` statements to include a series of circles to support the connecting feature.

Before the dots add a circle to highlight the next node.

After the dots add two circles to consider user input, at the coordinates specified by the current and next index.

Use the modulo operator so that the next index refers to the very first node when the line reaches the end.

## isAllConnected

`isConnecting` works to implement the drag and draw feature. `isAllConnected` helps to ultimately convey that all points are connected and produce a small animation.

It would be possible to use the variable in the DOM with additional `{#if}` statements, but I ultimately prefer to attach the boolean to a class and handle the animation with CSS.

```svelte
<svg
  class:isAllConnected>
```

## Drawing

The `drawing.svg` has a given `viewBox` attribute and a single `<path>` element for the connecting feature.

Past the path the vector file includes additional SVG elements to support the visual.
