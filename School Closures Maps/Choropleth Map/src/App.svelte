<script>
  import {
    group,
    schemePuBu,
    json,
    geoNaturalEarth1,
    geoPath,
    geoGraticule10,
  } from 'd3';
  import * as topojson from 'topojson';

  import data from '../data/duration_school_closures.csv';

  const dataMap = group(data, (d) => d.id);
  const groups = [
    {
      label: 'No data',
      threshold: -Infinity,
    },
    {
      label: '0 weeks',
      threshold: 0,
    },
    {
      label: '1-10 weeks',
      threshold: 10,
    },
    {
      label: '11-20 weeks',
      threshold: 20,
    },
    {
      label: '21-30 weeks',
      threshold: 30,
    },
    {
      label: '31-40 weeks',
      threshold: 40,
    },
    {
      label: '41+ weeks',
      threshold: Infinity,
    },
  ];
  const colors = schemePuBu[groups.length];

  const width = 800;
  const sphere = { type: 'Sphere' };
  const projection = geoNaturalEarth1().fitWidth(width, sphere);
  const pathGenerator = geoPath(projection);
  const height = pathGenerator.bounds(sphere)[1][1];

  const graticuleJson = geoGraticule10();

  const promise = json(
    'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'
  );

  let tooltipProjection;
  let tooltipData;
  $: {
    if (tooltipProjection) {
      const [x, y] = pathGenerator.centroid(tooltipProjection);
      tooltipData = { ...dataMap.get(tooltipProjection.id)[0], x, y };
    } else {
      tooltipData = null;
    }
  }
</script>

<svelte:head>
  <title>Choropleth Map</title>
</svelte:head>

<section>
  <header>
    <h1>Duration of school closures</h1>
    <a href="https://en.unesco.org/covid19/educationresponse">Source</a>
  </header>
  <main>
    {#if tooltipData}
      <div
        id="tooltip"
        style="position: absolute; transform: translate({tooltipData.x}px, {tooltipData.y}px)"
      >
        <h2>{tooltipData.country}</h2>
        <p>{tooltipData.weeks} weeks</p>
      </div>
    {/if}
    <svg {width} {height} viewBox="0 0 {width} {height}">
      {#await promise then data}
        <g>
          <!--
          <path
            d={pathGenerator(sphere)}
            fill="hsl(220, 72%, 98%)"
            stroke="none"
          />
          <path
            d={pathGenerator(graticuleJson)}
            fill="none"
            stroke-width="0.2"
            stroke="hsl(220, 72%, 68%)"
          />
          -->
          {#each topojson.feature(data, data.objects.countries).features as projection}
            {#if projection.properties.name !== 'Antarctica'}
              <path
                d={pathGenerator(projection)}
                fill={dataMap.has(projection.id)
                  ? colors[
                      groups.findIndex(
                        ({ threshold }) =>
                          parseInt(dataMap.get(projection.id)[0].weeks, 10) <=
                          threshold
                      )
                    ]
                  : colors[0]}
                stroke-width="0.1"
                stroke="hsl(214, 72%, 64%)"
                on:mouseenter={() => {
                  if (dataMap.has(projection.id)) {
                    tooltipProjection = projection;
                  }
                }}
                on:mouseleave={() => {
                  tooltipProjection = null;
                }}
              />
            {/if}
          {/each}

          {#if tooltipProjection}
            <path
              d={pathGenerator(tooltipProjection)}
              fill={colors[
                groups.findIndex(
                  ({ threshold }) =>
                    parseInt(dataMap.get(tooltipProjection.id)[0].weeks, 10) <=
                    threshold
                )
              ]}
              stroke-width="0.1"
              stroke="hsl(214, 72%, 64%)"
              style="filter: brightness(1.5); pointer-events: none;"
            />
          {/if}
        </g>
        <g transform="translate(20 {height / 1.5})">
          {#each groups as { label }, i}
            <g
              transform="translate(0 {(height / 2.5 / (groups.length + 1)) *
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

  main svg {
    display: block;
    width: 100%;
    height: auto;
  }

  main {
    position: relative;
  }

  main #tooltip {
    position: absolute;
    padding: 0.5rem 0.75rem;
    background: hsla(220, 90%, 100%, 0.9);
    box-shadow: 0 2px 5px -4px currentColor;
    line-height: 1.5;
    pointer-events: none;
  }

  main #tooltip h2 {
    font-size: 1em;
    font-weight: 600;
    color: hsl(220, 90%, 45%);
    letter-spacing: -0.5px;
    word-spacing: -1px;
  }

  main #tooltip p {
    font-size: 0.9em;
  }
</style>
