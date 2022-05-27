<script>
  import { onMount } from "svelte";

  const dimensions = 5;

  let svg;
  let w, h;

  onMount(() => {
    const { width, height } = svg.getBoundingClientRect();
    w = width;
    h = height;
  });

  let line = null;

  const grid = Array(dimensions ** 2)
    .fill()
    .map((_, i) => {
      return {
        c: i % dimensions,
        r: Math.floor(i / dimensions),
      };
    });

  let hasSelected = false;

  const handleStart = () => {
    hasSelected = true;
    line = null;
  };

  const handleEnd = () => {
    hasSelected = false;
    line = null;
  };

  const handleIng = (e) => {
    if (!hasSelected) return;

    const { offsetX: x, offsetY: y } = e;
    const c = Math.floor((x / w) * dimensions);
    const r = Math.floor((y / h) * dimensions);

    if (c < 0 || c >= dimensions || r < 0 || r >= dimensions) return;

    if (!line) {
      line = { c1: c, r1: r, c2: c, r2: r };
    } else {
      const { c2, r2 } = line;
      if (c2 !== c) line.c2 = c;
      if (r2 !== r) line.r2 = r;
    }
  };
</script>

<svg
  bind:this={svg}
  on:mousedown={handleStart}
  on:mouseleave={handleEnd}
  on:mouseup={handleEnd}
  on:mousemove={handleIng}
  viewBox="-0.5 -0.5 {dimensions} {dimensions}"
>
  <g>
    {#each grid as { c: cx, r: cy }}
      <circle {cx} {cy} r="0.05" />
    {/each}
  </g>
  {#if line}
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="0.5"
      opacity="0.1"
      stroke-linecap="round"
    >
      <path d="M {line.c1} {line.r1} {line.c2} {line.r2}" />
    </g>
  {/if}
</svg>
