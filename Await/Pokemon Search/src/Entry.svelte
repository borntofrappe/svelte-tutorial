<script>
  import { fade } from 'svelte/transition';

  import Stats from './Stats.svelte';
  import Favorite from './Favorite.svelte';

  export let name;
  export let sprites;
  export let types;
  export let stats;
  export let isFavorite;
</script>

<article in:fade>
  <Favorite on:favorite {isFavorite} />
  <h2>
    {name}
  </h2>

  <figure>
    <img width="96" height="96" alt={name} src={sprites.front_default} />
  </figure>

  <h3 class="visually-hidden">Types</h3>
  <ul>
    {#each types as { type }}
      <li
        style="background: var(--bg-{type.name}, hsl(0, 0%, 12%)); color: hsl(0, 0%, 96%); text-shadow: 0 0 2px hsl(0, 0% 12%);"
      >
        {type.name}
      </li>
    {/each}
  </ul>

  <h3 class="visually-hidden">Stats</h3>

  <table class="visually-hidden">
    <thead>
      <tr>
        <th>Name</th>
        <th>Base Value</th>
      </tr>
    </thead>
    <tbody>
      {#each stats as { base_stat, stat }}
        <tr>
          <td>{stat.name}</td>
          <td>{base_stat}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <Stats {stats} />
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  article :global(label) {
    align-self: flex-end;
  }

  article > * + * {
    margin-top: 0.5rem;
  }

  h2 {
    text-transform: capitalize;
    font-size: 1.45rem;
  }

  img {
    width: 100%;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul li {
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  article :global(svg) {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
