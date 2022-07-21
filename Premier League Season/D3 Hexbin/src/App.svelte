<script>
  import Scatterplot from './Scatterplot.svelte';
  import Hexbin from './Hexbin.svelte';
  import { range } from 'd3-array';

  function getData() {
    return range(300).map((_) => ({
      x: Math.random() ** 0.75,
      y: Math.random() ** 0.75,
    }));
  }
  const data = getData();
</script>

<Scatterplot {data} />
<Hexbin {data} />

<style>
  :global(svg) {
    display: block;
    width: 100%;
    height: auto;
    max-width: 500px;
    margin: 1rem auto;
  }
</style>
