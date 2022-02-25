# Word Search

[Word search](https://en.wikipedia.org/wiki/Word_search) describes a puzzle game where a sequence of words is hidden in a two-dimensional grid. The player is tasked to find the letters included in all possible directions.

## Algorithm

In `utils.js` the script implements a `Grid` class following the logic explained by [Jamis Buck](https://twitter.com/jamis) in the article [_Generating Word Search Puzzles_](https://weblog.jamisbuck.org/2015/9/26/generating-word-search-puzzles.html).

```js
const grid = new Grid();
grid.fill();
```

By default the grid is initialized with 7 rows and 7 columns. Moreover, `grid.fill()` includes two words — 'word' and 'search' — and fills the remaining spots with random letters — in the [a-z] range.

Change this default passing an object to the class and to the method.

For the class describe the number of columns and or rows.

```js
const grid = new Grid({ rows: 5 });
const matrix = new Grid({ rows: 6, columns: 6 });
```

For the methods customize the words and or range with arrays.

```js
grid.fill({ words: ["react", "svelte", "vue"] });
matrix.fill({ words: ["un", "deux", "trois"], range: ["a", "g"] });
```

`grid.fill()` returns an array with the sequence of letters **or** raises an error in the moment the method is not able to place the words.

```js
grid.fill();
/*
[ 'k', 'j', 'w', 'm', 'i', 's', 'q', 'p', 'p', 'o', 'z', 'c', 'e', 'z', 'x', 'y', 'r', 'y', 's', 'a', 'o', 'k', 'k', 'd', 'g', 'd', 'r', 'x', 'r', 'i', 'e', 't', 'w', 'c', 'w', 'z', 'o', 'b', 'b', 'j', 'h', 'x', 'k', 'b', 'r', 'z', 'z', 't', 'v' ]
*/
```

Additional properties allow to retrieve:

1. a string where the letters are formatted in a series of lines

   ```js
   grid.string;
   /*
   kjwmisq
   ppozcez
   xyrysao
   kkdgdrx
   rietwcw
   zobbjhx
   kbrzztv
   */
   ```

   The rows are separated with new line characters `\n`.

2 a 2D array where the data is massaged into rows

    ```js
    grid.array;
    /*
    [
    [ 'k', 'j', 'w', 'm', 'i', 's', 'q' ],
    [ 'p', 'p', 'o', 'z', 'c', 'e', 'z' ],
    [ 'x', 'y', 'r', 'y', 's', 'a', 'o' ],
    [ 'k', 'k', 'd', 'g', 'd', 'r', 'x' ],
    [ 'r', 'i', 'e', 't', 'w', 'c', 'w' ],
    [ 'z', 'o', 'b', 'b', 'j', 'h', 'x' ],
    [ 'k', 'b', 'r', 'z', 'z', 't', 'v' ]
    ]
    */
    ```

## Interaction

To implement the dragging feature the script initializes a few controlling variables:

- `isDragging`: a boolean to consider the pointer's coordinates only when the cursor is pressed on the `<svg>` element

- `line`: an object detailing the start and end position of the current selection

- `match`: the sequence of letters behind the selected line

`match` is only updated with the letters of a contiguous line, one which connects letters in a column, row or again diagonal.

Beside these `lines` and `matches` are initialized as arrays to store the completed lines and matches, and ultimately update the corresponding markup.

It is also necessary  to have a reference to the `<svg>` element, since the mouse coordinates depend on the actual size of the container.

## Reactivity

Considering the `mousemove` event update the coordinates of the line, the start and end column and row.

As you update the `line` consider the adjacent letters and eventually update the match and the remaining variable.

```svelte
$: if (line) {
    // potentially update match
}
```

When you update the arrays remember that you need to mutate the data structure to have the compiler update the markup.

```diff
-matches.push(match);
+matches = [...matches, match];
```