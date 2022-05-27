<script>
  import { onMount } from "svelte";

  export let letters = ["a", "b", "c", "d"];

  const size = 400;
  const dimensions = Math.floor(letters.length ** 0.5);
  const cellSize = size / dimensions;

  const grid = letters.map((letter, i) => {
    return {
      letter,
      x: cellSize * (i % dimensions),
      y: cellSize * Math.floor(i / dimensions),
    };
  });

  let canvas;

  onMount(() => {
    const context = canvas.getContext("2d");

    context.translate(cellSize / 2, cellSize / 2);

    context.font = `${cellSize / 2}px monospace`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (const { letter, x, y } of grid) {
      context.fillText(letter, x, y);
    }
  });
</script>

<canvas bind:this={canvas} width={size} height={size} />
