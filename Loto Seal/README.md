# [Loto Seal](https://svelte.dev/repl/0ef0f010c62c492081bd3e8ce1b5f160?version=3.38.2)

## Notes

The Loto Seal is an object in the first title of the Dragon Quest series, known in the west as Dragon Warrior. In the game you need the seal to finish the game, and you are instructed to find such an essential asset at specific coordinates. Here I try to create a similar concept by placing an `<svg>` element somewhere in the page, and hinting at its position following a click event on the entire body.

### Reactive declarations

`seal` and `pointer` are purposed to describe the position of the seal and cursor respectively. Both variables refer to an object detailing the position with two properties: `column` and `row`.

`getCoords` is defined as a function to find the coordinates of the seal, and it works by considering the `body` element as a grid. Starting from the width and height of the element, the body of the function computes and returns a random column and row.

```js
const { width, height } = document.body.getBoundingClientRect();

const columns = Math.floor(width / resolution);
const rows = Math.floor(height / resolution);
```

`handleSearch`, on the other hand, is defined as a function to compute the column and row of where the click event was registered.

```js
cons column = Math.floor(pageX / resolution);
constt row = Math.floor(pageY / resolution);
```

Note that the function uses the coordinates behind `e.pageX` and `e.pageY`, but it is necessary to offset this value for the `left` and `top` value retrieved through `body.getBoundingClientRect()`. In the REPL, at least, `top` describes a 16 pixel value which would otherwise throw off the computation.

```js
const { left, top } = document.body.getBoundingClientRect();

const column = Math.floor((pageX - left) / resolution);
const row = Math.floor((pageY - top) / resolution);
```

As `seal` and `pointer` are updated, the DOM mirrors the change by describing the difference between the two sets of coordinates.

In terms of reactive declaration, note also `isFound`. This variable describes if the `seal` and `pointer` objects have the same coordinates.

```js
$: isFound =
  seal && pointer && seal.column === pointer.column && seal.row === pointer.row;
```

As `seal` and `pointer` change, the expression checks if the variable hold a truthy value and match in column and row.

### CSS transition

In the game, and once you are able to find the seal, the object is animated vertically and above the character. Here the idea is to use a custom CSS transition to move the `<svg>` element upwards.

```js
function raise(_, { delay = 0, duration = 1000 }) {
  return {
    delay,
    duration,
    css: (t) => `transform: translateY(${resolution * (1 - t)}px)`,
  };
}
```

`resolution` means that the displacement equals the size of an individual tile. This explains why the seal is also positioned starting from the first row.

```js
function getCoords() {
  // ..

  const row = Math.floor(Math.random() * (rows - 1) + 1);

  // ..
}
```

`1 - t` means the offset starts at `resolution` and is then animated to `0`. This is knowing that `t` is a value which grows in the `[0, 1]` range, and also explains why the seal is positioned one row above its actual row. The object is elevated from its rightful coordinates.

```svelte
<svg
  style="
    position: absolute;
    left: {seal.column * resolution}px;
    top: {(seal.row - 1) * resolution}px">
<!-- -->
</svg>
```
