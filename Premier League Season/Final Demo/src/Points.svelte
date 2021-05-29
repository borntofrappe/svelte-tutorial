<script>
  import { hierarchy, pack } from 'd3-hierarchy';

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
    highlight: 170,
  };

  dimensions.boundedWidth =
    dimensions.width -
    (dimensions.margin.left + dimensions.margin.right) -
    dimensions.highlight;
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

  let highlight = Math.floor(Math.random() * data.length);
  $: leaf = packData.leaves()[highlight];
  $: stats = {
    points: leaf.data.points,
    won: leaf.data.won,
    drawn: leaf.data.drawn,
    lost: leaf.data.lost,
  };

  const { length: teams } = data;
  const points = data.reduce((acc, curr) => acc + curr.points, 0);
</script>

<section>
  <h2>How many points?</h2>

  <p>
    {teams} teams scored a grand total of {points} points.
  </p>

  <svg
    viewBox="0 0 {dimensions.width} {dimensions.height}"
    width={dimensions.width}
    height={dimensions.height}
  >
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
            <text font-size="12" font-weight="bold"
              >{highlight + 1}. {leaf.data.team}</text
            >
            <g font-size="11" transform="translate(0 24)">
              {#each Object.entries(stats) as [key, value], i}
                <text style="text-transform: capitalize" y={23 * i}
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
          <g
            transform="translate({x} {y})"
            opacity={i === highlight ? 1 : 0.25}
          >
            <circle {r} fill="url(#p)" />
            <circle {r} opacity="0" on:mouseenter={() => (highlight = i)} />
          </g>
        {/each}
      </g>
    </g>
  </svg>
</section>

<style>
  svg {
    /* thank the Wolverhampton Wanderers for this */
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
</style>
