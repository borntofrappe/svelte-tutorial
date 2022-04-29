# [Drawing Canvas](https://svelte.dev/repl/434e0b14546747688401e8808c060a23?version=3.47.0)

The small application is broken up in two components: `Canvas` and `Palette`. With `Canvas` register user input in the form of mouse coordinates and draw a line tracing said input. With `Palette` provide a series of buttons to change the stroke color.

To have the data pass from one component to the other update the variables from `App.svelte`, and specifically `color` with the option dispatched from `Palette`.

## Additional notes

- in `Palette` I prefer to pass a separate variable in `paletteColor`, with the ultimate idea of managing the color in the component and updating the state from the component only

- in `Canvas` use a reactive statement to update the color of the stroke as `color` changes in value

  ```svelte
  $: if (context) {
    context.strokeStyle = color;
  }
  ```
