# [Bug Feature](https://svelte.dev/repl/27163986809341a5a7c97cbc4746d01b)

The `svelte/motion` module offers animation through the `tweened` and `spring` interface. With this project, I take the example provided in the [tutorial](https://svelte.dev/tutorial/spring) for the `spring` store and build a silly animation with the vector graphic of a bug. The visual is kept in the `res` folder as a reference.

## Spring

- import the spring from the motion module

  ```js
  import { spring } from "svelte/motion";
  ```

- set up the spring's values like a store

  ```js
  // single value
  const angle = spring(0);
  // object
  const coords = spring({
    x: 0,
    y: 0,
  });
  ```

- update with the `set` function

  ```js
  angle.set(...)
  coords.set({
    x: ...,
    y: ...,
  })
  ```

- use with `$` dollar sign notation

  ```js
  const x = $coords.x;
  ```

  In the `html` be sure to wrap the JavaScript in between `{}` brackets.

  ```html
  <g transform="translate({$coords.x} {$coords.y})" ...>
    <!-- ... -->
  </g>
  const x = $coords.x;
  ```
