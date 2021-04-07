<script>
  import Header from './Header.svelte';
  import Board from './Board.svelte';
</script>

<Header />
<Board />

<style>
  :global(body) {
    background: hsl(0, 0%, 20%);
    color: hsl(0, 0%, 98%);
    display: grid;
    place-items: center;
    min-height: 100vh;
  }
</style>
