<script>
  import Canvas from "./Canvas.svelte";
  import SVG from "./SVG.svelte";
</script>

<h1>Word Search Pins</h1>

<h2>canvas</h2>

<Canvas />

<h2>svg</h2>

<SVG />

<style>
  :global(canvas),
  :global(svg) {
    outline: 1px solid;
    display: block;
  }

  h2::before {
    content: "with <";
  }
  h2::after {
    content: ">";
  }
</style>
