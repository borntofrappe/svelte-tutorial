<script>
  import WordSearch from "./WordSearch.svelte";
</script>

<WordSearch />

<style>
  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(body) {
    color: hsl(206, 53%, 94%);
    background: hsl(222, 22%, 9%);
    display: grid;
    min-height: 100vh;
    place-items: center;
  }
</style>
