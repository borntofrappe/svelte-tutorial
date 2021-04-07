<script>
  import { items } from './stores.js';

  const categories = 5;
  $: dataset = $items;
  $: sortedDataset = [...dataset.sort((a, b) => b.value - a.value)];
  $: data =
    sortedDataset.length > categories - 1
      ? [
          ...sortedDataset.slice(0, categories - 1),
          {
            name: 'Other',
            value: sortedDataset
              .slice(categories - 1)
              .reduce((acc, curr) => acc + curr.value, 0),
            color: 'hsl(0, 0%, 38%)',
          },
        ]
      : [...sortedDataset];

  // define the variables and functions used in the visualization
  const width = 400;
  const height = 400;

  const rowChartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
  };

  // scales for the lollipop chart
  // horizontally consider the values
  $: xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) * 1.25])
    .range([0, width])
    .nice();

  // vertically consider one band for each item
  $: yScale = d3.scaleBand().domain(d3.range(data.length)).range([0, height]);

  const pieChartMargin = 90;

  // pie function, based on the individual values of the input array
  $: pie = d3
    .pie()
    .value((d) => d.value)
    .sort(null);

  $: pieData = pie([...data]);

  // arc function, describing a hollow pie, a donut chart
  const arc = d3
    .arc()
    .padAngle(0.05)
    .innerRadius(width / 3)
    .outerRadius(width / 2);

  const arcLabels = d3
    .arc()
    .innerRadius(width / 2 + pieChartMargin / 2)
    .outerRadius(width / 2 + pieChartMargin / 2);
</script>

{#if data.length > 0}
  <section>
    <!-- in the heading include a span element with an icon visually connected to the section -->
    <h2>
      <span>
        <svg viewBox="0 0 100 100" width="40" height="40">
          <use href="#highlight" />
        </svg>
      </span>
      Highlight items
    </h2>

    <!-- include the visualizations here -->
    <div>
      <svg
        viewbox="0 0 {width +
          (rowChartMargin.left + rowChartMargin.right)} {height +
          (rowChartMargin.top + rowChartMargin.bottom)}"
        {width}
        {height}
      >
        <g transform="translate({rowChartMargin.left} {rowChartMargin.top})">
          {#each data as d, index}
            <g
              transform="translate(0 {yScale(index) + yScale.bandwidth() / 2})"
            >
              <path
                d="M 0 0 h {xScale(d.value)}"
                fill="none"
                stroke={d.color}
                stroke-linecap="round"
                stroke-width="4"
              />
              <g transform="translate({xScale(d.value)} 0)">
                <circle cx="0" cy="0" r="8" fill={d.color} />
                <text
                  x="25"
                  y="0"
                  dominant-baseline="middle"
                  fill="hsl(240, 25%, 95%)"
                  font-size={width / 22}>{d.name}</text
                >
              </g>
            </g>
          {/each}
        </g>
      </svg>
      <svg
        viewbox="0 0 {width + (pieChartMargin + pieChartMargin)} {height +
          (pieChartMargin + pieChartMargin)}"
        {width}
        {height}
      >
        <g transform="translate({pieChartMargin} {pieChartMargin})">
          <g transform="translate({width / 2} {height / 2})">
            {#each pieData as d}
              <path d={arc(d)} fill={d.data.color} />
              <text
                transform="translate({arcLabels.centroid(
                  d
                )[0]} {arcLabels.centroid(d)[1]})"
                font-size="18"
                fill="currentColor"
                text-anchor="middle"
                dominant-baseline="middle"
                style="text-transform: capitalize;">{d.data.name}</text
              >
            {/each}
            <text
              x="0"
              y="0"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="hsl(240, 40%, 95%)"
            >
              <tspan x="0" font-size="68">
                {data.reduce((acc, curr) => acc + curr.value, 0)}
              </tspan>
              <tspan x="0" dy="58" font-size="24">Items</tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  </section>
{/if}

<style>
  /* display the visualization in a wrapping row */
  div {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
