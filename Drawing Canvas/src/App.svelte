<script>
  import Canvas from "./Canvas.svelte";
  import Palette from "./Palette.svelte";

  const colors = ["#d58141", "#d7c44c", "#4fa9cc", "#3f8d27"];
  const background = "#fff";

  let color = colors[0];
  const paletteColor = color;
</script>

<main>
  <Canvas {color} {background} />
  <Palette
    {paletteColor}
    {colors}
    {background}
    on:color={({ detail }) => {
      color = detail.color;
    }}
  />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efefef;
  }

  :global(.visually-hidden:not(:focus):not(:active)) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }

  main {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem 0;
  }

  main :global(canvas) {
    align-self: center;
  }
</style>
