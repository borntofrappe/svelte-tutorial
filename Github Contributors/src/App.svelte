<script>
  import Contributor from './Contributor.svelte';
  import { data } from './data.js';

  const dataContributors = Object.entries(
    data.reduce((acc, curr) => {
      const { name, additions, deletions } = curr;
      if (acc[name]) {
        acc[name].commits += 1;
        acc[name].additions += additions;
        acc[name].deletions += deletions;
      } else {
        acc[name] = {
          commits: 1,
          additions,
          deletions,
        };
      }
      return acc;
    }, {})
  )
    .map(([name, d]) => ({
      name,
      ...d,
    }))
    .sort((a, b) => (a.commits < b.commits ? 1 : -1));
</script>

<svelte:head>
  <title>Github Contributors</title>
</svelte:head>

<svg style="display: none;" viewBox="0 0 100 100">
  <symbol id="profile-pic">
    <circle fill="hsl(0, 0%, 92%)" cx="50" cy="50" r="50" />
    <circle fill="hsl(0, 0%, 72%)" cx="35" cy="38" r="12" />
    <circle fill="hsl(0, 0%, 72%)" cx="65" cy="38" r="12" />
    <path
      stroke="hsl(0, 0%, 72%)"
      stroke-width="10"
      fill="none"
      d="M 38 60 a 12 12 0 0 0 24 0"
    />
  </symbol>
</svg>

<div>
  {#each dataContributors as d, index}
    <Contributor {...d} index={index + 1} />
  {/each}
</div>

<style>
  div {
    max-width: 700px;
    width: 90vw;
    margin: 1rem auto;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, 325px);
    justify-content: center;
  }
</style>
