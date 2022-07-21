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

// include an svg element with one group for each cell
// ! the viewBox is incremented by the stroke to avoid cropping (this is paired with the translation of the first group element)
const width = columns * h;
const height = rows * v;

const player = {
  x: columns - 1,
  y: rows - 1,
};

const maze = `
    <svg
        viewBox="0 0 ${width + stroke} ${height + stroke}"
        width=${width}
        height=${height}>
        <defs>
            <rect id="border" x="0" y="0" width="${width}" height="${height}"></rect>
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
              <use href="#border"></use>
          </g>
        </g>


        <g
          stroke="none"
          fill="hsl(180, 70%, 50%)">
          <g transform="translate(${stroke} ${stroke})">
            <g class="player" transform="translate(${player.x * h} ${player.y *
  v})">
              <use href="#square"></use>
            </g>
          </g>
        </g>
    </sgv>
`;

game.innerHTML = maze;

function movePlayer(direction = 'bottom') {
  switch (direction) {
    case 'up':
    case 38:
      player.y = Math.max(0, player.y - 1);
      break;
    case 'right':
    case 39:
      player.x = Math.min(columns - 1, player.x + 1);
      break;
    case 'down':
    case 40:
      player.y = Math.min(rows - 1, player.y + 1);
      break;
    case 'left':
    case 37:
      player.x = Math.max(0, player.x - 1);
      break;
    default:
      console.log('Nothing else to say');
  }
  const square = document.querySelector('g.player');
  square.setAttribute(
    'transform',
    `translate(${player.x * h} ${player.y * v})`
  );
}

const buttons = document.querySelectorAll('button');
function handleClick() {
  const id = this.getAttribute('id');
  movePlayer(id);
}
buttons.forEach(button => button.addEventListener('click', handleClick));
function handleKeyDown({ keyCode }) {
  if (keyCode >= 37 || keyCode <= 40) {
    movePlayer(keyCode);
  }
}
window.addEventListener('keydown', handleKeyDown);
