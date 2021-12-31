<script>
  import GameReveal from "./GameReveal.svelte";
  import data from "./data.js";

  let indexes = Array(data.length)
    .fill()
    .map((_, i) => i);

  const games = Array(4)
    .fill()
    .map(() => {
      const i = Math.floor(Math.random() * indexes.length);
      const index = indexes[i];
      indexes = [...indexes.slice(0, i), ...indexes.slice(i + 1)];
      return data[index];
    });
</script>

<div>
  <header>
    <h1>Guess When</h1>
    <p>
      Nintendo released several games in 2021. Can you guess when some of them
      where published?
    </p>

    <p>Pick a date and find how close you can get to the real launch.</p>
  </header>

  <main>
    {#each games as game}
      <GameReveal {game} />
    {/each}
  </main>
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(h1),
  :global(h2) {
    font-family: "Georgia", serif;
  }

  div {
    max-width: 46rem;
    margin: 1rem auto;
  }

  div > * + * {
    margin-top: 1.5em;
  }

  header > * + * {
    margin-top: 0.5em;
  }

  main > :global(* + *) {
    margin-top: 1em;
  }
</style>
