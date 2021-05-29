<script>
  import { scaleLinear, scaleSequential } from 'd3-scale';
  import { interpolateYlGnBu as interpolator } from 'd3-scale-chromatic';
  import { hexbin } from 'd3-hexbin';
  import { max, extent, range } from 'd3-array';

  export let data;
  export let x;
  export let y;

  const dimensions = {
    width: 550,
    height: 240,
    margin: {
      top: 20,
      right: 45,
      bottom: 20,
      left: 20,
    },
    padding: 5,
    highlight: 150,
  };

  dimensions.boundedWidth =
    dimensions.width -
    (dimensions.margin.left +
      dimensions.margin.right +
      dimensions.padding * 2) -
    dimensions.highlight;
  dimensions.boundedHeight =
    dimensions.height -
    (dimensions.margin.top + dimensions.margin.bottom + dimensions.padding * 2);

  const xScale = scaleLinear()
    .domain(extent(data, (d) => d.x))
    .range([0, dimensions.boundedWidth]);
  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.y))
    .range([dimensions.boundedHeight, 0]);

  const xTicks = range(12).map(
    (_, i, { length }) =>
      xScale.domain()[0] +
      ((xScale.domain()[1] - xScale.domain()[0]) * i) / (length - 1)
  );
  const yTicks = range(8).map(
    (_, i, { length }) =>
      yScale.domain()[0] +
      ((yScale.domain()[1] - yScale.domain()[0]) * i) / (length - 1)
  );

  const radii = [10, 20];

  const hexbinGenerator = hexbin()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .radius(radii[1])
    .extent([dimensions.boundedWidth, dimensions.boundedHeight]);

  const hexbinData = hexbinGenerator(data);

  const maxLength = max(hexbinData, ({ length }) => length);

  const colorScale = scaleSequential(interpolator).domain([1, maxLength]);
  const radiusScale = scaleLinear().domain([1, maxLength]).range(radii);

  let highlight = Math.floor(Math.random() * hexbinData.length);
  $: bin = hexbinData[highlight];
</script>

<svg
  viewBox="0 0 {dimensions.width} {dimensions.height}"
  width={dimensions.width}
  height={dimensions.height}
>
  <g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
    <g font-weight="bold">
      <text
        x={dimensions.boundedWidth + dimensions.padding * 2 + 8}
        y={dimensions.boundedHeight + dimensions.padding}>{x}</text
      >
      <text y="-8">{y}</text>
    </g>
    <!-- highlight -->
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      d="M {bin.x + dimensions.padding} {bin.y +
        dimensions.padding} L {dimensions.boundedWidth +
        dimensions.padding * 2 +
        40} 10 h 20"
    />
    <g
      transform="translate({dimensions.boundedWidth +
        dimensions.padding * 2 +
        50} 0)"
    >
      <circle cx="10" cy="10" r="10" fill="url(#p)" />
      <g font-size="14" fill="currentColor" transform="translate(0 40)">
        {#each bin as d, i}
          <g transform="translate(0 {48 * i})">
            <text font-weight="bold">{d.team}</text>
            <text y="24"
              >{y} <tspan dx="3">{d.y}</tspan>, {x}
              <tspan dx="3">{d.x}</tspan></text
            >
          </g>
        {/each}
      </g>
    </g>

    <path
      fill="none"
      stroke="currentColor"
      stroke-width={dimensions.padding * 2}
      stroke-linejoin="round"
      d="M 0 {dimensions.boundedHeight +
        dimensions.padding * 2} V 0 h {dimensions.boundedWidth +
        dimensions.padding * 2} V {dimensions.boundedHeight +
        dimensions.padding * 2}"
    />

    <g transform="translate({dimensions.padding} {dimensions.padding})">
      <g fill="none" stroke="currentColor">
        <g stroke-width="0.5" opacity="0.3">
          {#each xTicks as xTick}
            <g transform="translate({xScale(xTick)} 0)">
              <path
                d="M 0 {-dimensions.padding} V {dimensions.boundedHeight +
                  dimensions.padding}"
              />
            </g>
          {/each}
        </g>
        <g stroke-width="0.5" opacity="0.3">
          {#each yTicks as yTick}
            <g transform="translate(0 {yScale(yTick)})">
              <path
                d="M {-dimensions.padding} 0 H {dimensions.boundedWidth +
                  dimensions.padding}"
              />
            </g>
          {/each}
        </g>
      </g>
      <g>
        {#each hexbinData as { x, y, length }, i}
          <g transform="translate({x} {y})" opacity={i === highlight ? 1 : 0.3}>
            <circle r={radiusScale(length)} fill="url(#p)" />
            <circle
              r={radiusScale(length)}
              on:mouseenter={() => {
                highlight = i;
              }}
              opacity="0"
            />
          </g>
        {/each}
      </g>
    </g>
  </g>
</svg>
