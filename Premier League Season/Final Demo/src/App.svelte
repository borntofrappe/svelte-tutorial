<script>
  import data from './data.js';
  import Table from './Table.svelte';
  import Points from './Points.svelte';
  import Goals from './Goals.svelte';
</script>

<svg
  viewBox="0 0 100 100"
  style="width: 0; height: 0; position: absolute;"
  aria-hidden="true"
>
  <defs>
    <clipPath id="c">
      <circle r="50" />
    </clipPath>
    <path
      id="h"
      d="M -8.5 -14.5 h 17 l 7 14.5 -7 14.5 h -17 l -7 -14.5 z"
      fill="currentColor"
    />
    <pattern id="p" viewBox="-50 -50 100 100" width="1" height="1">
      <g clip-path="url(#c)">
        <circle
          r="49.5"
          fill="hsl(0, 0%, 100%)"
          stroke="currentColor"
          stroke-width="1"
        />
        <use href="#h" />
        {#each Array(6) as _, i}
          <path
            transform="rotate({60 * i})"
            d="M 0 0 h 50"
            fill="none"
            stroke="currentColor"
          />
          <path
            transform="rotate({60 * i}) translate(50 0) rotate(120)"
            d="M 0 0 h 50"
            fill="none"
            stroke="currentColor"
          />
          <use transform="rotate({60 * i}) translate(50 0)" href="#h" />
        {/each}
      </g>
    </pattern>
  </defs>
</svg>

<div>
  <h1>Football Stats</h1>
  <p>
    Let's consider the <a
      href="https://en.wikipedia.org/wiki/2020%E2%80%9321_Premier_League#League_table"
      >league table</a
    >
    for the <time datetime="2020-09-12">2020</time> to
    <time datetime="2021-05-23">2021</time> season of the Premier League competition.
  </p>
  <Table {data} />
  <Points {data} />
  <Goals {data} />
</div>

<style>
  div {
    margin: 1rem auto;
    max-width: 700px;
  }

  div :global(svg) {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
