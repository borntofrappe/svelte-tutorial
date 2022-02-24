<script>
  import { Grid } from "./utils.js";

  const width = 600;
  const height = 400;

  const columns = 10;
  const rows = 6;

  const words = ["apple", "orange", "peach", "grapes"].map((word) =>
    word.toUpperCase()
  );
  const range = ["A", "Z"];

  const cellWidth = width / columns;
  const cellHeight = height / rows;

  const grid = new Grid({ rows, columns });
  const letters = grid
    .fill({
      words: [...words],
      range,
    })
    .map((letter, i) => {
      const x = (i % columns) * cellWidth;
      const y = Math.floor(i / columns) * cellHeight;
      return {
        x,
        y,
        letter,
      };
    });

  let svg, line, isDragging;
  let match;
  let matches = [];

  const handleOnset = () => {
    line = null;
    match = null;
    isDragging = true;
  };

  const handleReset = () => {
    line = null;
    match = null;
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

  $: if (line) {
    const { c1, r1, c2, r2 } = line;

    const rs = Math.abs(r2 - r1);
    const cs = Math.abs(c2 - c1);

    if (rs === cs || rs === 0 || cs === 0) {
      const n = Math.max(rs, cs);

      let rd = 0;
      if (r2 - r1 > 0) rd = 1;
      else if (r2 - r1 < 0) rd = -1;

      let cd = 0;
      if (c2 - c1 > 0) cd = 1;
      else if (c2 - c1 < 0) cd = -1;

      match = Array(n + 1)
        .fill()
        .map((_, i) => {
          return letters[(r1 + i * rd) * columns + (c1 + i * cd)].letter;
        })
        .reduce((acc, curr) => `${acc}${curr}`, "");

      if (!matches.includes(match) && words.includes(match)) {
        matches = [...matches, match];
      }
    }
  }
</script>

<h2>Words:</h2>

<ul>
  {#each words as word}
    <li>
      {#if matches.includes(word)}
        <del>{word}</del>
      {:else}
        {word}
      {/if}
    </li>
  {/each}
</ul>

<h2>Search: {match || ""}</h2>

<svg bind:this={svg} {width} {height} viewBox="0 0 {width} {height}">
  <g transform="translate({cellWidth / 2} {cellHeight / 2})">
    {#each letters as { x, y, letter }}
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
