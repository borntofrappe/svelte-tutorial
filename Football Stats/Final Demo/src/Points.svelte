<script>
  import { scaleSequential } from 'd3-scale';
  import { interpolateWarm as interpolator } from 'd3-scale-chromatic';
  import { hierarchy, pack } from 'd3-hierarchy';
  import { extent } from 'd3-array';

  export let data;

  const dimensions = {
    width: 500,
    height: 300,
    margin: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15,
    },
    highlight: {
      width: 170,
    },
  };

  dimensions.boundedWidth =
    dimensions.width -
    (dimensions.margin.left + dimensions.margin.right) -
    dimensions.highlight.width;
  dimensions.boundedHeight =
    dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

  const root = {
    children: data,
  };

  const hierarchyData = hierarchy(root).sum(({ points }) => points);
  const packGenerator = pack()
    .padding(5)
    .size([dimensions.boundedWidth, dimensions.boundedHeight]);
  const packData = packGenerator(hierarchyData);

  const colorScale = scaleSequential(interpolator).domain(
    extent(data, ({ points }) => points)
  );

  let highlight = Math.floor(Math.random() * data.length);
  $: leaf = packData.leaves()[highlight];
  $: stats = {
    points: leaf.data.points,
    won: leaf.data.won,
    drawn: leaf.data.drawn,
    lost: leaf.data.lost,
  };
</script>

<h2>How many points?</h2>

<p>
  {data.length} teams scored a grand total of {data.reduce(
    (acc, curr) => acc + curr.points,
    0
  )} points.
</p>

<svg
  viewBox="0 0 {dimensions.width} {dimensions.height}"
  width={dimensions.width}
  height={dimensions.height}
>
  <defs>
    <clipPath id="c">
      <circle r="50" />
    </clipPath>
    <path
      id="h"
      d="M -8.5 -14.5 h 17 l 7 14.5 -7 14.5 h -17 l -7 -14.5 z"
      fill="currentColor"
    />
    <pattern id="p" viewBox="-50 -50 100 100" width="1" height="1">
      <g clip-path="url(#c)">
        <circle
          r="49.5"
          fill="hsl(0, 0%, 100%)"
          stroke="currentColor"
          stroke-width="1"
        />
        <use href="#h" />
        {#each Array(6) as _, i}
          <path
            transform="rotate({60 * i})"
            d="M 0 0 h 50"
            fill="none"
            stroke="currentColor"
          />
          <path
            transform="rotate({60 * i}) translate(50 0) rotate(120)"
            d="M 0 0 h 50"
            fill="none"
            stroke="currentColor"
          />
          <use transform="rotate({60 * i}) translate(50 0)" href="#h" />
        {/each}
      </g>
    </pattern>
  </defs>
  <g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
    <!-- highlight -->
    <g>
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M {dimensions.boundedWidth} 10 h -15 L {leaf.x} {leaf.y}"
      />
      <g transform="translate({dimensions.boundedWidth} 0)">
        <circle cx="10" cy="10" r="10" fill="url(#p)" />
        <g transform="translate(0 32)" dominant-baseline="hanging">
          <text font-size="14" font-weight="bold"
            >{highlight + 1}. {leaf.data.team}</text
          >
          <g font-size="12" transform="translate(0 8)">
            {#each Object.entries(stats) as [key, value], i}
              <text style="text-transform: capitalize" y={24 * (i + 1)}
                >{key}: <tspan font-weight="bold">{value}</tspan></text
              >
            {/each}
          </g>
        </g>
      </g>
    </g>
    <!-- viz -->
    <g>
      {#each packData.leaves() as { x, y, r, data }, i}
        <g transform="translate({x} {y})" opacity={i === highlight ? 1 : 0.25}>
          <circle {r} fill="url(#p)" />
          <circle {r} opacity="0" on:mouseenter={() => (highlight = i)} />
        </g>
      {/each}
    </g>
  </g>
</svg>

<style>
  svg {
    /* thank the Wolverhampton Wanderers for this */
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
</style>
