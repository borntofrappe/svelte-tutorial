<script>
  const level = `..wwwww.
	wwweeew.
	wtpceew.
	wwwectw.
	wtwwcew.
	weweteww
	wcemcctw
	weeeteew
	wwwwwwww`;

  const grid = level.split("\n").map((d, row) =>
    d
      .trim()
      .split("")
      .map((value, column) => ({
        value,
        column,
        row,
      }))
  );
  const columns = grid[0].length;
  const rows = grid.length;
</script>

<svg viewBox="0 0 {columns} {rows}">
  <defs>
    <g id="cell-w">
      <g stroke="#493f0e" stroke-width="0.03">
        <rect fill="#9f9758" width="1" height="1" />
        <g fill="none">
          <rect width="0.5" height="0.25" />
          <rect x="0.5" width="0.5" height="0.25" />
          <rect x="0.25" y="0.25" width="0.5" height="0.25" />
          <rect y="0.5" width="0.5" height="0.25" />
          <rect x="0.5" y="0.5" width="0.5" height="0.25" />
          <rect x="0.25" y="0.75" width="0.5" height="0.25" />
        </g>
      </g>
    </g>
    <g id="cell-c">
      <g
        transform="translate(0.1 0.1)"
        fill="#ebb668"
        stroke="#261700"
        stroke-width="0.025"
      >
        <rect width="0.8" height="0.8" />
        <g transform="translate(0.1 0.1)">
          <rect width="0.6" height="0.6" />
          <path
            transform="translate(0.6 0) scale(-1 1)"
            d="M 0.1 0 L 0.6 0.5 0.6 0.6 0.5 0.6 0 0.1 0 0z"
          />
          <path d="M 0.1 0 L 0.6 0.5 0.6 0.6 0.5 0.6 0 0.1 0 0z" />
        </g>
      </g>
    </g>

    <g id="cell-m">
      <g
        transform="translate(0.1 0.1)"
        fill="#d99182"
        stroke="#261700"
        stroke-width="0.025"
      >
        <rect width="0.8" height="0.8" />
        <g transform="translate(0.1 0.1)">
          <rect width="0.6" height="0.6" />
          <path
            transform="translate(0.6 0) scale(-1 1)"
            d="M 0.1 0 L 0.6 0.5 0.6 0.6 0.5 0.6 0 0.1 0 0z"
          />
          <path d="M 0.1 0 L 0.6 0.5 0.6 0.6 0.5 0.6 0 0.1 0 0z" />
        </g>
      </g>
    </g>

    <g id="cell-." />

    <g id="cell-e">
      <g fill="none" stroke="#c8c197" stroke-width="0.025">
        <path d="M 0.1 0.2 h 0.2 m 0.4 0 h 0.2" />
        <path d="M 0.2 0.5 h 0.2 m 0.3 0 h 0.2" />
        <path d="M 0.1 0.8 h 0.2 m 0.4 0 h 0.2" />
      </g>
    </g>

    <g id="cell-t">
      <g transform="translate(0.5 0.5)" fill="#d99182">
        <circle r="0.18" />
      </g>
    </g>

    <g id="cell-p">
      <g transform="translate(0.5 0.5)" stroke="#4e2600" stroke-width="0.03">
        <circle fill="#f0bd7b" r="0.3" />
        <g fill="none">
          <circle r="0.06" cx="0.1" cy="-0.07" />
          <circle r="0.06" cx="-0.1" cy="-0.07" />
          <path
            stroke-linecap="round"
            d="M -0.12 0.1 a 0.15 0.15 0 0 0 0.24 0"
          />
        </g>
      </g>
    </g>
  </defs>

  <rect fill="#d9d0a9" width={columns} height={rows} />

  <g>
    {#each grid.reduce((acc, curr) => [...acc, ...curr], []) as { value, column: x, row: y }}
      <use {x} {y} href="#cell-{value}" />
    {/each}
  </g>
</svg>

<style>
  :global(body) {
    background: #d9d0a9;
  }

  svg {
    display: block;
    max-width: 30rem;
  }
</style>
