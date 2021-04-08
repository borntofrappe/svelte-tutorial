<script>
  import Bicycle from './Bicycle.svelte';
</script>

<header>
  <h1>Tour de France <Bicycle /></h1>
  <h2>Google Trends for the cycling competition</h2>
</header>

<style>
  header {
    line-height: 1.25;
    border-bottom: 1px solid hsl(0, 0%, 80%);
  }
  header > * + * {
    margin-top: 0.5rem;
  }
  h1 {
    font-size: 2.25rem;
  }
  h2 {
    font-weight: 400;
    font-size: 1rem;
  }
</style>
