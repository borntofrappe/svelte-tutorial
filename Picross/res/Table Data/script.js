// variables describing the level
const level = 'ooxooooxooxxxxxoxxxooxoxo';
const rows = 5;
const columns = 5;

// 2D array describing the level according to its rows
// pick the characters in groups of `rows`
const levelRows = Array(rows)
  .fill()
  .map((character, row) => [...level.slice(row * rows, row * rows + rows)]);

// 2D array describing the level according to its columns
// pick every `column`th character
const levelColumns = Array(columns)
  .fill()
  .map((character, column) =>
    Array(columns)
      .fill()
      .map((item, col) => level[column + columns * col])
  );

// 2D array describing the rows prepended with a string describing the contiguous 'o' characters
const tableRows = levelRows.map(row => {
  // array describing contiguous 'o' characters
  const hint = row.reduce(
      (acc, curr) => {
          const { character, hints } = acc;
          if (curr === "o") {
              if (character === "o") {
                  hints[hints.length - 1] += 1;
              } else {
                  hints.push(1);
              }
              return {
                  character: "o",
                  hints
              };
          }

          return {
              character: "x",
              hints
          };
      },
      {
          character: "",
          hints: []
      }
  ).hints;

  // if the array is empty include a default `0` value
  const hintsRow = hint.length === 0 ? "0" : hint.join("");
  return [hintsRow, ...row];
});

// 1D array describing the first row of the table
const hintsColumns = [
  // empty string to "skip" the first column
  "",
  // array of strings describing the hints for the columns
  // ! spread the array to have the items as siblings of the empty string
  ...levelColumns.map(column => {
      // contiguous 'o' characters
      const hint = column.reduce(
          (acc, curr) => {
              const { character, hints } = acc;
              if (curr === "o") {
                  if (character === "o") {
                      hints[hints.length - 1] += 1;
                  } else {
                      hints.push(1);
                  }
                  return {
                      character: "o",
                      hints
                  };
              }

              return {
                  character: "x",
                  hints
              };
          },
          {
              character: "",
              hints: []
          }
      );
      // string describing the contiguous o characters
      // ! include a default value in case the array is empty (meaning there are only 'x' characters)
      return hint.hints.length === 0 ? "0" : hint.hints.join("");
  })
];

// 2D array describing the table through each individual cell
const levelsTable = [hintsColumns, ...tableRows];

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
