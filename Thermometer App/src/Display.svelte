<script>
  export let value;
  export let min;
  export let max;

  let minAngle = -Math.PI + Math.PI / 4;
  let maxAngle = Math.PI - Math.PI / 4;

  // scale to map the value to the rotation matching the arc
  // * 180 / Math.PI to convert radians to degrees
  const scaleRotation = d3
    .scaleLinear()
    .domain([min, max])
    .range([(minAngle * 180) / Math.PI, (maxAngle * 180) / Math.PI]);

  // scale to map the value to the endAngle of the opaque arc
  const scaleAngle = d3
    .scaleLinear()
    .domain([min, max])
    .range([minAngle, maxAngle]);

  // default arc
  const arc = d3
    .arc()
    .innerRadius(46)
    .outerRadius(46)
    .startAngle(minAngle)
    .endAngle(maxAngle);

  // opaque arc
  const arcValue = d3
    .arc()
    .innerRadius(46)
    .outerRadius(46)
    .startAngle(minAngle)
    .endAngle(scaleAngle(value));

  // update the necessary values whenever the input variables change
  let rotation = scaleRotation(value);
  let d = arcValue();

  $: if (min || max || value) {
    scaleRotation.domain([min, max]);
    rotation = scaleRotation(value);

    scaleAngle.domain([min, max]);
    arcValue.endAngle(scaleAngle(value));
    d = arcValue();
  }
</script>

<svg viewBox="-50 -50 100 100" width="200" height="200">
  <defs>
    <!-- userSpaceOnUse to have the gradient relative to the wrapping SVG -->
    <linearGradient
      id="gradient-highlight"
      gradientUnits="userSpaceOnUse"
      x1="-50"
      x2="50"
      y1="0"
      y2="0"
    >
      <stop stop-color="hsl(270, 60%, 55%)" offset="0" />
      <stop stop-color="hsl(340, 48%, 72%)" offset="1" />
    </linearGradient>
  </defs>

  <text
    fill="url(#gradient-highlight)"
    text-anchor="middle"
    y="4"
    style="word-spacing: -1px; letter-spacing: 0px;"
    font-size="18"
    font-weight="700"
  >
    {value}°
  </text>

  <text
    fill="currentColor"
    style="word-spacing: -1px;"
    y="16"
    font-size="8"
    font-weight="600"
  >
    <tspan x="-2" text-anchor="end">{min}</tspan>
    <tspan x="2" text-anchor="start">{max}</tspan>
  </text>

  <path
    d={arc()}
    fill="none"
    stroke="url(#gradient-highlight)"
    stroke-width="8"
    stroke-linejoin="round"
    opacity="0.4"
  />
  <path
    {d}
    fill="none"
    stroke="url(#gradient-highlight)"
    stroke-width="8"
    stroke-linejoin="round"
  />

  <circle r="34" fill="none" stroke="currentColor" stroke-width="4" />
  <g transform="rotate({rotation})">
    <path
      d="M -6 -34 q 4 -10 6 -10 2 0 6 10"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="6"
    />
  </g>
</svg>
