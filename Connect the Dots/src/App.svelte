<script>
  import { onMount } from "svelte";

  export let d = "M 50 50 l 20 20 0 -40 -20 -20 -20 20 0 40z";

  let path;
  let points = [];

  let svg;
  let w, h;
  let isConnecting;
  const lines = [];

  onMount(() => {
    const totalLength = path.getTotalLength();
    points = Array(14)
      .fill()
      .map((_, i, { length }) => {
        const { x, y } = path.getPointAtLength((totalLength / length) * i);
        return { x, y };
      });

    handleSize();
  });

  const handleSize = () => {
    const { width, height } = svg.getBoundingClientRect();
    w = width;
    h = height;
  };

  const handleStart = ({ offsetX: x, offsetY: y }) => {
    const x1 = (x / w) * 100;
    const y1 = (y / h) * 100;
    isConnecting = true;
    lines.push({ x1, y1, x2: x1, y2: y1 });
  };

  const handleEnd = () => {
    isConnecting = false;
  };

  const handleMove = ({ offsetX: x, offsetY: y }) => {
    if (!isConnecting) return;

    const x2 = (x / w) * 100;
    const y2 = (y / h) * 100;

    lines[lines.length - 1].x2 = x2;
    lines[lines.length - 1].y2 = y2;
  };
</script>

<svelte:window on:resize={handleSize} />

<svg
  bind:this={svg}
  viewBox="0 0 100 100"
  on:mousedown={handleStart}
  on:mouseup={handleEnd}
  on:mouseleave={handleEnd}
  on:mousemove={handleMove}
>
  <defs>
    <path bind:this={path} {d} />
  </defs>

  <g fill="currentColor" font-size="5">
    {#each points as { x, y }, i}
      <g transform="translate({x} {y})">
        <circle r="1" />
        <text x="1" y="-1">
          {i}
        </text>
      </g>
    {/each}
  </g>
  <rect width="100" height="100" opacity="0" />

  <g fill="none" stroke="currentColor" stroke-width="1">
    {#each lines as { x1, y1, x2, y2 }}
      <line {x1} {y1} {x2} {y2} />
    {/each}
  </g>
</svg>
