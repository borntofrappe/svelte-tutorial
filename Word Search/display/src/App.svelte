<script>
  import Canvas from "./Canvas.svelte";
  import SVG from "./SVG.svelte";

  const start = "A".charCodeAt();
  const end = "Z".charCodeAt() + 1;
  const range = end - start;
  const getRandomLetter = () =>
    String.fromCharCode(Math.floor(Math.random() * range) + start);

  const letters = Array(5 ** 2)
    .fill()
    .map((_) => getRandomLetter());
</script>

<h1>Word Search Display</h1>

<h2>canvas</h2>

<Canvas {letters} />

<h2>svg</h2>
<SVG {letters} />

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
