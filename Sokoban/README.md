# [Sokoban](https://svelte.dev/repl/ebce8ef2dbe84d33bba4de666c761cb9?version=3.49.0)

## Scope

In a [sokoban](https://en.wikipedia.org/wiki/Sokoban) puzzle game you are tasked to move crates within the constraints set in a level, in order to place all objects above designated areas.

Taking inspiration from the wikipedia entry the project focuses on the interaction in a given level.

## Level

The level is set with a hard-coded string, describing the grid in rows and columns.

```js
const level = `eewwwwwe
wwwbbbwe
wtpcbbwe
wwwbctwe
wtwwcbwe
wbwbtbww
wcbmcctw
wbbbtbbw
wwwwwwww`;
```

Each letter has a specific meaning, used immediately to draw a specific sprite, but also to position the interactable objects — player and crates.

| Letter | Meaning    |
| ------ | ---------- |
| e      | empty      |
| w      | wall       |
| b      | background |
| t      | target     |
| p      | player     |
| c      | crate      |
| m      | match      |

`m` describes a target _and_ a crate.

In the script break the level to produce a 2D grid, where the letters are included as values with specific coordinates.

## defs

In the `<defs>` block define visual for the letters in the level, but only for those elements which are not meant to change over time — the empty, wall, background and target cells.

With a `{#each}` block loop through the grid and use the associated graphic with the `<use>` element.

```svelte
<use href="#tile-{value}" />
```

It is not necessary to filter out the letters without definition. When the `href` attribute doesn't point to an existing id nothing will be rendered.

## Update

To update the state of the game following player interaction it is actually possible to rely on a single tween, for the player itself.

```js
const player = tweened({
  column,
  row,
});
```

When you update the column and row with the `set` method, the trick is to tap into the store's option and specifically the interpolating function describing the `from` and `to` values.

```js
player.set(
  {
    column,
    row,
  },
  {
    interpolate: (from, to) => (t) => {
      // ...
    },
  }
);
```

When you move against a crate use the values not only to update the player, but also the crate. Use the same coordinates, offset by the position of the crate.

```js
crates[crateIndex].column = column + dc;
crates[crateIndex].row = row + dr;
```

Following the tween animation repeat the instruction, so to ensure the value describe the final, integer measure.

## hasWon

The level is completed when all the crates are positioned above the target areas. It would be possible to use a reactive declaration.

```js
$: hasWon = crates.every(({ column: cc, row: cr }) =>
  targets.some(({ column: tc, row: tr }) => cc === tc && cr === tr)
);
```

The statement would however run every time a crate is updated, every time the column and row value change. In light of this I decided to set the variable a boolean, starting at `false`, and update its value only after the player _and_ a crate have both changed position.

## Reset

To reset the level you need only to re-draw those entities which change over time — player and crates. You do not need to completely update the entire grid.

Setting the player back to its original location is relatively straightforward, since you extract the column and row in order to set the initial value for the tween.

```js
player.set(
  {
    column: pc,
    row: pr,
  },
  { duration: 0 }
);
```

Repositioning the crates is slightly more involved. You can look back at the string describing the level and extract the crates. If, on the other hand, you use the `grid` collection, which already describes the level in a 2D array, you need to ensure you do not modify the data structure. This explains why the `reduce` method spreads the array in a one dimensional structure, but also the object describing the cell.

```js
.reduce((acc, curr) => [...acc, ...curr.map((cell) => ({ ...cell }))], [])
```

When you update the crate's position in column and row `grid` does not change.
