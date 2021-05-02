<script>
  import { tick, onMount } from 'svelte';

  let columns = 16;
  let rows = 16;
  let cells = [];

  let canvas;
  let href;

  let isFilling = true;
  let isMouseDown = false;

  const cellSize = 10;
  const padding = 20;

  $: width = cellSize * columns;
  $: height = cellSize * rows;

  $: totalWidth = width + padding;
  $: totalHeight = height + padding;

  $: if (columns || rows) {
    cells = [];
  }

  const getDataUrl = (element) => `data:image/svg+xml,${element.outerHTML}`;

  async function handleCanvas(e) {
    const { x, y, width: w, height: h } = canvas.getBoundingClientRect();
    const { clientX, clientY } = e;
    const column = Math.floor((((clientX - x) / w) * width) / cellSize);
    const row = Math.floor((((clientY - y) / h) * height) / cellSize);

    const index = cells.findIndex(
      (cell) => cell.column === column && cell.row === row
    );
    if (isFilling && index === -1) {
      cells = [...cells, { column, row }];
    }
    if (!isFilling && index !== -1) {
      cells = [...cells.slice(0, index), ...cells.slice(index + 1)];
    }

    await tick();
    href = getDataUrl(canvas);
  }

  onMount(() => {
    href = getDataUrl(canvas);
  });
</script>

<div>
  <section>
    <label>
      <input type="checkbox" bind:checked={isFilling} />
      <span>{isFilling ? 'fill' : 'erase'}</span>
    </label>
    <label>
      <span>Columns</span>
      <input type="number" bind:value={columns} />
      <input type="range" min="8" max="64" bind:value={columns} />
    </label>

    <label>
      <span>Rows</span>
      <input type="number" bind:value={rows} />
      <input type="range" min="8" max="64" bind:value={rows} />
    </label>
  </section>

  <svg viewBox="-0.5 -0.5 {totalWidth + 1} {totalHeight + 1}">
    <defs>
      <pattern
        patternUnits="userSpaceOnUse"
        id="pattern"
        width={cellSize}
        height={cellSize}
        viewBox="0 0 10 10"
      >
        <rect
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        />
      </pattern>
    </defs>
    <g>
      <g
        fill="currentColor"
        font-size={cellSize / 2}
        text-anchor="middle"
        dominant-baseline="middle"
        transform="translate({padding / 2} {padding / 2})"
      >
        <text transform="rotate(45)" y="-3">columns</text>
        <text transform="rotate(45)" y="3.5">rows</text>
      </g>

      <g fill="none" stroke="currentColor">
        <rect width={totalWidth} height={padding} />
        <rect height={totalHeight} width={padding} />
        <path d="M 0 0 l {padding} {padding}" />
        <g>
          <g transform="translate({padding} 0)">
            {#each Array(columns) as c, i}
              <g transform="translate({i * cellSize} 0)">
                <path d="M 0 0 v {padding}" />
                <text
                  font-size={cellSize / 2}
                  fill="currentColor"
                  stroke="none"
                  text-anchor="middle"
                  x={cellSize / 2}
                  y={padding - 2}>{i}</text
                >
              </g>
            {/each}
          </g>

          <g transform="translate(0 {padding})">
            {#each Array(rows) as r, i}
              <g transform="translate(0 {i * cellSize})">
                <path d="M 0 0 h {padding}" />
                <text
                  font-size={cellSize / 2}
                  fill="currentColor"
                  stroke="none"
                  text-anchor="end"
                  x={padding - 2}
                  y={cellSize - 2}>{i}</text
                >
              </g>
            {/each}
          </g>
        </g>
      </g>
    </g>
    <g transform="translate({padding} {padding})">
      <rect {width} {height} fill="url(#pattern)" opacity="0.2" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        bind:this={canvas}
        viewBox="0 0 {width} {height}"
        {width}
        {height}
        on:click={handleCanvas}
        on:mousedown={() => {
          isMouseDown = true;
        }}
        on:mouseup={() => {
          isMouseDown = false;
        }}
        on:mouseleave={() => {
          isMouseDown = false;
        }}
        on:mousemove={(e) => {
          if (isMouseDown) {
            handleCanvas(e);
          }
        }}
      >
        <g fill="currentColor" stroke="currentColor">
          {#each cells as { column, row }}
            <rect
              x={column * cellSize}
              y={row * cellSize}
              width={cellSize}
              height={cellSize}
            />
          {/each}
        </g>
        <rect {width} {height} opacity="0" />
      </svg>
    </g>
  </svg>

  <!-- doesn't work in REPL	 -->
  <a {href} download="canvas.svg">Download</a>
</div>

<style>
  div {
    width: 95vw;
    max-width: 800px;
    margin: 1rem auto;
  }

  div > * + * {
    margin-top: 1em;
  }

  div > svg {
    width: 100%;
    height: auto;
    color: hsl(0, 0%, 22%);
  }

  label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.5rem 0;
  }

  label > * + * {
    margin-left: 0.5rem;
  }

  label input[type='range'] {
    flex-grow: 1;
  }

  a {
    color: inherit;
  }
</style>
