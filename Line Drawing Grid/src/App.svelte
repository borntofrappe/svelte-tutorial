<script>
  const width = 600;
  const height = 200;
  const cellSize = 20;

  const points = [
    [2, 7],
    [12, 3],
  ];
</script>

<main>
  <h1>Line drawing grid</h1>
  <svg viewBox="0 0 {width} {height}" {width} {height}>
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

    <g class="grid-background">
      <rect {width} {height} fill="hsl(28, 91%, 89%)" />
      <rect {width} {height} fill="url(#pattern-grid)" />
    </g>

    <g class="grid-points">
      {#each points as point}
        <g transform="translate({point[0] * cellSize} {point[1] * cellSize})">
          <rect
            fill="hsl(23, 85%, 72%)"
            stroke="hsl(10, 55%, 20%)"
            stroke-width="1"
            width={cellSize}
            height={cellSize}
          />
          <circle
            fill="hsl(12, 92%, 40%)"
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={cellSize / 4}
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
    width: 100%;
    height: auto;
    border: 1px solid currentColor;
  }

  main svg g.grid-points {
    cursor: move;
  }
</style>
