<script>
  import { scaleLinear } from "d3-scale";
  import { max } from "d3-array";

  export let data;
  export let colors;

  const lengthScale = scaleLinear()
    .domain([0, max(data, (d) => d.value)])
    .range([50, 300]);
</script>

{#each data as { key, value }}
  <svg viewBox="0 0 450 200" width="450" height="200">
    <g transform="translate(100 100)">
      <g transform="translate(100 0)">
        <g fill="currentColor" dominant-baseline="middle">
          <text
            style="text-transform: uppercase;"
            y="-35"
            font-weight="bold"
            font-size="16">{key}</text
          >
          <text
            ><tspan font-weight="bold" font-size="38">+{value}</tspan>
            <tspan font-size="14" font-weight="initial">(s/lap)</tspan></text
          >
        </g>
      </g>

      <g transform="translate(0 80)">
        <g fill="none" stroke="currentColor" stroke-linecap="round">
          <path stroke-width="12" d="M 0 -6 h {lengthScale(value)}" />
          <path stroke-width="12" d="M 0 -24 h {lengthScale(value) * 0.9}" />
        </g>
      </g>

      <circle r="80" fill="hsl(0, 0%, 20%)" />
      <circle r="35" fill="hsl(0, 0%, 14%)" />
      <g fill="none" stroke="hsl(0, 0%, 84%)" stroke-width="5">
        {#each Array(6) as _, i}
          <path transform="rotate({(360 / 6) * i})" d="M 0 0 v -35" />
        {/each}
      </g>
      <circle r="35" fill="none" stroke="hsl(0, 0%, 84%)" stroke-width="12" />
      <circle r="10" fill="hsl(0, 0%, 84%)" />
      <circle
        r="60"
        stroke={colors[key]}
        stroke-width="12"
        stroke-linecap="round"
        stroke-dasharray="0.25 0.25"
        pathLength="1"
        fill="none"
      />
    </g>
  </svg>
{/each}

<style>
  svg {
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>
