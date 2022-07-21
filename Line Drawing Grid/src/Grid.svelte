<script>
  export let columns = 28;
  export let rows = 10;
  const cellSize = 20;

  // necessary to have the `<pattern>` with a unique identifier
  const id = Math.random();
  const width = columns * cellSize;
  const height = rows * cellSize;

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
      if (
        (edges[selectedEdge].column !== column ||
          edges[selectedEdge].row !== row) &&
        column >= 0 &&
        column < columns &&
        row >= 0 &&
        row < rows
      ) {
        edges[selectedEdge].column = column;
        edges[selectedEdge].row = row;
      }
    }
  }

  function getPoints(edges) {
    const dc = edges[0].column - edges[1].column;
    const dr = edges[0].row - edges[1].row;
    const d = Math.max(Math.abs(dc), Math.abs(dr));

    if (d > 1) {
      const c = edges[1].column;
      const r = edges[1].row;

      return Array(d - 1)
        .fill()
        .map((p, i) => [
          c + Math.floor((i + 1) * (dc / d)),
          r + Math.floor((i + 1) * (dr / d)),
        ]);
    }
    return [];
  }
  $: points = getPoints(edges);
</script>

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
      id="pattern-grid-{id}"
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
    <rect {width} {height} fill="url(#pattern-grid-{id})" />
  </g>

  <g class="line-points">
    {#each points as point}
      <g transform="translate({point[0] * cellSize} {point[1] * cellSize})">
        <rect
          fill="currentColor"
          stroke="currentColor"
          width={cellSize}
          height={cellSize}
        />
      </g>
    {/each}
  </g>

  <g class="line-edges">
    {#each edges as edge, i}
      <g
        on:mousedown={() => (selectedEdge = i)}
        transform="translate({edge.column * cellSize} {edge.row * cellSize})"
      >
        <rect
          fill="currentColor"
          stroke="currentColor"
          width={cellSize}
          height={cellSize}
        />
        <circle
          fill="#e7a7fc"
          cx={cellSize / 2}
          cy={cellSize / 2}
          r={cellSize / 4}
        />
        <!-- increase the interactable area for the edges -->
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

<style>
  svg {
    display: block;
  }

  svg g.line-edges {
    cursor: move;
  }
</style>
