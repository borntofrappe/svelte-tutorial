# Connect the Dots

The goal is to create a component which considers path element(s) as input, breaks up the lines/curves/arcs in a series of points and accompanies each point with an incrementing number. In so doing the idea is to create a small game where the player is tasked to connect the points and trace the outline of the resulting figure.

## path

Use the `getTotalLength` method to retrieve the length of the desired path elements. Use the `getPointAtLength` method to then find a point in (x, y) coordinate in the same element.

It is not necessary to actually render the elements, meaning you can wrap the visuals to-be-drawn in a `<defs>` block.
