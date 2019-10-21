export function createMaze(columns, rows) {
    // array describing the grid through columns and rows
    // gates describes the borders for the cells
    const grid2d = Array(columns)
      .fill()
      .map((c, column) =>
        Array(rows)
          .fill()
          .map((r, row) => ({
            column,
            row,
            // the idea is to remove the borders by removing the matching use element
            gates: {
              north: true,
              east: true,
              south: true,
              west: true,
            },
          }))
      );

    // flatten the array to have the cells in a 1D array
    // the position is not based on the index in the array, but on the column and row properties
    const grid = grid2d.reduce((acc, curr) => [...acc, ...curr], []);

    grid.forEach(({ column, row, gates }) => {
      const isNorth = Math.random() > 0.5;
      if (isNorth) {
        const northIndex = grid.findIndex(
          cell => cell.column === column && cell.row === row - 1
        );
        if (northIndex !== -1) {
          gates.north = false;
          grid[northIndex].gates.south = false;
        } else {
          const eastIndex = grid.findIndex(
            cell => cell.column === column + 1 && cell.row === row
          );
          if (eastIndex !== -1) {
            gates.east = false;
            grid[eastIndex].gates.west = false;
          }
        }
      } else {
        const eastIndex = grid.findIndex(
          cell => cell.column === column + 1 && cell.row === row
        );
        if (eastIndex !== -1) {
          gates.east = false;
          grid[eastIndex].gates.west = false;
        } else {
          const northIndex = grid.findIndex(
            cell => cell.column === column && cell.row === row - 1
          );
          if (northIndex !== -1) {
            gates.north = false;
            grid[northIndex].gates.south = false;
          }
        }
      }
    });
    return grid;
  }
