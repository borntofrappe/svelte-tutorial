<script>
  import {
    group,
    schemePuBu,
    json,
    geoNaturalEarth1,
    geoPath,
    timeParse,
    timeFormat,
    timer,
  } from 'd3';
  import * as topojson from 'topojson';

  const parseDate = timeParse('%d/%m/%Y');
  const formatDate = timeFormat('%B %-d, %Y');

  import data from '../data/covid_impact_education.csv';

  const dataMap = group(
    data.map(({ date, id, status }) => ({
      date: parseDate(date),
      id,
      status,
    })),
    (d) => d.date
  );

  const dates = [...dataMap.keys()];
  let day = 0;
  $: dataDay = dataMap.get(dates[day]);

  let isAnimating = false;
  const updateDay = () => {
    day = (day + 1) % dates.length;
  };
  let animationTimer = timer(updateDay);

  $: if (isAnimating) {
    animationTimer.restart(updateDay);
  } else {
    animationTimer.stop();
  }

  $: if (day === dates.length - 1) {
    isAnimating = false;
  }

  const labels = [
    'No data',
    'Fully open',
    'Partially open',
    'Academic break',
    'Closed due to COVID-19',
  ];
  const colors = schemePuBu[labels.length];

  const width = 800;
  const sphere = { type: 'Sphere' };
  const projection = geoNaturalEarth1().fitWidth(width, sphere);
  const pathGenerator = geoPath(projection);
  const height = pathGenerator.bounds(sphere)[1][1];

  const promise = json(
    'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'
  );
</script>

<svelte:head>
  <title>Interactive Dashboard</title>
</svelte:head>

<section>
  <header>
    <h1>Global monitoring of school closures for {formatDate(dates[day])}</h1>
    <a href="https://en.unesco.org/covid19/educationresponse">Source</a>
  </header>
  <main>
    <svg {width} {height} viewBox="0 0 {width} {height}">
      {#await promise then data}
        <g>
          {#each topojson.feature(data, data.objects.countries).features as projection}
            {#if projection.properties.name !== 'Antarctica'}
              <path
                d={pathGenerator(projection)}
                fill={dataDay.find((d) => d.id === projection.id)
                  ? colors[
                      labels.findIndex(
                        (label) =>
                          label ===
                          dataDay.find((d) => d.id === projection.id).status
                      )
                    ]
                  : colors[0]}
                stroke-width="0.1"
                stroke="hsl(214, 72%, 64%)"
              />
            {/if}
          {/each}
        </g>
        <g transform="translate(20 {height / 1.5})">
          {#each labels as label, i}
            <g
              transform="translate(0 {(height / 2.5 / (labels.length + 1)) *
                i})"
            >
              <circle r="4" fill={colors[i]} />
              <text x="18" font-size="12" dominant-baseline="middle"
                >{label}</text
              >
            </g>
          {/each}
        </g>
      {/await}
    </svg>

    <div>
      <label>
        <span class="visually-hidden"
          >{isAnimating ? 'Pause animation' : 'Play animation'}</span
        >
        <input type="checkbox" bind:checked={isAnimating} />
        <svg width="1em" height="1em" viewBox="0 0 100 100">
          <g
            fill="currentColor"
            stroke="currentColor"
            stroke-width="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d={isAnimating
                ? 'M 30 25 h 10 v 50 h -10z m 30 0 h 10 v 50 h -10z'
                : 'M 35 25 l 40 25 -40 25z'}
            />
          </g>
        </svg>
      </label>
      <input bind:value={day} type="range" min={0} max={dates.length - 1} />
    </div>
  </main>
</section>

<style>
  section {
    padding: 1rem;
    background: hsl(0, 0%, 100%);
    box-shadow: 0 2px 5px -4px currentColor;
    margin: 1rem auto;
    width: 95vw;
    max-width: 1000px;
  }

  section > * + * {
    margin-top: 1em;
  }

  header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
  }
  header h1 {
    margin-right: auto;
    font-size: 1.1rem;
  }

  header a {
    text-decoration: none;
    color: hsl(220, 80%, 36%);
    border-bottom: 1px dotted currentColor;
    font-size: 0.9em;
  }

  main > svg {
    display: block;
    width: 100%;
    height: auto;
  }

  div {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  div > * + * {
    margin-left: 0.5rem;
  }

  div label {
    width: 2.5rem;
    height: 2.5rem;
    position: relative;
  }

  div label input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  div label input:focus + svg {
    color: hsl(220, 80%, 36%);
  }

  div label svg {
    padding: 0.25rem;
    border: 0.25rem solid currentColor;
    border-radius: 0.25rem;
    display: block;
    width: 100%;
    height: auto;
  }

  div > input {
    flex-grow: 1;
  }

  :global(.visually-hidden) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }
</style>
