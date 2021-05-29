<script>
  import Footballbin from './Footballbin.svelte';

  export let data;
</script>

<section>
  <h2>What about goals?</h2>

  <p>
    Understandably, there is a clear and positive relation between the number of
    goals made and the number of matches won.
  </p>

  <Footballbin
    data={data.map(({ team, won, goals }) => ({ team, x: won, y: goals[0] }))}
    x="Won"
    y="GF"
  />

  <p>
    Similarly, there is a positive connection between the number of goals taken
    and the number of matches lost.
  </p>

  <Footballbin
    data={data.map(({ team, lost, goals }) => ({ team, x: lost, y: goals[1] }))}
    x="Lost"
    y="GA"
  />

  <p>
    Goals themselves seem to be negatively correlated, but the relationship is
    less than obvious.
  </p>

  <Footballbin
    data={data.map(({ team, goals }) => ({ team, x: goals[1], y: goals[0] }))}
    x="GA"
    y="GF"
  />
</section>

<style>
  section :global(svg) {
    overflow: visible;
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
