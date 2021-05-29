<script>
  import { scaleSequential } from 'd3-scale';
  import { interpolateWarm as interpolator } from 'd3-scale-chromatic';
  import { hierarchy, pack } from 'd3-hierarchy';
  import { max } from 'd3-array';

  export let data;

  const dimensions = {
    width: 400,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - (dimensions.margin.left + dimensions.margin.right);
  dimensions.boundedHeight =
    dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

  const root = {
    children: data,
  };

  const hierarchyData = hierarchy(root).sum(({ value }) => value);
  const packGenerator = pack().size([
    dimensions.boundedWidth,
    dimensions.boundedHeight,
  ]);
  const packData = packGenerator(hierarchyData);

  const colorScale = scaleSequential(interpolator).domain([
    0,
    max(data, ({ value }) => value),
  ]);
</script>

<svg
  viewBox="0 0 {dimensions.width} {dimensions.height}"
  width={dimensions.width}
  height={dimensions.height}
>
  <g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
    {#each packData.leaves() as { x, y, r, data }}
      <g transform="translate({x} {y})">
        <circle {r} fill={colorScale(data.value)} stroke-width="2" />
        <text y="1" dominant-baseline="middle" text-anchor="middle"
          >{data.value}</text
        >
      </g>
    {/each}
  </g>
</svg>
