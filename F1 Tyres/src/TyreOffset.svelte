<script>
  import { scaleLinear } from "d3-scale";
  import { max } from "d3-array";

  export let data;
  export let colors;

  const distanceScale = scaleLinear()
    .domain([0, max(data, (d) => d.value)])
    .range([0, 300]);
</script>

<svg viewBox="0 0 500 260" width="500" height="260">
  <defs>
    <path id="path-wheel" d="M 0 -80 a 80 80 0 0 1 0 160 80 80 0 0 1 0 -160" />
  </defs>
  <g transform="translate(100 100)">
    {#each [...data].reverse() as { key, value }}
      <g transform="translate({distanceScale(value)} 0)">
        <g transform="translate(0 130)">
          {#if value !== 0}
            <g text-anchor="middle" fill="currentColor">
              <text>
                <tspan font-weight="bold" font-size="32">+{value}</tspan>
                <tspan text-anchor="middle" font-size="14" x="0" y="20"
                  >(s/lap)</tspan
                >
              </text>
            </g>
          {:else}
            <g transform="translate(0 -14)">
              <g fill="none" stroke="currentColor" stroke-width="4">
                <circle r="14" />
                <path d="M -5 -20 h 10" />
                <path transform="rotate(-45)" d="M -3 -20 h 6" />
                <path
                  stroke="none"
                  fill="currentColor"
                  d="M -4 1.5 a 4 4 0 0 0 8 0 q 0 -3 -4 -10 q -4 7 -4 10"
                />
              </g>
            </g>
          {/if}
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

        <g>
          <text
            fill="currentColor"
            font-weight="bold"
            font-size="15"
            dy="-5"
            style="text-transform: uppercase; letter-spacing: -1px;"
          >
            <textPath href="#path-wheel" text-anchor="end" startOffset="98%">
              {key}
            </textPath>
          </text>
        </g>
      </g>
    {/each}
  </g>
</svg>

<style>
  svg {
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>
