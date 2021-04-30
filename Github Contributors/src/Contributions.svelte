<script>
  export let data;
  const dates = d3.extent(data, (d) => new Date(d.date));
  const formatDate = d3.timeFormat('%b %-d, %Y');

  const dimensions = {
    width: 1000,
    height: 300,
    margin: {
      top: 10,
      right: 10,
      bottom: 30,
      left: 40,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - (dimensions.margin.left + dimensions.margin.right);
  dimensions.boundedHeight =
    dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);
</script>

<main>
  <h1>{dates.map((date) => formatDate(date)).join(' - ')}</h1>
  <p>Contributions to master, excluding merge commits and bot accounts</p>

  <svg
    width={dimensions.width}
    height={dimensions.height}
    viewBox={[
      -dimensions.margin.left,
      -dimensions.margin.top,
      dimensions.width,
      dimensions.height,
    ]}
  >
    <g transform="translate({dimensions.margin.left} {dimensions.margin.top})">
      <!--  -->
    </g>
  </svg>
</main>
