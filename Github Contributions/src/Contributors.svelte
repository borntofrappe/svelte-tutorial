<script>
  import dataset from './dataset.js';
  import { metric } from './stores.js';
  import { getContext } from 'svelte';
  const timeParse = getContext('timeParse');

  import Contributor from './Contributor.svelte';

  const baseUrl = 'https://github.com';

  let contributors = dataset
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
      const m = $metric;
      if (a[m] === b[m]) {
        const breakEvenMetric = m === 'c' ? 'a' : 'c';
        return a[breakEvenMetric] < b[breakEvenMetric] ? 1 : -1;
      }
      return a[m] < b[m] ? 1 : -1;
    });

  $: upperBound = contributors
    .map(({ weeks }) =>
      weeks.reduce(
        (acc, curr) => (curr[$metric] > acc ? curr[$metric] : acc),
        0
      )
    )
    .reduce((acc, curr) => (curr > acc ? curr : acc), 0);

  $: if ($metric) {
    contributors = [...contributors].sort((a, b) => {
      const m = $metric;
      if (a[m] === b[m]) {
        const breakEvenMetric = m === 'c' ? 'a' : 'c';
        return a[breakEvenMetric] < b[breakEvenMetric] ? 1 : -1;
      }
      return a[m] < b[m] ? 1 : -1;
    });
  }

  const xAccessor = (d) => timeParse(d.w);
  const yAccessor = (d) => d[$metric];
  const fill = '#fb8532';
</script>

<section>
  {#each contributors as contributor, i}
    <Contributor
      {...contributor}
      position={i + 1}
      {upperBound}
      {xAccessor}
      {yAccessor}
      {fill}
    />
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    justify-content: center;
  }

  section :global(article) {
    width: 100% !important;
  }
</style>
