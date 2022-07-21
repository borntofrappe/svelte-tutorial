<script>
  import SVG from './SVG.svelte';
  import Form from './Form.svelte';
  import List from './List.svelte';
  import Visualization from './Visualization.svelte';
</script>

<div class="app">
  <SVG />
  <Form />
  <List />
  <Visualization />
</div>

<style>
  .app {
    max-width: 900px;
    width: 80vw;
    margin: 2rem auto;
  }
</style>
