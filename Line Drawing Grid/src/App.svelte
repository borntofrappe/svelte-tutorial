<script>
  import Grid from './Grid.svelte';
</script>

<main>
  <h1>Line drawing grid</h1>
  <h2>Default</h2>
  <Grid />
  <hr />
  <h2>Custom (10 columns and rows)</h2>
  <Grid columns={10} rows={10} />
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 1.25rem 2rem 3rem;
  }

  :global(main > * + *) {
    margin-top: 1.5rem;
  }

  main h1 {
    text-transform: capitalize;
    font-size: 2.25rem;
    font-weight: normal;
  }

  main h2 {
    font-size: 1.5rem;
    font-weight: normal;
  }

  :global(main svg) {
    display: block;
    width: 100%;
    height: auto;
    box-shadow: 0 0 0 1px currentColor;
  }
</style>
