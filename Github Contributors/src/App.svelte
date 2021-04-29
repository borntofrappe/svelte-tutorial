<script>
  import Contributor from './Contributor.svelte';

  const data = [
    {
      name: 'Rachel',
      commits: 232,
      additions: 2100,
      deletions: 1925,
    },
    {
      name: 'John',
      commits: 198,
      additions: 1225,
      deletions: 1176,
    },
    {
      name: 'Eliza',
      commits: 14,
      additions: 178,
      deletions: 152,
    },
    {
      name: 'Timothy',
      commits: 8,
      additions: 98,
      deletions: 77,
    },
  ];
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
  {#each data as d, index}
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
