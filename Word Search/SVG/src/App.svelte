<script>
  import { getRandomLetter } from "./utils.js";

  const width = 500;
  const height = 400;

  const columns = 10;
  const rows = 8;

  const cellWidth = width / columns;
  const cellHeight = height / rows;

  const grid = Array(columns * rows)
    .fill()
    .map((_, i) => {
      const x = (i % columns) * cellWidth;
      const y = Math.floor(i / columns) * cellHeight;
      const letter = getRandomLetter();

      return {
        x,
        y,
        letter,
      };
    });

  let svg, line, isDragging;

  const handleOnset = () => {
    line = null;
    isDragging = true;
  };

  const handleReset = () => {
    line = null;
    isDragging = false;
  };

  const handleDrag = (e) => {
    if (!isDragging) return;

    const { clientX: x, clientY: y } = e;
    const { left, top, width: w, height: h } = svg.getBoundingClientRect();

    const c = Math.floor((((x - left) / w) * width) / cellWidth);
    const r = Math.floor((((y - top) / h) * height) / cellHeight);

    if (c < 0 || c >= columns || r < 0 || r >= rows) return;

    if (!line) {
      line = { c1: c, r1: r, c2: c, r2: r };
    } else {
      const { c2, r2 } = line;
      if (c2 !== c) line.c2 = c;
      if (r2 !== r) line.r2 = r;
    }
  };
</script>

<h1>SVG</h1>

<svg bind:this={svg} {width} {height} viewBox="0 0 {width} {height}">
  <g transform="translate({cellWidth / 2} {cellHeight / 2})">
    {#each grid as { x, y, letter }}
      <g transform="translate({x} {y})">
        <text
          font-size={Math.min(cellWidth, cellHeight) / 2}
          text-anchor="middle"
          dominant-baseline="middle"
        >
          {letter}
        </text>
      </g>
    {/each}
    {#if line}
      <path
        opacity="0.2"
        d="M {cellWidth * line.c1} {cellHeight * line.r1} {cellWidth *
          line.c2} {cellHeight * line.r2}"
        fill="none"
        stroke="currentColor"
        stroke-width={Math.min(cellWidth, cellHeight) / 1.5}
        stroke-linecap="round"
      />
    {/if}
  </g>

  <rect
    on:mousedown={handleOnset}
    on:mouseup={handleReset}
    on:mousemove={handleDrag}
    {width}
    {height}
    opacity="0"
  />
</svg>

<style>
  svg {
    outline: 1px solid;
    max-width: 36rem;
    width: 100%;
    height: auto;
    display: block;
    user-select: none;
  }
</style>
