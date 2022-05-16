<script>
  import Header from "./Header.svelte";
  import Display from "./Display.svelte";
  import Laps from "./Laps.svelte";
  import Controls from "./Controls.svelte";
</script>

<div>
  <Header />
  <Display />
  <Laps />
  <Controls />
</div>

<style>
  div {
    max-width: 24rem;
    margin: 1rem auto;
  }

  div > :global(* + *) {
    margin-top: 1em;
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
</style>
