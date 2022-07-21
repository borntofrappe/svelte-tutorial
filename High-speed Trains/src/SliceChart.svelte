<script>
  import data from "./data.js";
  import { scaleLinear } from "d3-scale";
  import { arc, pie } from "d3-shape";
  import { max, extent } from "d3-array";

  const maxTime = max(data.map((d) => max(d.times, (d) => d.time)));
  const years = extent(data[0].times, (d) => d.year);
  let year = years[0];

  $: dataYear = data.map(({ connection, times }) => ({
    connection,
    time: times.find((d) => d.year === year).time,
  }));

  const dimensions = {
    size: 400,
    margin: 60,
  };

  dimensions.radius = (dimensions.size - dimensions.margin * 2) / 2;

  const pieGenerator = pie().value(1).padAngle(0.2);

  $: arcs = pieGenerator(dataYear);
  const arcGenerator = arc().innerRadius(0).outerRadius(dimensions.radius);

  const scaleRadius = scaleLinear()
    .domain([0, maxTime - 60])
    .range([0, dimensions.radius])
    .nice();

  const radiusTicks = scaleRadius.ticks(5);
</script>

<article>
  <h2>
    Since 1957, travel times between Paris and populous French cities have
    shrunk considerably, especially considering the introduction of high-speed
    trains.
  </h2>

  <form on:submit|preventDefault>
    <input type="range" min={years[0]} max={years[1]} bind:value={year} />
    <output>{year}</output>
  </form>

  <svg
    viewBox="0 0 {dimensions.size} {dimensions.size}"
    width={dimensions.size}
    height={dimensions.size}
  >
    <g transform="translate({dimensions.margin} {dimensions.margin})">
      <g transform="translate({dimensions.radius} {dimensions.radius})">
        <g>
          {#each radiusTicks as radiusTick, i}
            <circle
              fill="none"
              stroke="currentColor"
              opacity="0.2"
              r={scaleRadius(radiusTick)}
            />
            {#if i !== 0 && i !== radiusTicks.length - 1}
              <text
                font-size="9"
                font-weight="bold"
                x="-4"
                y={scaleRadius(radiusTick) * -1 - 3}
                text-anchor="end"
                fill="currentColor">{Math.floor(radiusTick / 60)}h</text
              >
            {/if}
          {/each}
        </g>

        <g>
          {#each arcs as arc}
            <path
              transform="rotate({(180 / Math.PI) * arc.startAngle})"
              fill="none"
              stroke="currentColor"
              opacity="0.2"
              d="M 0 0 v -{dimensions.radius}"
            />
            <path
              fill="hsl(44, 100%, 60%)"
              d={arcGenerator.outerRadius(scaleRadius(arc.data.time))(arc)}
            />
            <g
              transform="rotate({(180 / Math.PI) *
                ((arc.startAngle + arc.endAngle) /
                  2)}) translate(0 {(dimensions.radius +
                dimensions.margin / 2) *
                -1}) rotate({(180 / Math.PI) *
                ((arc.startAngle + arc.endAngle) / 2) *
                -1}) "
            >
              <text
                font-size="12"
                font-weight="bold"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="currentColor">{arc.data.connection}</text
              >
            </g>
          {/each}
        </g>
      </g>
    </g>
  </svg>

  <p>
    Source: <a
      href="https://ressources.data.sncf.com/explore/dataset/meilleurs-temps-des-parcours-des-trains/table/?disjunctive.relations&dataChart=eyJxdWVyaWVzIjpbeyJjb25maWciOnsiZGF0YXNldCI6Im1laWxsZXVycy10ZW1wcy1kZXMtcGFyY291cnMtZGVzLXRyYWlucyIsIm9wdGlvbnMiOnsiZGlzanVuY3RpdmUucmVsYXRpb25zIjp0cnVlfX0sImNoYXJ0cyI6W3sidHlwZSI6ImNvbHVtbiIsImZ1bmMiOiJBVkciLCJ5QXhpcyI6IjE5ODJfMCIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiM2NmMyYTUifV0sInhBeGlzIjoicmVsYXRpb25zIiwibWF4cG9pbnRzIjo1MCwic29ydCI6IiJ9XSwidGltZXNjYWxlIjoiIn0%3D"
      ><abbr title="National Company of French Railways">SNCF</abbr></a
    >
  </p>
</article>

<style>
  article {
    accent-color: currentColor;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  output {
    font-weight: bold;
    font-size: 1.5rem;
  }

  svg {
    display: block;
    width: 75%;
    height: auto;
    color: hsl(0, 0%, 51%);
    margin: 0 auto;
  }
</style>
