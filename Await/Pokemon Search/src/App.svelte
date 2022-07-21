<script>
  import Entry from './Entry.svelte';
  const pokemon = 898;
  let number = Math.floor(Math.random() * pokemon + 1);
  let fetchedNumber;

  const favorites = {};

  async function fetchData(n = 1) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
      const data = await res.json();
      fetchedNumber = number;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleSubmit() {
    if (fetchedNumber === number) return;
    promise = fetchData(number);
  }

  function handleFavorite({ detail }) {
    favorites[fetchedNumber] = detail;
  }

  let promise;
</script>

<div>
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      <span class="visually-hidden">Search by number</span>
      <input
        required
        type="number"
        bind:value={number}
        min="1"
        max={pokemon}
        placeholder="Search by number"
      />
    </label>

    <button>
      <span class="visually-hidden">Search</span>
      <svg width="1em" height="1em" viewBox="-50 -50 100 100">
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="14"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="-8" cy="-8" r="30" />
          <path d="M 15 15 l 20 20" />
        </g>
      </svg>
    </button>
  </form>

  {#if promise}
    {#await promise then { name, sprites, types, stats }}
      <Entry
        on:favorite={handleFavorite}
        {...{
          name,
          sprites,
          types,
          stats,
          isFavorite: favorites[fetchedNumber],
        }}
      />
    {:catch error}
      <p>
        {error}
      </p>
    {/await}
  {/if}
</div>

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(body) {
    padding: 0;
    --bg-normal: #a69974;
    --bg-fire: #f26130;
    --bg-water: #2b9fd9;
    --bg-electric: #f5be18;
    --bg-grass: #55be4c;
    --bg-ice: #66cccc;
    --bg-fighting: #b34a36;
    --bg-poison: #bf43aa;
    --bg-rock: #bfa156;
    --bg-flying: #7e87e6;
    --bg-psychic: #fe4c78;
    --bg-bug: #a0cc47;
    --bg-ground: #a68542;
    --bg-ghost: #6652cc;
    --bg-dragon: #5050e6;
    --bg-dark: #020708;
    --bg-steel: #a3aacc;
    --bg-fairy: #e67ed4;
  }

  div > :global(* + *) {
    margin-top: 1rem;
  }

  /* remove default margin included by the REPL	 */
  :global(button),
  :global(input) {
    margin: 0;
  }

  div {
    width: 90vw;
    max-width: 300px;
    margin: 1rem auto;
  }

  div > :global(*) {
    padding: 0.5rem 1rem;
  }

  form {
    display: flex;
    background: hsl(0, 0%, 96%);
    flex-direction: row-reverse;
    align-items: center;
    border-radius: 5rem;
    gap: 0.25rem;
  }

  form label {
    flex-grow: 1;
  }

  label input {
    text-align: right;
    width: 100%;
    border: none;
    background: none;
  }

  button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: none;
    border: none;
    color: inherit;
  }

  button:focus {
    box-shadow: 0 0 0 2px currentColor;
  }

  button svg {
    display: block;
    width: 100%;
    height: auto;
  }
  :global(.visually-hidden) {
    display: none;
  }
</style>
