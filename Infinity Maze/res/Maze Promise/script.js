// function returning a promises which resolves in a grid of a defined number of columns and rows
const createMaze = (columns, rows) =>
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

      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
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
    randomWalk(Math.floor(Math.random(rows)), Math.floor(Math.random(columns)));
  });

// test out the promise by drawing a maze with a set number of columns, rows and an arbitrary size
const numberColumns = 8;
const numberRows = 8;
const stroke = 10;
const h = 50;
const v = 50;
createMaze(numberColumns, numberRows).then(grid => {
  // include an svg element with one group for each cell
  // in this group include one <use> element per gate, identifying the border
  // ! the viewBox is incremented by the stroke to avoid cropping (this is paired with the translation of the first group element)
  const width = numberColumns * h;
  const height = numberRows * v;

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
              ${grid
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
});
