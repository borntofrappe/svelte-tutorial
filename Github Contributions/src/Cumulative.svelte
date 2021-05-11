<script>
  import data from './data.js';
  import AreaChart from './AreaChart.svelte';
  import { extent } from 'd3-array';
  import { getContext } from 'svelte';

  const timeFormat = getContext('datesFormat');
  const timeParse = getContext('timeParse');

  const dates = extent(data[0].weeks, (d) => d.w).map((d) =>
    timeFormat(timeParse(d))
  );

  const cumulative = data
    .reduce((acc, { weeks }) => [...acc, ...weeks], [])
    .reduce((acc, { w: week, c }) => {
      const index = acc.findIndex((d) => d.week === week);
      if (index !== -1) {
        acc[index].value += c;
      } else {
        acc.push({
          week,
          value: c,
        });
      }
      return acc;
    }, []);

  const max = cumulative.reduce(
    (acc, { value }) => (value > acc ? value : acc),
    0
  );

  const fill = '#28a74588';
  const xAccessor = (d) => d.week;
  const yAccessor = (d) => d.value;
  const dimensions = {
    width: 800,
    height: 200,
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 30,
    },
  };
</script>

<main>
  <h1>
    {dates.join(' - ')}
  </h1>
  <hr />
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

  hr {
    background: currentColor;
    opacity: 0.5;
  }

  p {
    font-size: 0.9rem;
  }

  main > :global(svg) {
    width: 100%;
    height: auto;
    display: block;
    background: hsl(0, 0%, 96%);
    padding: 0.5rem 0.75rem;
  }
</style>
