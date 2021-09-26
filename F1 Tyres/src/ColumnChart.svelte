<script>
  import { scaleLinear, scaleBand } from "d3-scale";
  import { max } from "d3-array";

  export let data;
  export let colors;
  export let measure;

  const dimensions = {
    width: 700,
    height: 350,
    margin: {
      top: 10,
      right: 0,
      bottom: 30,
      left: 50,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - (dimensions.margin.left + dimensions.margin.right);
  dimensions.boundedHeight =
    dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.value)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, dimensions.boundedWidth])
    .padding(0.2);
</script>

<svg
  viewBox="0 0 {dimensions.width} {dimensions.height}"
  width={dimensions.width}
  height={dimensions.height}
>
  <g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
    <g fill="currentColor">
      <text
        font-size="18"
        text-anchor="middle"
        transform="translate(-12 {dimensions.boundedHeight / 2}) rotate(-90)"
        >{measure}</text
      >
    </g>
    <g fill="none" stroke="currentColor">
      <path stroke-width="0.5" d="M 0 0 v {dimensions.boundedHeight}" />
      <path d="M 0 {dimensions.boundedHeight} h {dimensions.boundedWidth}" />
    </g>
    {#each data as { key, value }}
      <g transform="translate({xScale(key)} 0)">
        {#if value !== 0}
          <rect
            stroke="currentColor"
            fill={colors[key]}
            width={xScale.bandwidth()}
            y={yScale(value)}
            height={dimensions.boundedHeight - yScale(value)}
          />
          <text
            x={xScale.bandwidth() / 2}
            y={dimensions.boundedHeight - 16}
            text-anchor="middle"
            fontSize="8"
            font-weight="bold">+{value}</text
          >
        {/if}
        <text
          style="text-transform: capitalize;"
          x={xScale.bandwidth() / 2}
          y={dimensions.boundedHeight + 24}
          text-anchor="middle"
          fontSize="10">{key}</text
        >
      </g>
    {/each}
  </g>
</svg>
