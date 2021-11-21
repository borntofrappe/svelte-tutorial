<script>
  import { json } from "d3-fetch";
  import { fly } from "svelte/transition";
  import { geoEquirectangular, geoPath, geoGraticule10 } from "d3-geo";
  import { format } from "d3-format";
  import copy from "copy-to-clipboard";
  import * as topojson from "topojson";

  const formatCoordinates = format(".2f");

  const sphere = { type: "Sphere" };

  const dimensions = {
    width: window.innerWidth,
  };

  const projection = geoEquirectangular().fitWidth(dimensions.width, sphere);

  const pathGenerator = geoPath(projection);

  const y1 = pathGenerator.bounds(sphere)[1][1];
  dimensions.height = y1;

  const graticule = geoGraticule10();

  const promise = json(
    "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"
  );

  let coordinates = [];
  let point = {
    x: dimensions.width / 2,
    y: dimensions.height / 2,
  };

  let svg;
  let notice;
  $: if (notice) {
    const timeout = setTimeout(() => {
      notice = null;
      clearTimeout(timeout);
    }, 1000);
  }
</script>

<svg bind:this={svg} viewBox="0 0 {dimensions.width} {dimensions.height}">
  <g>
    <path fill="hsl(0, 0%, 97%)" d={pathGenerator(sphere)} />
    <path
      stroke="hsl(0, 0%, 87%)"
      stroke-width="0.5"
      fill="none"
      d={pathGenerator(graticule)}
    />
    {#await promise}
      <text
        out:fly={{ duration: 250 }}
        x={dimensions.width / 2}
        y={dimensions.height / 2}
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="32">Fetching data</text
      >
    {:then data}
      <g in:fly={{ delay: 500, duration: 1000 }}>
        <g fill="currentColor" stroke="currentColor">
          <path d={pathGenerator(topojson.feature(data, data.objects.land))} />
        </g>

        <g fill="hotpink">
          {#each coordinates as { long, lat }, i}
            <circle r="3" transform="translate({projection([long, lat])})" />
          {/each}
        </g>

        <g>
          <circle fill="hotpink" r="4" cx={point.x} cy={point.y} />
          <g
            fill="none"
            stroke="hotpink"
            stroke-width="2"
            stroke-dasharray="2 5"
          >
            <path d="M {point.x} 0 v {dimensions.height}" />
            <path d="M 0 {point.y} h {dimensions.width}" />
          </g>
        </g>

        <g>
          <rect
            on:mousemove={({ pageX: x, pageY: y }) => {
              const { width, height } = svg.getBoundingClientRect();
              point = {
                x: (x / width) * dimensions.width,
                y: (y / height) * dimensions.height,
              };
            }}
            on:click={() => {
              let { x, y } = point;
              const [long, lat] = projection.invert([x, y]);
              coordinates = [
                ...coordinates,
                {
                  x,
                  y,
                  long,
                  lat,
                },
              ];
            }}
            opacity="0"
            width={dimensions.width}
            height={dimensions.height}
          />
        </g>
      </g>
    {:catch error}
      <g in:fly={{ delay: 500 }}>
        <text
          x={dimensions.width / 2}
          y={dimensions.height / 2 - 24}
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="32">Error</text
        >
        <text
          x={dimensions.width / 2}
          y={dimensions.height / 2 + 18}
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="20">{error}</text
        >
      </g>
    {/await}
  </g>
</svg>

<p>Click on the map to select a longitude and latitude</p>

{#if coordinates.length > 0}
  <ul>
    {#each coordinates.map( ({ long, lat }) => [formatCoordinates(long), formatCoordinates(lat)] ) as [long, lat], i}
      <li>
        <span>[{long}, {lat}]</span>
        <button
          on:click={() => {
            copy(`[${long}, ${lat}]`);
            notice = "Copied";
          }}
        >
          Copy
        </button>
        <button
          on:click={() => {
            coordinates = [
              ...coordinates.slice(0, i),
              ...coordinates.slice(i + 1),
            ];
          }}
        >
          Remove
        </button>
      </li>
    {/each}
  </ul>

  <button
    on:click={() => {
      copy(
        `[${coordinates
          .map(({ long, lat }) => `[${long}, ${lat}]`)
          .join(", ")}]`
      );
      notice = "Copied all";
    }}
  >
    Copy all
  </button>

  <button on:click={() => (coordinates = [])}> Remove all </button>
{/if}

{#if notice}
  <div id="notice">
    {notice}
  </div>
{/if}

<style>
  :global(body) {
    padding: 0;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  svg text {
    fill: hsl(0, 0%, 30%);
    font-weight: bold;
    font-size: "1rem";
  }

  #notice {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    color: hsl(0, 0%, 96%);
    background: hsl(0, 0%, 20%);
  }
</style>
