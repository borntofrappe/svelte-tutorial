<script>
  const width = 700;
  const height = 250;
  const cellSize = 25;
  const columns = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);

  let edges = [];
  do {
    edges = [
      {
        column: Math.floor(Math.random() * columns),
        row: Math.floor(Math.random() * rows),
      },
      {
        column: Math.floor(Math.random() * columns),
        row: Math.floor(Math.random() * rows),
      },
    ];
  } while (edges[0].column == edges[1].column && edges[0].row == edges[1].row);

  let svg;
  let selectedEdge = null;
  function handleMouseMove(e) {
    if (svg && selectedEdge !== null) {
      const { x, y, width } = svg.getBoundingClientRect();
      const cellSize = Math.floor(width / columns);
      const column = Math.floor((e.clientX - x) / cellSize);
      const row = Math.floor((e.clientY - y) / cellSize);
      edges[selectedEdge].column = Math.max(0, Math.min(column, columns - 1));
      edges[selectedEdge].row = Math.max(0, Math.min(row, rows - 1));
    }
  }
</script>

<main>
  <h1>Line drawing grid</h1>
  <svg
    bind:this={svg}
    on:mouseup={() => (selectedEdge = null)}
    on:mousemove={handleMouseMove}
    viewBox="0 0 {width} {height}"
    {width}
    {height}
  >
    <defs>
      <pattern
        id="pattern-grid"
        patternUnits="userSpaceOnUse"
        width={cellSize}
        height={cellSize}
        viewBox="0 0 10 10"
      >
        <rect
          fill="none"
          stroke="currentColor"
          stroke-width="0.1"
          width="10"
          height="10"
        />
      </pattern>
    </defs>

    <g class="grid">
      <rect {width} {height} fill="#f7f7f7" />
      <rect {width} {height} fill="url(#pattern-grid)" />
    </g>

    <g class="line-edges">
      {#each edges as edge, i}
        <g
          on:mousedown={() => (selectedEdge = i)}
          transform="translate({edge.column * cellSize} {edge.row * cellSize})"
        >
          <rect
            fill="#5926a1"
            stroke="currentColor"
            stroke-width="1"
            width={cellSize}
            height={cellSize}
          />
          <circle
            fill="#f161d1"
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={cellSize / 4}
          />
          <!-- increase the interactable area for the edge -->
          <circle
            opacity="0"
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={cellSize * 1.25}
          />
        </g>
      {/each}
    </g>
  </svg>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1.25rem 2rem 3rem;
  }

  main > * + * {
    margin-top: 1.25rem;
  }

  main h1 {
    text-transform: capitalize;
    font-size: 2.25rem;
    font-weight: normal;
  }

  main svg {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid currentColor;
  }

  main svg g.line-edges {
    cursor: move;
  }
</style>
