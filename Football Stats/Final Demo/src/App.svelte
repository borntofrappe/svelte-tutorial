<script>
  import data from './data.js';
  import Table from './Table.svelte';
  import Points from './Points.svelte';
</script>

<div>
  <h1>Football Stats</h1>
  <p>
    Let's consider the <a
      href="https://en.wikipedia.org/wiki/2020%E2%80%9321_Premier_League#League_table"
      >league table</a
    >
    for the <time datetime="2020-09-12">2020</time> to
    <time datetime="2021-05-23">2021</time> season of the Premier League competition.
  </p>

  <Table {data} />

  <Points {data} />
</div>

<style>
  div {
    margin: 1rem auto;
    max-width: 700px;
  }
</style>
