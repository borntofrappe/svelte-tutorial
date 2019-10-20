const game = document.querySelector('.game');

// variables describing the structure of the grid
// number of cells
const columns = 5;
const rows = 5;

// size of the cell, horizontal and vertical
const h = 100;
const v = 100;

// size of the stroke
const stroke = 10;

// array describing the grid through columns and rows
// gates describes the borders for the cells
const grid = Array(columns)
  .fill()
  .map((c, column) =>
    Array(rows)
      .fill()
      .map((r, row) => ({
        column,
        row,
        // the idea is to remove the borders by removing the matching use element
        gates: ['north', 'east', 'south', 'west'],
      }))
  );

// flatten the array to have the cells in a 1D array
// the position is not based on the index in the array, but on the column and row properties
const flat = grid.reduce((acc, curr) => [...acc, ...curr], []);

// include an svg element with one group for each cell
// in this group include one <use> element per gate, identifying the border
// ! the viewBox is incremented by the stroke to avoid cropping (this is paired with the translation of the first group element)
const width = columns * h;
const height = rows * v;

const player = {
  x: 2,
  y: 3,
};

const goal = {
  x: 3,
  y: 1,
};

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
                  ${gates.map(href => `<use href="#${href}"></use>`).join('')}
              </g>
              `
                )
                .join('')}
          </g>
        </g>


        <g
          stroke="none"
          fill="hsl(180, 70%, 50%)">
          <g transform="translate(${stroke} ${stroke})">
            <g class="goal" transform="translate(${goal.x * h} ${goal.y * v})">
              <use href="#square" opacity="0.25"></use>
            </g>
            <g class="player" transform="translate(${player.x * h} ${player.y *
  v})">
              <use href="#square"></use>
            </g>
          </g>
        </g>
    </sgv>
`;

game.innerHTML = maze;

let isZoomed = false;
const buttonZoom = document.querySelector('button#zoom');
const buttonReposition = document.querySelector('button#reposition');

function zoom() {
  isZoomed = !isZoomed;
  const svg = document.querySelector('svg');
  if (isZoomed) {
    svg.setAttribute(
      'viewBox',
      `${player.x * h + stroke} ${player.y * v + stroke} ${h - stroke} ${v -
        stroke}`
    );
  } else {
    svg.setAttribute('viewBox', `0 0 ${width + stroke} ${height + stroke}`);
  }
}

function reposition() {
  player.x = Math.floor(Math.random() * columns);
  player.y = Math.floor(Math.random() * rows);

  const square = document.querySelector('g.player');
  square.setAttribute(
    'transform',
    `translate(${player.x * h} ${player.y * v})`
  );

  if (isZoomed) {
    const svg = document.querySelector('svg');
    svg.setAttribute(
      'viewBox',
      `${player.x * h + stroke} ${player.y * v + stroke} ${h - stroke} ${v -
        stroke}`
    );
  }
}

buttonZoom.addEventListener('click', zoom);
buttonReposition.addEventListener('click', reposition);
