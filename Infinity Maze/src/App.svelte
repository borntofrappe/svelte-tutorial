<script>
  import Controls from './Controls.svelte';
  import Square from './Square.svelte';
  import { createMaze, randomUpTo, randomPoint } from './utils.js';
  import { tweened } from 'svelte/motion';
  import { sineInOut, quintInOut } from 'svelte/easing';

  let isPlaying = false;
  let isReady = false;
  let isSetup = false;

  // size of the cell, horizontal and vertical
  const h = 100;
  const v = 100;

  // size of the stroke
  const stroke = 10;
  const columns = 5;
  const rows = 5;

  // include an svg element with one group for each cell
  // in this group include one <use> element per gate, identifying the border
  // ! the viewBox is incremented by the stroke to avoid cropping (this is paired with the translation of the first group element)
  const width = columns * h;
  const height = rows * v;

  let cell;
  let maze = [];

  const cX = columns / 2 - 0.5;
  const cY = rows / 2 - 0.5;

  let gX = cX;
  let gY = cY;

  let pX = tweened(cX);
  let pY = tweened(cY);

  let vX = tweened(0);
  let vY = tweened(0);
  let vWidth = tweened(width + stroke);
  let vHeight = tweened(height + stroke);

  function zoomOut() {
    const options = {
      easing: quintInOut,
      duration: 450,
    };
    isReady = true;
    vX.set(0, options);
    vY.set(0, options);
    vWidth.set(width + stroke, options);
    vHeight.set(height + stroke, options);
  }
  function reposition() {
    [gX, gY] = randomPoint(columns, rows);
    let [x, y] = randomPoint(columns, rows, [gX, gY]);
    cell = maze.find(({ column, row }) => column === x && row === y);

    pX.set(x, {
      duration: 0,
    });
    pY.set(y, {
      duration: 0,
    });
    vX.set(x * h + stroke, {
      duration: 0,
    });
    vY.set(y * v + stroke, {
      duration: 0,
    });
    let timeout = setTimeout(() => {
      zoomOut();
      clearTimeout(timeout);
    }, 1000);
  }

  function setUp() {
    isPlaying = true;
    isReady = false;

    const options = {
      easing: quintInOut,
      duration: 500,
    };

    vX.set($pX * h + stroke, options);
    vY.set($pY * v + stroke, options);
    vWidth.set(h - stroke, options);
    vHeight.set(v - stroke, options);

    let timeout = setTimeout(() => {
      createMaze(columns, rows).then((grid) => {
        maze = grid;
        isSetup = true;
        reposition();
        clearTimeout(timeout);
      });
    }, 1000);
  }

  const directions = {
    north: {
      y: -1,
    },
    south: {
      y: 1,
    },
    west: {
      x: -1,
    },
    east: {
      x: 1,
    },
  };

  const keyCodes = [
    [38, 'north'],
    [39, 'east'],
    [40, 'south'],
    [37, 'west'],
  ];

  let isMoving = false;
  function moveSquare(direction) {
    if (isReady && !isMoving && !cell.gates[direction]) {
      const options = {
        duration: 150,
        easing: sineInOut,
      };
      const { x = 0, y = 0 } = directions[direction];
      const dX = $pX + x;
      const dY = $pY + y;

      cell = maze.find(({ column, row }) => column === dX && row === dY);

      pX.set(dX, options);
      pY.set(dY, options);

      isMoving = true;

      let timeout = setTimeout(() => {
        if (dX === gX && dY === gY) {
          setUp();
        }
        isMoving = false;
      }, options.duration + 50);
    }
  }

  function handleControl(e) {
    const control = e.detail;
    switch (control) {
      case 'play':
        setUp();
        break;
      case 'north':
      case 'west':
      case 'east':
      case 'south':
        moveSquare(control);
        break;
    }
  }
</script>

<svelte:window
  on:keydown={({ keyCode }) => {
    const direction = keyCodes.find(([code]) => code === keyCode);
    if (direction) {
      moveSquare(direction[1]);
    }
  }}
/>
<div class="game">
  <svg id="maze" viewBox="{$vX} {$vY} {$vWidth} {$vHeight}" {width} {height}>
    <defs>
      <path id="north" d="M 0 0 h {h}" />
      <path id="east" d="M {h} 0 v {v}" />
      <path id="south" d="M 0 {v} h {h}" />
      <path id="west" d="M 0 0 v {v}" />
    </defs>
    <g
      stroke="currentColor"
      stroke-width={stroke}
      stroke-linejoin="square"
      stroke-linecap="square"
      fill="none"
    >
      <g transform="translate({stroke / 2} {stroke / 2})">
        {#if isSetup}
          <rect x="0" y="0" {width} {height} fill="hsl(0, 0%, 5%)" />
          {#each maze as { column, row, gates }}
            <g transform="translate({column * h} {row * v})">
              {#each Object.entries(gates) as [href, isGated]}
                {#if isGated}
                  <use href="#{href}" />
                {/if}
              {/each}
            </g>
          {/each}
        {/if}
      </g>
    </g>

    <g transform="translate({stroke} {stroke})">
      <g id="goal" transform="translate({gX * h} {gY * v})">
        <Square fill="hsl(0, 0%, 25%)" width={h - stroke} height={v - stroke} />
      </g>
      <g id="player" transform="translate({$pX * h} {$pY * v})">
        <Square
          fill="hsl(340, 70%, 50%)"
          width={h - stroke}
          height={v - stroke}
        />
      </g>
    </g>
  </svg>
  <Controls
    gates={cell ? cell.gates : ''}
    {isPlaying}
    {isReady}
    on:control={handleControl}
  />
</div>
