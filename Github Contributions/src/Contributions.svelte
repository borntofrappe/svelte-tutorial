<script>
  import data from './data.js';
  import AreaChart from './AreaChart.svelte';
  import { getContext } from 'svelte';
  import { extent } from 'd3-array';
  import { timeFormat } from 'd3-time-format';

  const timeParse = getContext('timeParse');
  const metric = getContext('metric');
  const metricAccessor = (d) => d[metric];

  const dates = extent(data[0].weeks, (d) => d.w).map((d) =>
    timeFormat('%b %d, %Y')(timeParse(d))
  );

  const cumulative = data
    .reduce((acc, { weeks }) => [...acc, ...weeks], [])
    .reduce((acc, d) => {
      const metric = metricAccessor(d);
      const { w: week } = d;
      const index = acc.findIndex((d) => d.week === week);
      if (index !== -1) {
        acc[index].value += metric;
      } else {
        acc.push({
          week,
          value: metric,
        });
      }
      return acc;
    }, []);

  const max = cumulative.reduce(
    (acc, { value }) => (value > acc ? value : acc),
    0
  );

  const fill = '#28a74588';
  const xAccessor = (d) => timeParse(d.week);
  const yAccessor = (d) => d.value;
  const dimensions = {
    width: 800,
    height: 200,
    margin: {
      top: 15,
      right: 15,
      bottom: 20,
      left: 50,
    },
  };
</script>

<header>
  <h1>
    {dates.join(' - ')}
  </h1>
</header>

<main>
  <p>Contributions to master, excluding merge commits and bot accounts</p>
  <AreaChart
    data={cumulative}
    {max}
    {xAccessor}
    {yAccessor}
    {dimensions}
    {fill}
  />
</main>

<style>
  header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    padding: 0.25rem 0;
  }

  header::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    opacity: 0.35;
  }

  main {
    width: 100%;
  }

  main > :global(* + *) {
    margin-top: 0.5rem;
  }

  h1 {
    font-weight: 400;
    font-size: 1.3rem;
  }

  p {
    font-size: 0.9rem;
  }

  main > :global(svg) {
    width: 100%;
    height: auto;
    display: block;
    background: hsl(0, 0%, 97%);
    padding: 0.5rem 0.75rem;
  }
</style>
