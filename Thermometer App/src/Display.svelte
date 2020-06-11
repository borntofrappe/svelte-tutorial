<script>
  export let value;
  export let min;
  export let max;

  const scaleRotation = d3
    .scaleLinear()
    .domain([min, max])
    .range([(-Math.PI + Math.PI / 4) * 180 / Math.PI, (Math.PI - Math.PI / 4) * 180 / Math.PI]);
  
  const arc = d3
    .arc()
    .innerRadius(46)
    .outerRadius(46)
    .startAngle(-Math.PI + Math.PI / 4)
    .endAngle(Math.PI - Math.PI / 4);

  const scaleAngle = d3
    .scaleLinear()
    .domain([min, max])
    .range([-Math.PI + Math.PI / 4, Math.PI - Math.PI / 4])


  const arcValue = d3
    .arc()
    .innerRadius(46)
    .outerRadius(46)
    .startAngle(-Math.PI + Math.PI / 4)
    .endAngle(scaleAngle(value));

  let rotation = scaleRotation(value);
  let d = arcValue();

  $: if(min || max || value) {
    scaleRotation.domain([min, max]);
    rotation = scaleRotation(value);

    scaleAngle.domain([min, max]);
    arcValue.endAngle(scaleAngle(value));
    d = arcValue();
  } 
</script>

<svg viewBox="-50 -50 100 100" width="200" height="200">
<defs>
<linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="-50" x2="50" y1="0" y2="0">
  <stop stop-color="hsl(270, 60%, 55%)" offset="0" />
  <stop stop-color="hsl(340, 48%, 72%)" offset="1" />
</linearGradient>
</defs>
  <text
    fill="url(#gradient)"
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
    text-anchor="middle"
    style="word-spacing: -1px;"
    y="16"
    font-size="8"
    font-weight="600"
    >
    {min} - {max}
  </text>

  <path
    d="{arc()}"
    fill="none"
    stroke="url(#gradient)"
    stroke-width="8"
    stroke-linejoin="round"
    opacity="0.4"
  />
  <path
    {d}
    fill="none"
    stroke="url(#gradient)"
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
