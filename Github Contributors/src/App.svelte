<script>
  import { data } from './data.js';
  import Contributions from './Contributions.svelte';
  // import Contributors from './Contributors.svelte';

  const dataContributions = Object.entries(
    data.reduce((acc, curr) => {
      const { date, additions, deletions } = curr;
      if (acc[date]) {
        acc[date].commits += 1;
        acc[date].additions += additions;
        acc[date].deletions += deletions;
      } else {
        acc[date] = {
          commits: 1,
          additions,
          deletions,
        };
      }
      return acc;
    }, {})
  ).map(([date, d]) => ({
    date,
    ...d,
  }));
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
  <Contributions data={dataContributions} />
  <!-- <Contributors /> -->
</div>

<style>
  div {
    max-width: 700px;
    width: 90vw;
    margin: 1rem auto;
  }
</style>
