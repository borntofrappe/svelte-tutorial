<script>
  import { onMount } from "svelte";

  const dimensions = 10;
  const size = 400;

  let canvas;

  const cellSize = size / dimensions;
  const fontSize = cellSize / 2;

  const start = "A".charCodeAt();
  const end = "Z".charCodeAt() + 1;

  const grid = Array(dimensions ** 2)
    .fill()
    .map((_, i) => {
      const row = Math.floor(i / dimensions);
      const column = i % dimensions;

      const letter = String.fromCharCode(
        Math.floor(Math.random() * (end - start)) + start
      );

      return {
        letter,
        row,
        column,
        x: column * cellSize,
        y: row * cellSize,
      };
    });

  onMount(() => {
    const context = canvas.getContext("2d");

    context.fillStyle = "#333";
    context.translate(cellSize / 2, cellSize / 2);

    context.font = `${fontSize}px monospace`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (const { x, y, letter } of grid) {
      context.fillText(letter, x, y);
    }
  });
</script>

<h1>Canvas</h1>

<canvas bind:this={canvas} width={size} height={size} />

<style>
  canvas {
    outline: 1px solid;
  }
</style>
