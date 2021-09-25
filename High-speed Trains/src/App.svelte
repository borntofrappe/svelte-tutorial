<script>
  import data from "./data.js";
  import ColumnChart from "./ColumnChart.svelte";
  import SliceChart from "./SliceChart.svelte";

  const dataBordeaux = data.find(
    ({ connection }) => connection === "Bordeaux"
  ).times;

  const dataRennes = data.find(
    ({ connection }) => connection === "Rennes"
  ).times;
</script>

<main>
  <h1>High-speed Trains</h1>
  <p>
    Over sixty years, the diffusion of high-speed trains dramatically improved
    travel time between Paris and other populous cities.
  </p>

  <ColumnChart data={dataBordeaux}>
    <span slot="heading">
      Paris-Bordeaux by train: a route which on average takes three hours less
      than it did sixty years ago.
    </span>
    <span slot="brief">
      According to the <abbr title="National Company of French Railways"
        >SNCF</abbr
      >, the quickest time in 1957 was four hours fifty-nine minutes, against
      two hours with the high-speed train.
    </span>
  </ColumnChart>

  <ColumnChart data={dataRennes}>
    <span slot="heading">
      Paris-Rennes by train: a route three times quicker that sixty years ago.
    </span>
    <span slot="brief">
      According to the <abbr title="National Company of French Railways"
        >SNCF</abbr
      >, the quickest time in 1957 was three hours fifty-seven minutes, against
      one hour twenty-five with the high-speed train.
    </span>
  </ColumnChart>

  <SliceChart />

  <p>
    Project inspired by <a
      href="https://www.lemonde.fr/les-decodeurs/visuel/2017/07/01/comment-le-tgv-a-retreci-la-france_5154203_4355770.html"
      >an insightful visualization</a
    >
    from <a href="https://www.lemonde.fr">lemonde.fr</a>, to practice with
    Svelte and the D3 library.
  </p>
</main>

<style>
  :global(body) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background: hsl(0, 0%, 95%);
  }

  main {
    max-width: 42rem;
    width: 90vw;
    margin: 1rem auto;
  }

  main > :global(* + *) {
    margin-top: 1rem;
  }

  main :global(article) {
    padding: 0.75rem 0.5rem;
    border: 1px solid hsla(0, 0%, 0%, 0.1);
    border-top: 4px solid hsl(0, 0%, 0%);
  }

  main :global(article > h2) {
    font-size: 1rem;
  }

  main :global(article > p:last-of-type) {
    font-size: 0.8rem;
    text-align: right;
  }
</style>
