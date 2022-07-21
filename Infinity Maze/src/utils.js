// function returning a random integer up to a maximum
export function randomUpTo(max) {
  return Math.floor(Math.random() * max);
}

// function returning a random item from an array
function randomItem(arr) {
  return arr[randomUpTo(arr.length)];
}


// function returning a random point considering two maximum values
// ! include an optional third parameter to have the function return a point different than a given point
// specify a default value for which the random function will never equate
export function randomPoint(xMax, yMax, point = [-1, -1]) {
  const [pX, pY] = point;
  const x = randomUpTo(xMax);
  const y = randomUpTo(yMax);

  return x === pX && y === pY ? randomPoint(xMax, yMax, point) : [x, y];
}

// function returning a promises which resolves in a grid of a defined number of columns and rows
export const createMaze = (columns, rows) =>
  new Promise(resolve => {
    // array describing the gates in opposites to have the cells remove the stroke connecting the two
    const oppositeGates = [['north', 'south'], ['east', 'west']];

    // create a 2d array describing the grid in rows and columns
    const grid = Array(rows)
      .fill()
      .map((r, row) =>
        Array(columns)
          .fill()
          // to each cell add the column, row as well as an object describing the side of the cell which is meant to be drawn (the gates)
          // add also a boolean to describe whether a cell has been visited or not (the algorithm continues until every cell has been visited)
          .map((c, column) => ({
            column,
            row,
            gates: {
              north: true,
              east: true,
              south: true,
              west: true,
            },
            // ! the boolean is actually superfluous, as it'd be possible to check the visited status by looking at the gates
            isVisited: false,
          }))
      );

    // flatten the array to have the cells in a 1d array
    // the position is not based on the index in the array, but on the column and row properties
    const flat = grid.reduce((acc, curr) => [...acc, ...curr], []);

    // function called recursively until every cell has been visited
    function randomWalk(vX, vY) {
      // visit the current cell
      const cell = flat.find(({ column, row }) => column === vX && row === vY);
      cell.isVisited = true;

      // pick a neighbor at random
      // ! be sure to filter out the objects outside of the maze
      const neighbors = [
        {
          gate: 'north',
          coordinates: [vX, vY - 1],
        },
        {
          gate: 'east',
          coordinates: [vX + 1, vY],
        },
        {
          gate: 'south',
          coordinates: [vX, vY + 1],
        },
        {
          gate: 'west',
          coordinates: [vX - 1, vY],
        },
      ].filter(({ coordinates }) => {
        // consider the coordinates falling inside the grid
        const [x, y] = coordinates;
        return x >= 0 && x <= columns - 1 && y >= 0 && y <= rows - 1;
      });

      const neighbor = randomItem(neighbors);
      // the gate describes the direction picked up by the cell
      const { gate } = neighbor;
      // the coordinates dictate where the algorithm will move next
      const [nX, nY] = neighbor.coordinates;

      // find the neighboring cell
      const neighboringCell = flat.find(
        ({ column, row }) => column === nX && row === nY
      );

      // link the two only if the neighboring cell hasn't already been visited
      if (!neighboringCell.isVisited) {
        // remove the gates facing each other
        cell.gates[gate] = false;

        const direction = oppositeGates.find(opposites =>
          opposites.includes(gate)
        );
        const oppositeGate = direction.find(opposite => opposite !== gate);
        neighboringCell.gates[oppositeGate] = false;
      }

      // if every cell has been visited resolve the promise, else continue toward the neighboring cell
      const areVisited = flat.every(({ isVisited }) => isVisited);
      if (areVisited) {
        resolve(flat);
      } else {
        randomWalk(nX, nY);
      }
    }

    // kickstart the random walk from a random point in the grid
    randomWalk(randomUpTo(columns), randomUpTo(rows));
  });


