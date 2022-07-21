<script>
  import { scaleBand } from "d3-scale";

  export let name;
  export let region;
  export let country;
  export let milk;
  export let certification;
  export let certification_date;
  export let beginning;
  export let end;

  const width = 200;
  const height = 10;
  const margin = 1;

  const months = Array(12)
    .fill()
    .map((_, i) => i);
  const labels = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const scaleMonths = scaleBand()
    .domain(months)
    .range([0, width])
    .padding(0.25);

  $: selectedMonths = Array(((end + 12 - beginning) % 12) + 1)
    .fill()
    .map((_, i) => (beginning + i - 1) % 12);
</script>

<article>
  <h2>
    {name}
  </h2>
  <h3>
    ({region}) {country}
  </h3>

  <ul>
    <li>cheese from {milk} milk</li>
    {#if certification}
      <li>certified {certification} since {certification_date}</li>
    {/if}
  </ul>

  <svg
    viewBox="{-margin} {-margin} {width + margin * 2} {height + margin * 2}"
    width={width + margin * 2}
    height={height + margin * 2}
  >
    <g fill="currentColor">
      {#each months as month}
        <g transform="translate({scaleMonths(month)} {(height * 2) / 3})">
          <g transform="translate({scaleMonths.bandwidth() / 2} -2)">
            <text
              font-weight={selectedMonths.includes(month) ? 700 : 400}
              opacity={selectedMonths.includes(month) ? 1 : 0.5}
              font-size="6"
              text-anchor="middle">{labels[month]}</text
            >
          </g>
          <rect
            fill={selectedMonths.includes(month)
              ? "hsl(130, 90%, 70%)"
              : "hsl(0, 0%, 90%)"}
            rx="2"
            height={height / 3}
            width={scaleMonths.bandwidth()}
          />
        </g>
      {/each}
    </g>
  </svg>
</article>

<style>
  h2,
  h3 {
    font-size: 1rem;
    display: inline;
  }

  h2 {
    text-transform: capitalize;
  }

  h3 {
    font-weight: initial;
  }

  svg {
    max-width: 30rem;
    width: 100%;
    height: auto;
  }
</style>
