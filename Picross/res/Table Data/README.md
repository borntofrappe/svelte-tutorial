# Table Data

Since the generation of the desired data structure requires a few passages in which data is massaged through `map` and `reduce` functions, I decided to jot down a few notes on how the array building the table element comes to be.

## Hints

First off, the hints displayed on the side and on top of the table refer to the number of contiguous `o` characters. This means the following:

| Row or Column               | Hints |
| --------------------------- | ----- |
| `["o", "x", "o", "o", "x"]` | `21`  |
| `["x", "x", "x", "x", "x"]` | `0`   |
| `["o", "0", "o", "o", "x"]` | `4`   |

## Rows and columns

From the starting point, a string of 25 characters, it is possible to describe the rows and columns picking the characters according to their position in the string.

```js
// 2D array describing the level according to its rows
// pick the characters in groups of `rows`
const rows = 5;
const levelRows = Array(rows)
  .fill()
  .map((character, row) => [...level.slice(row * rows, row * rows + rows)]);

// 2D array describing the level according to its columns
// pick every `column`th character
const columns = 5;
const levelColumns = Array(columns)
  .fill()
  .map((character, column) =>
    Array(columns)
      .fill()
      .map((item, col) => level[column + columns * col])
  );
```

## Rows' hints

This is where a reducer function is included to describe the number of contiguous `o` characters. The idea is to build an array of integers. Considering the characters of an hypothetical string, such a structure can be computed as follows:

```js
const row = ['o', 'x', 'o', 'o', 'x'];
const hint = row.reduce(
  (acc, curr) => {
    const { character, hints } = acc;
    if (curr === 'o') {
      if (character === 'o') {
        hints[hints.length - 1] += 1;
      } else {
        hints.push(1);
      }
      return {
        character: 'o',
        hints,
      };
    }

    return {
      character: 'x',
      hints,
    };
  },
  {
    character: '',
    hints: [],
  }
);
```

Notice how the array is empty if the input string is without `o` characters. In this instance it is necessary to actually display `0`.

The previous snippet covers the hint for a single row. Expanded to every row, the logic allows to include the desired string _before_ the items describing the content of the table.

```js
const tableRows = levelRows.map((row) => {
  // array describing contiguous 'o' characters
  const hint = row.reduce(
    (acc, curr) => {
      const { character, hints } = acc;
      if (curr === 'o') {
        if (character === 'o') {
          hints[hints.length - 1] += 1;
        } else {
          hints.push(1);
        }
        return {
          character: 'o',
          hints,
        };
      }

      return {
        character: 'x',
        hints,
      };
    },
    {
      character: '',
      hints: [],
    }
  ).hints;

  // if the array is empty include a default `0` value
  const hintsRow = hint.length === 0 ? '0' : hint.join('');
  return [hintsRow, ...row];
});
```

Notice how the hints are included as a string, to have them all nested in a single `td` element.

## Columns' hints

For the columns the reasoning is slightly different, but it benefits from the same `reduce` function.

The goal here is not to include a string value before every row, but to include an entire new row before the existing structure. A row made up of an array with one empty string followed by the string describing the hints for the columns.

```js
const hintsColumns = [
  // empty string to "skip" the first column
  '',
  // array of strings describing the hints for the columns
  // ! spread the array to have the items as siblings of the empty string
  ...levelColumns.map((column) => {
    // contiguous 'o' characters
    const hint = column.reduce(
      (acc, curr) => {
        const { character, hints } = acc;
        if (curr === 'o') {
          if (character === 'o') {
            hints[hints.length - 1] += 1;
          } else {
            hints.push(1);
          }
          return {
            character: 'o',
            hints,
          };
        }

        return {
          character: 'x',
          hints,
        };
      },
      {
        character: '',
        hints: [],
      }
    );
    // string describing the contiguous o characters
    // ! include a default value in case the array is empty (meaning there are only 'x' characters)
    return hint.hints.length === 0 ? '0' : hint.hints.join('');
  }),
];
```

## Table

Wrapping everything up, the desired data structure merges the computed values:

```js
const levelsTable = [hintsColumns, ...tableRows];
```

`levelsTable` now describes a 2D array. An array with `row+1` arrays, themselves with `column+1` items describing a string for the hints or the `x` and `o` characters.
