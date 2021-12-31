<script>
  // date the game
  // https://www.lemonde.fr/les-decodeurs/article/2021/12/29/covid-19-confinements-et-perception-du-temps-saurez-vous-dater-ces-evenements-qui-ont-marque-nos-vies-depuis-2020_6107625_4355770.html
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

  import GameReveal from "./GameReveal.svelte";
</script>

<div>
  <header>
    <h1>Guess When</h1>
    <p>
      Nintendo released several games in 2021. Can you guess when some of them
      where published?
    </p>

    <p>Pick a date and find how close you got.</p>
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
    max-width: 42rem;
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
