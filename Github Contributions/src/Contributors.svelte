<script>
  import data from './data.js';
  import Contributor from './Contributor.svelte';
  const baseUrl = 'https://github.com';

  const contributors = data
    .map(({ total: commits, author, weeks }) => {
      const { login: name, avatar: src, path } = author;
      const additions = weeks.reduce((acc, { a }) => acc + a, 0);
      const deletions = weeks.reduce((acc, { d }) => acc + d, 0);
      const href = `${baseUrl}${path}`;
      return {
        name,
        src,
        href,
        commits,
        additions,
        deletions,
        weeks,
      };
    })
    .sort((a, b) => {
      if (a.commits === b.commits) return a.additions < b.additions ? 1 : -1;
      return a.commits < b.commits ? 1 : -1;
    });

  const max = contributors[0].weeks.reduce(
    (acc, { c }) => (c > acc ? c : acc),
    0
  );
</script>

<section>
  {#each contributors as contributor, i}
    <Contributor {...contributor} position={i + 1} {max} />
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    gap: 1rem;
    justify-content: center;
  }
  section :global(article) {
    width: 100% !important;
  }
</style>
