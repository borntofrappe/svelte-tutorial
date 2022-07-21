<script>
  import dataset from './dataset.js';
  import { metric } from './stores.js';
  import AreaChart from './AreaChart.svelte';
  import { getContext } from 'svelte';
  import { extent } from 'd3-array';
  import { timeFormat } from 'd3-time-format';

  const timeParse = getContext('timeParse');

  const dates = extent(dataset[0].weeks, (d) => d.w).map((d) =>
    timeFormat('%b %d, %Y')(timeParse(d))
  );

  let data = dataset
    .reduce((acc, { weeks }) => [...acc, ...weeks], [])
    .reduce((acc, d) => {
      const m = d[$metric];
      const { w: week } = d;
      const index = acc.findIndex((d) => d.week === week);
      if (index !== -1) {
        acc[index].value += m;
      } else {
        acc.push({
          week,
          value: m,
        });
      }
      return acc;
    }, []);

  $: upperBound = data.reduce(
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

  const metrics = [
    {
      option: 'commits',
      value: 'c',
    },
    {
      option: 'additions',
      value: 'a',
    },
    {
      option: 'deletions',
      value: 'd',
    },
  ];

  let selection;
  $: if (selection) {
    metric.set(selection);

    data = dataset
      .reduce((acc, { weeks }) => [...acc, ...weeks], [])
      .reduce((acc, d) => {
        const m = d[$metric];
        const { w: week } = d;
        const index = acc.findIndex((d) => d.week === week);
        if (index !== -1) {
          acc[index].value += m;
        } else {
          acc.push({
            week,
            value: m,
          });
        }
        return acc;
      }, []);
  }
</script>

<header>
  <h1>
    {dates.join(' - ')}
  </h1>
  <select bind:value={selection}>
    {#each metrics as { option, value }}
      <option {value}>Contributions: {option}</option>
    {/each}
  </select>
</header>

<main>
  <p>Contributions to master, excluding merge commits and bot accounts</p>
  <AreaChart {data} {upperBound} {xAccessor} {yAccessor} {dimensions} {fill} />
</main>

<style>
  header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    padding-bottom: 0.5rem;
  }

  header::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%;
    height: 0.5px;
    background: currentColor;
    opacity: 0.25;
  }

  header h1 {
    flex-grow: 1;
  }

  select {
    font-size: 0.8rem;
    background: hsl(0, 0%, 96%);
    border: 0.1px solid hsl(0, 0%, 82%);
    box-shadow: 0 1px 5px -4px currentColor;
    border-radius: 0.25rem;
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
