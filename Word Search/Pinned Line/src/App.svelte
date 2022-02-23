<script>
  import { onMount } from "svelte";

  const dimensions = 8;
  const size = 500;

  let background;
  let foreground;

  let line = null;

  const cellSize = size / dimensions;

  const grid = Array(dimensions ** 2)
    .fill()
    .map((_, i) => {
      const row = Math.floor(i / dimensions);
      const column = i % dimensions;

      return {
        x: column * cellSize,
        y: row * cellSize,
      };
    });

  onMount(() => {
    const context = background.getContext("2d");

    context.fillStyle = "#000";
    context.translate(cellSize / 2, cellSize / 2);

    for (const { x, y } of grid) {
      context.beginPath();
      context.arc(x, y, 2, 0, Math.PI * 2);
      context.fill();
    }
  });

  $: if (line && foreground) {
    const { c1, r1, c2, r2 } = line;
    const context = foreground.getContext("2d");
    context.clearRect(0, 0, size, size);

    context.save();
    context.translate(cellSize / 2, cellSize / 2);

    context.strokeStyle = "hsla(50, 80%, 60%, 0.5)";
    context.lineWidth = cellSize / 2;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(c1 * cellSize, r1 * cellSize);
    context.lineTo(c2 * cellSize, r2 * cellSize);
    context.stroke();

    context.restore();
  }

  let isDrawing = false;

  const handleOnset = () => {
    isDrawing = true;
    line = null;
  };

  const handleReset = () => {
    isDrawing = false;
    line = null;

    const context = foreground.getContext("2d");
    context.clearRect(0, 0, size, size);
  };

  const handleMousemove = (e) => {
    if (!isDrawing) return;

    const { offsetX: x, offsetY: y } = e;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);

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

<div>
  <canvas bind:this={background} width={size} height={size} />

  <canvas
    on:mousedown={handleOnset}
    on:mousemove={handleMousemove}
    on:mouseup={handleReset}
    bind:this={foreground}
    width={size}
    height={size}
  />
</div>

<style>
  div {
    position: relative;
    display: inline-block;
  }
  canvas {
    outline: 1px solid;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
