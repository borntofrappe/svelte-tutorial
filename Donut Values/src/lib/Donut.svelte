<script>
  export let value = 57;
  export let average = 83;

  const pathLength = 100;
  $: offset = pathLength - value;
  $: angle = (360 * average) / pathLength;
</script>

<svg viewBox="-70 -70 140 140">
  <defs>
    <path id="tp" d="M 0 -60 a 60 60 0 0 1 0 120 60 60 0 0 1 0 -120" />
    <path
      {pathLength}
      fill="none"
      stroke-width="10"
      stroke-linecap="round"
      id="p"
      d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100"
    />

    <mask id="m">
      <rect fill="white" x="-70" y="-70" width="140" height="140" />

      <g transform="rotate({angle})">
        <g transform="translate(0 -55)">
          <path d="M -5 0 h 10 l -5 5z" />
        </g>
      </g>
    </mask>
  </defs>
  <g mask="url(#m)">
    <use href="#p" stroke="hsl(0, 0%, 90%)" />
    <use
      href="#p"
      stroke="currentColor"
      stroke-dasharray={pathLength}
      stroke-dashoffset={offset}
    />
  </g>
  <g
    text-anchor="middle"
    dominant-baseline="central"
    font-size="20"
    font-weight="700"
    fill="currentColor"
  >
    <text>
      {Math.floor(pathLength - offset)}%
    </text>
  </g>

  <g font-size="10" style:text-transform="uppercase" fill="hsl(0, 0%, 60%)">
    <g transform="rotate({angle})">
      <text>
        <textPath href="#tp">
          {average}% Average
        </textPath>
      </text>
    </g>
  </g>
</svg>

<style>
  svg {
    color: hsl(125, 50%, 60%);
    display: block;
    max-width: 20rem;
  }
</style>
