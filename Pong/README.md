# [Pong](https://svelte.dev/repl/d874e50ed609488da312886ebd6b8b87?version=3.49.0)

Play the classic arcade game with two players and keyboard input.

## Svelte feats

In the development of the game the project benefits from Svelte in several manners. Beside the binding to the `<canvas>` element, the drawing operation following the `onMount` lifecycle function and the `{#if}` block conditioning the overlay with the score and the play button, two sections deserve a special mention:

- `<svelte:body>` captures keyboard input in the body of the document

- a `tweened` store, with a bit of trickery, allows to animate the position of the paddles back to play multiple rounds

The trickery is to animate a tween from `0` to `1`, tap into the interpolating function and use the incrementing value to progressively reduce the distance between the paddles and their original coordinate. In this manner you need a single tween animation to reset the entire board.
