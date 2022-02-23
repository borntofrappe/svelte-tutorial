# Word Search

[Word search](https://en.wikipedia.org/wiki/Word_search) describes a puzzle game where a sequence of words is hidden in a two-dimensional grid. The player is tasked to find the letters included in all possible directions.

## Canvas

While it is possible to include the letters in an `<svg>` element I prefer to rely on a canvas and the [canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

The demo works to showcase how to ultimately set up the canvas by binding the element and drawing on the context made available on mount.

The relevant functions on the 2D context are:

- `font` to set the font family and size

- `textAlign` and `textBaseline` to horizontally and vertically center the letters in the cell

- `fillText` to render text in the canvas

## Algorithm

The script implements a `Grid` class following the logic explained by [Jamis Buck](https://twitter.com/jamis) in the article [_Generating Word Search Puzzles_](https://weblog.jamisbuck.org/2015/9/26/generating-word-search-puzzles.html).

```js
const grid = new Grid();
grid.fill();
```

### Default

- the grid is initialized with 7 rows and 7 columns

- `grid.fill()` includes two words — 'word' and 'search' — and fills the remaining spots with random letters — in the [a-z] range

### Options

- initialize a grid with an object to change the default number of rows or columns — both initialized at 7

  ```js
  const grid = new Grid({ rows: 5 });
  const matrix = new Grid({ rows: 6, columns: 6 });
  ```

- call the `fill()` method with an object to change the default words — 'word' and 'search' — and range — [a-z]

  ```js
  grid.fill({ words: ["react", "svelte", "vue"] });
  matrix.fill({ words: ["un", "deux", "trois"], range: ["a", "g"] });
  ```

### Properties

`grid.fill()` returns an array with the sequence of letters **or** raises an error in the moment the method is not able to place the words

```js
grid.fill();
/*
[ 'k', 'j', 'w', 'm', 'i', 's', 'q', 'p', 'p', 'o', 'z', 'c', 'e', 'z', 'x', 'y', 'r', 'y', 's', 'a', 'o', 'k', 'k', 'd', 'g', 'd', 'r', 'x', 'r', 'i', 'e', 't', 'w', 'c', 'w', 'z', 'o', 'b', 'b', 'j', 'h', 'x', 'k', 'b', 'r', 'z', 'z', 't', 'v' ]
*/
```

Past the immediate output:

- `grid.string` returns a string where the letters are formatted in a series of lines

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

- `grid.array` returns a 2D array where the data is massaged into rows

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

### Logic

> A few notes on the algorithm introduced in the aforementioned article

Begin by initializing a grid with a number of rows and columns. From this starting point the idea is to create a stack, an array of objects keeping track of four pieces of data:

- `grid`: the current state of the grid

- `word`: the current word to-be-placed in the grid

- `directions`: an array of possible directions

- `positions`: an array of possible positions

The idea is to continue to try and place the words in the grid, choosing from one of the available directions and positions.

- try a specific combination of direction and position

- if the word does not fit try with a different direction

- if you exhaust all possible directions resume with a different position

- if you exhaust all possible positions remove the current item from the stack, effectively give up on trying the current word. Add the word back to reconsider the string

In the moment the word fits add a new object to the stack to consider the updated grid, the next word and a new set of directions and positions.

In the moment you exhaust all words the algorithm is complete. Fill the grid with additional characters to create the puzzle.
