<script>
  import { tweened } from "svelte/motion";

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

  const cells = grid.reduce((acc, curr) => [...acc, ...curr], []);

  const crates = cells.filter(({ value }) => value === "c" || value === "m");

  const targets = cells.filter(({ value }) => value === "t" || value === "m");

  const { column: pc, row: pr } = cells.find(({ value }) => value === "p");
  const player = tweened({
    column: pc,
    row: pr,
  });

  const dirs = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0],
  };

  let isMoving = false;
  const updatePlayer = async (dir) => {
    if (isMoving) return;

    const [dc, dr] = dirs[dir];
    const { column: pc, row: pr } = $player;
    const column = pc + dc;
    const row = pr + dr;

    if (grid[row][column].value === "w") return;

    isMoving = true;

    await player.set({
      column,
      row,
    });

    isMoving = false;
  };
</script>

<div>
  <button
    on:click={() => {
      updatePlayer("left");
    }}>left</button
  >
  <button
    on:click={() => {
      updatePlayer("up");
    }}>up</button
  >
  <button
    on:click={() => {
      updatePlayer("right");
    }}>right</button
  >
  <button
    on:click={() => {
      updatePlayer("down");
    }}>down</button
  >
</div>

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

    <g id="cell-crate">
      <g transform="translate(0.1 0.1)" stroke="#261700" stroke-width="0.025">
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

    <g id="cell-player">
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

  <g>
    {#each crates as { column, row }}
      <g transform="translate({column} {row})">
        <use
          fill={targets.some(
            ({ column: tc, row: tr }) => tc === column && tr === row
          )
            ? "#d99182"
            : "#ebb668"}
          href="#cell-crate"
        />
      </g>
    {/each}
  </g>

  <g transform="translate({$player.column} {$player.row})">
    <use href="#cell-player" />
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
