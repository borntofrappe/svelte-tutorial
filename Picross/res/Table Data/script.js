// variables describing the level
const level = 'ooxooooxooxxxxxoxxxooxoxo';
const rows = 5;
const columns = 5;

// 2D array describing the level according to its rows (picking the characters in groups of `rows`)
const levelRows = Array(rows)
  .fill()
  .map((character, row) => [...level.slice(row * rows, row * rows + rows)]);

// 2D array describing the level according to its columns (picking every 5th character)
const levelColumns = Array(columns)
  .fill()
  .map((character, column) =>
    Array(columns)
      .fill()
      .map((item, col) => level[column + columns * col])
  );

// 2D array describing the rows prepended with a string describing the contiguous characters
const tableRows = levelRows.map(row => {
  const hintsRow = row.reduce(
    (acc, curr) => {
      const { character, hints } = acc;
      if (character === curr) {
        hints[hints.length - 1] += 1;
        return {
          character,
          hints,
        };
      }
      return {
        character: curr,
        hints: [...hints, 1],
      };
    },
    {
      character: '',
      hints: [],
    }
  );
  return [hintsRow.hints.join(''), ...row];
});

// 1D array describing the first row of the table, with an empty cell followed by the strings describing the contiguous characters in the column
const tableColumns = [
  '',
  ...levelColumns.map(column => {
    const hintsCol = column.reduce(
      (acc, curr) => {
        const { character, hints } = acc;
        if (character === curr) {
          hints[hints.length - 1] += 1;
          return {
            character,
            hints,
          };
        }
        return {
          character: curr,
          hints: [...hints, 1],
        };
      },
      {
        character: '',
        hints: [],
      }
    );
    return hintsCol.hints.join('');
  }),
];

// 2D array describing the table through each individual cell
const levelsTable = [tableColumns, ...tableRows];

// for the hints show one span element for each character
// for the x and o cells include a button **and** when the button is clicked, include an svg graphic instead
const markup = `
    <table>
        ${levelsTable
          .map(
            row =>
              `
            <tr>
                ${row
                  .map(cell =>
                    cell === 'x' || cell === 'o'
                      ? `
                        <td>
                        <!--
                          <button></button>
                        -->
                          <svg viewBox="0 0 100 100" width="100" height="100">
                            <use href="#${cell}"></use>
                          </svg>
                        </td>
                        `
                      : `
                        <td>${[...cell]
                          .map(
                            hint =>
                              `
                            <span>${hint}</span>
                            `
                          )
                          .join('')}
                        </td>
                        `
                  )
                  .join('')}
            </tr>
            `
          )
          .join('')}

    </table>
`;

document.body.innerHTML += markup;
