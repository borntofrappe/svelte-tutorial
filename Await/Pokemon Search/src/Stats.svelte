<script>
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { interpolateHcl } from 'd3-interpolate';

  export let stats = [];
  const maxBaseStat = 255;

  const dimensions = {
    width: 100,
    height: 60,
    margin: {
      top: 2,
      right: 10,
      bottom: 2,
      left: 35,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - (dimensions.margin.left + dimensions.margin.right);
  dimensions.boundedHeight =
    dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

  const xScale = scaleLinear()
    .domain([0, maxBaseStat])
    .range([0, dimensions.boundedWidth]);

  const yScale = scaleBand()
    .domain(stats.map(({ stat }) => stat.name))
    .range([0, dimensions.boundedHeight])
    .padding(0.5);

  const colorScale = scaleLinear()
    .domain([0, maxBaseStat])
    .range(['#fa8f02', '#009e35'])
    .interpolate(interpolateHcl);
</script>

<svg
  viewBox="0 0 {dimensions.width} {dimensions.height}"
  width={dimensions.width}
  height={dimensions.height}
>
  <g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
    {#each stats as { stat, base_stat }}
      <g transform="translate(0 {yScale(stat.name)})">
        <g
          font-size="4"
          transform="translate(0 {yScale.bandwidth() / 2})"
          dominant-baseline="middle"
        >
          <text x={-dimensions.margin.left}>{stat.name}</text>
          <text font-weight="bold" x={dimensions.boundedWidth + 2}
            >{base_stat}</text
          >
        </g>
        <rect
          width={xScale(base_stat)}
          height={yScale.bandwidth()}
          rx={yScale.bandwidth() / 2}
          fill={colorScale(base_stat)}
        />
      </g>
    {/each}
  </g>
</svg>

<style>
  text {
    text-transform: uppercase;
  }
</style>
