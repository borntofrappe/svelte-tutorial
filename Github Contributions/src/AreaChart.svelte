<script>
  import { scaleLinear, scaleTime } from 'd3-scale';
  import { max, extent } from 'd3-array';
  import { area, curveBumpX as curve } from 'd3-shape';
  import { timeFormat } from 'd3-time-format';

  const formatDate = timeFormat('%b %d');

  export let data;
  export let xAccessor;
  export let yAccessor;
  export let fill = 'currentColor';
  export let dimensions = {
    width: 400,
    height: 180,
    margin: {
      top: 10,
      right: 15,
      bottom: 20,
      left: 50,
    },
  };
  export let upperBound = max(data, yAccessor);

  dimensions.boundedWidth =
    dimensions.width - (dimensions.margin.left + dimensions.margin.right);
  dimensions.boundedHeight =
    dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

  const xScale = scaleTime()
    .domain(extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = scaleLinear()
    .domain([0, upperBound])
    .range([dimensions.boundedHeight, 0]);

  const areaGenerator = area()
    .x((d) => xScale(xAccessor(d)))
    .y0(dimensions.boundedHeight)
    .y1((d) => yScale(yAccessor(d)))
    .curve(curve);

  const yTicks = yScale.ticks(4);
  const xTicks = xScale.ticks(5);
</script>

<svg
  viewBox="{-dimensions.margin.left} {-dimensions.margin
    .top} {dimensions.width} {dimensions.height}"
  width={dimensions.width}
  height={dimensions.height}
>
  <g fill="currentColor">
    <g text-anchor="end" dominant-baseline="middle" font-size="12">
      {#each yTicks as tick}
        <g transform="translate(-5 {yScale(tick)})">
          <text>{tick}</text>
          <path
            d="M 0 0 h {dimensions.boundedWidth}"
            fill="none"
            stroke="currentColor"
            stroke-width="0.2"
            opacity="0.7"
          />
        </g>
      {/each}
    </g>
    <g
      text-anchor="middle"
      font-size="12"
      transform="translate(0 {dimensions.boundedHeight + 16})"
    >
      {#each xTicks as tick}
        <g transform="translate({xScale(tick)} 0)">
          <text>{formatDate(tick)}</text>
        </g>
      {/each}
    </g>
  </g>
  <g>
    <path d={areaGenerator(data)} {fill} stroke="none" />
  </g>
</svg>
