<script>
  import { data } from './utils.js';
  import Header from './Header.svelte';
  import LineChart from './LineChart.svelte';
</script>

<div id="root">
  <Header />
  <!-- each line chart component receives through props an array of objects detailing the values and dates -->
  <LineChart title="106th Edition - 2019" data={data[2019]} />
  <LineChart title="105th Edition - 2018" data={data[2018]} />
</div>
