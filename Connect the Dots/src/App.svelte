<script>
  import { onMount } from "svelte";

  const d =
    "M 37 25 a 13.5 13.5 0 0 1 26 0 14.5 14.5 0 0 1 20 20 14.5 14.5 0 0 1 -20 20 13.5 13.5 0 0 1 -26 0 14.5 14.5 0 0 1 -20 -20 14.5 14.5 0 0 1 20 -20z";
  const segments = 28;

  let path;

  let points = [];
  let index;

  let svg;
  let w, h;
  let isConnecting;
  let isAllConnected;
  let lines = [];

  onMount(() => {
    const totalLength = path.getTotalLength();
    points = Array(segments)
      .fill()
      .map((_, i, { length }) => {
        const { x, y } = path.getPointAtLength((totalLength / length) * i);
        return { x, y };
      });

    handleSize();
    index = 0;
  });

  const handleSize = () => {
    const { width, height } = svg.getBoundingClientRect();
    w = width;
    h = height;
  };

  const handleStart = () => {
    if (isAllConnected) return;

    const { x: x1, y: y1 } = points[index];

    lines = [
      ...lines,
      {
        x1,
        y1,
        x2: x1,
        y2: y1,
      },
    ];

    isConnecting = true;
  };

  const handleEnd = () => {
    const { x: x2, y: y2 } = points[(index + 1) % points.length];

    lines[lines.length - 1].x2 = x2;
    lines[lines.length - 1].y2 = y2;

    lines = [
      ...lines,
      {
        x1: x2,
        y1: y2,
        x2,
        y2,
      },
    ];

    if (index < points.length - 1) {
      index++;
    } else {
      isConnecting = false;
      isAllConnected = true;
    }
  };

  const handleMove = ({ offsetX: x, offsetY: y }) => {
    if (!isConnecting) return;

    const x2 = (x / w) * 100; // size of the viewBox's width
    const y2 = (y / h) * 100; // size of the viewBox's height

    lines[lines.length - 1].x2 = x2;
    lines[lines.length - 1].y2 = y2;
  };

  const handleOut = () => {
    if (!isConnecting) return;

    if (index < points.length) {
      lines = [...lines.slice(0, -1)];
    }

    isConnecting = false;
  };
</script>

<svelte:window on:resize={handleSize} />

<svg
  class:isAllConnected
  viewBox="0 0 100 100"
  bind:this={svg}
  on:mouseup={handleOut}
  on:mouseleave={handleOut}
  on:mousemove={handleMove}
>
  <g fill="currentColor">
    <circle r="2" cx="38" cy="40" />
    <circle r="2" cx="62" cy="40" />
  </g>
  <g fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M 46 55 a 6 6 0 0 0 8 0" />

    <path d="M 27 77 q -3 3 -3 6 a 3 3 0 0 0 6 0 q 0 -3 -3 -6z" />
    <path d="M 50 82 q -3 3 -3 6 a 3 3 0 0 0 6 0 q 0 -3 -3 -6z" />
    <path d="M 73 77 q -3 3 -3 6 a 3 3 0 0 0 6 0 q 0 -3 -3 -6z" />

    <path
      {d}
      bind:this={path}
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      pathLength="1"
      stroke-dasharray="1"
      stroke-dashoffset="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>

  <g class="dots">
    {#if index !== undefined && !isAllConnected}
      <g
        transform="translate({isConnecting
          ? `${points[(index + 1) % points.length].x} ${
              points[(index + 1) % points.length].y
            }`
          : `${points[index].x} ${points[index].y}`})"
      >
        <circle opacity="0.15" r="3" />
      </g>
    {/if}

    <g fill="currentColor" font-size="4">
      {#each points as { x, y }, i}
        <g transform="translate({x} {y})">
          <circle r="0.75" />
          <text x={x >= 50 ? 1.5 : -5} y={y >= 50 ? 5 : -2}>
            {i}
          </text>
        </g>
      {/each}
    </g>

    <g fill="none" stroke="currentColor" stroke-width="1">
      {#each lines as { x1, y1, x2, y2 }}
        <line {x1} {y1} {x2} {y2} />
      {/each}
    </g>

    <rect width="100" height="100" opacity="0" />

    {#if index !== undefined && !isAllConnected}
      <g transform="translate({points[index].x} {points[index].y})">
        <circle opacity="0" on:mousedown={handleStart} r="3" />
      </g>

      <g
        transform="translate({points[(index + 1) % points.length].x} {points[
          (index + 1) % points.length
        ].y})"
      >
        <circle opacity="0" on:mouseenter={handleEnd} r="3" />
      </g>
    {/if}
  </g>
</svg>

<style>
  :global(body) {
    margin: 0;
    display: grid;
    place-items: center;
    min-height: 100vh;
  }

  svg {
    max-width: 35rem;
    width: 100vmin;
    height: auto;
    display: block;
  }

  .isAllConnected path {
    transition: stroke-dashoffset 3s ease-in-out;
    transition-delay: 0.25s;
    stroke-dashoffset: 0;
  }

  .isAllConnected .dots {
    transition: opacity 0.5s ease-in-out;
    transition-delay: 3.25s;
    opacity: 0;
  }
</style>
