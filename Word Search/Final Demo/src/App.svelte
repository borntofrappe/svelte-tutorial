<script>
  import { Grid } from "./utils.js";

  const width = 600;
  const height = 400;

  const columns = 12;
  const rows = 6;

  const words = [
    "Beetroot",
    "Cabbage",
    "Kale",
    "Leeks",
    "Onions",
    "Parsnips",
    "Squash",
  ].map((word) => word.toUpperCase());
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

  let lines = [];
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
        lines = [
          ...lines,
          {
            c1,
            r1,
            c2,
            r2,
          },
        ];
      }
    }
  }
</script>

<svelte:head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");
  </style>
</svelte:head>

<div>
  <header>
    <h1>Word search</h1>
    <p>
      Read carefully. There are definitely {words.length} words in the following
      puzzle.
    </p>
  </header>

  <main>
    <h2>
      <mark>{match || ""}</mark>
    </h2>

    <svg bind:this={svg} {width} {height} viewBox="0 0 {width} {height}">
      <g transform="translate({cellWidth / 2} {cellHeight / 2})">
        {#each lines as { c1, r1, c2, r2 }}
          <path
            d="M {cellWidth * c1} {cellHeight * r1} {cellWidth *
              c2} {cellHeight * r2}"
            fill="none"
            stroke="hsla(213, 93%, 58%, 0.4)"
            stroke-width={Math.min(cellWidth, cellHeight) / 1.5}
            stroke-linecap="round"
          />
        {/each}
        {#if line}
          <path
            d="M {cellWidth * line.c1} {cellHeight * line.r1} {cellWidth *
              line.c2} {cellHeight * line.r2}"
            fill="none"
            stroke="hsl(211, 82%, 38%)"
            stroke-width={Math.min(cellWidth, cellHeight) / 1.5}
            stroke-linecap="round"
          />
        {/if}
        <g
          fill="currentColor"
          text-anchor="middle"
          dominant-baseline="middle"
          font-size={Math.min(cellWidth, cellHeight) / 2}
        >
          {#each letters as { x, y, letter }}
            <g transform="translate({x} {y})">
              <text>
                {letter}
              </text>
            </g>
          {/each}
        </g>
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
  </main>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(body) {
    min-height: 100vh;
    background: hsl(222, 22%, 9%);
    font-family: "Jost", sans-serif;
  }

  div {
    max-width: 56rem;
    margin: 1rem auto;
    padding: 0 1rem;
  }

  div > * {
    color: hsl(206, 53%, 94%);
    background: hsl(224, 21%, 14%);
  }

  header {
    padding: 1rem;
    text-align: center;
  }

  header > * + * {
    margin-top: 0.5em;
  }

  header h1 {
    font-size: 2.25rem;
    text-transform: uppercase;
  }

  header p {
    font-size: 1.1rem;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main > * {
    padding: 1rem;
  }

  main ul {
    align-self: stretch;
    background: hsla(213, 93%, 58%, 0.4);
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }

  main ul li::marker {
    content: "";
  }

  main svg {
    display: block;
    max-width: 34rem;
    width: 100%;
    height: auto;
    user-select: none;
  }

  main mark {
    letter-spacing: 0.1rem;
    font-weight: 700;
    padding: 0.2rem 1.25rem;
    background: hsla(213, 93%, 58%, 0.4);
    color: inherit;
  }
</style>
