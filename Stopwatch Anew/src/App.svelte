<script>
  import Header from "./Header.svelte";
  import Display from "./Display.svelte";
  import Controls from "./Controls.svelte";
  import Laps from "./Laps.svelte";
</script>

<div>
  <Header />
  <Display />
  <Laps />
  <Controls />
</div>

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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

  div {
    --theme-color: #2283f6;
    color: #191919;
    max-width: 24rem;
    margin: 1rem auto;
    padding: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
</style>
