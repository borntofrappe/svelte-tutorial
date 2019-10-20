// variables describing the structure of the grid
// number of cells
const columns = 8;
const rows = 8;

// size of the cell, horizontal and vertical
const h = 80;
const v = 80;

// size of the stroke
const stroke = 10;

// array describing the grid through columns and rows
// gates describes the borders for the cells
const grid = Array(rows)
  .fill()
  .map((r, row) =>
    Array(columns)
      .fill()
      .map((c, column) => ({
        column,
        row,
        // the idea is to remove the borders by removing the matching use element
        gates: {
          north: true,
          east: true,
          south: true,
          west: true,
        },
        // ! whether or not a cell has been visited can be very well described by the lack of at least a gate
        isVisited: false,
      }))
  );

// flatten the array to have the cells in a 1D array
// the position is not based on the index in the array, but on the column and row properties
const flat = grid.reduce((acc, curr) => [...acc, ...curr], []);

function drawMaze() {
  // include an svg element with one group for each cell
  // in this group include one <use> element per gate, identifying the border
  // ! the viewBox is incremented by the stroke to avoid cropping (this is paired with the translation of the first group element)
  const width = columns * h;
  const height = rows * v;

  const maze = `
    <svg
        viewBox="0 0 ${width + stroke} ${height + stroke}"
        width=${width}
        height=${height}>
        <defs>
            <path id="north" d="M 0 0 h ${h}"></path>
            <path id="east" d="M ${h} 0 v ${v}"></path>
            <path id="south" d="M 0 ${v} h ${h}"></path>
            <path id="west" d="M 0 0 v ${v}"></path>
            <rect id="square" x="0" y="0" width="${h - stroke}" height="${v -
    stroke}"></rect>
        </defs>
        <g
          stroke="currentColor"
          stroke-width=${stroke}
          stroke-linejoin="square"
          stroke-linecap="square"
          fill="none">
          <g transform="translate(${stroke / 2} ${stroke / 2})">
              ${flat
                .map(
                  ({ column, row, gates }) => `
              <g transform="translate(${column * h} ${row * v})">
                  ${Object.entries(gates)
                    .filter(([, isGated]) => isGated)
                    .map(([href]) => `<use href="#${href}"></use>`)
                    .join('')}
              </g>
              `
                )
                .join('')}
          </g>
        </g>
    </sgv>
`;

  const body = document.querySelector('body');
  body.innerHTML = maze;
}

// aldous-broder algorithm: visit a cell and pick a neighbor at random
// if not visited, link the two, and repeat until every cell has been visited
// ! draw the maze only when every cell has been visited
const oppositeGates = [['north', 'south'], ['east', 'west']];
function randomWalk(vX, vY) {
  const cell = flat.find(({ column, row }) => column === vX && row === vY);
  // visit the cell
  cell.isVisited = true;

  // find the neighbors
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
    const [x, y] = coordinates;
    return x >= 0 && x <= columns - 1 && y >= 0 && y <= rows - 1;
  });

  // pick a neighbor at random
  const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
  // the gate describes the direction picked up by the cell
  const { gate } = neighbor;
  const [nX, nY] = neighbor.coordinates;

  // find the neighboring cell
  const neighboringCell = flat.find(
    ({ column, row }) => column === nX && row === nY
  );

  // link the two only if the neighboring cell hasn't already being visited
  if (!neighboringCell.isVisited) {
    // remove the gates facing each other
    cell.gates[gate] = false;

    const direction = oppositeGates.find(opposites => opposites.includes(gate));
    const oppositeGate = direction.find(opposite => opposite !== gate);
    neighboringCell.gates[oppositeGate] = false;
  }

  // if every cell has been visited draw the maze, else continue toward the neighboring cell
  const areVisited = flat.every(({ isVisited }) => isVisited);
  if (areVisited) {
    drawMaze();
  } else {
    randomWalk(nX, nY);
  }
}

randomWalk(Math.floor(Math.random(rows)), Math.floor(Math.random(columns)));
