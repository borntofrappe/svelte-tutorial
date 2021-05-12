<script>
  import { getContext } from 'svelte';
  import data from './data.js';
  import Contributor from './Contributor.svelte';

  const metric = getContext('metric');
  const metricAccessor = (d) => d[metric];
  const baseUrl = 'https://github.com';

  const contributors = data
    .map(({ total: c, author, weeks }) => {
      const { login: name, avatar: src, path } = author;
      const a = weeks.reduce((acc, curr) => acc + curr.a, 0);
      const d = weeks.reduce((acc, curr) => acc + curr.d, 0);
      const href = `${baseUrl}${path}`;
      return {
        name,
        src,
        href,
        c,
        a,
        d,
        weeks,
      };
    })
    .sort((a, b) => {
      if (metricAccessor(a) === metricAccessor(b)) {
        const breakEvenMetric = metric === 'c' ? 'a' : 'c';
        return a[breakEvenMetric] < b[breakEvenMetric] ? 1 : -1;
      }
      return metricAccessor(a) < metricAccessor(b) ? 1 : -1;
    });

  const upperBound = contributors[0].weeks.reduce(
    (acc, d) => (metricAccessor(d) > acc ? metricAccessor(d) : acc),
    0
  );
</script>

<section>
  {#each contributors as contributor, i}
    <Contributor {...contributor} position={i + 1} {upperBound} />
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    justify-content: center;
  }

  section :global(article) {
    width: 100% !important;
  }
</style>
