<script>
  import { pointer } from "d3-selection";
  import { scaleTime } from "d3-scale";
  import { timeParse, timeFormat } from "d3-time-format";
  import { timeDay } from "d3-time";

  export let game;

  let date;
  let selectedDate;

  function handleMousemove(e) {
    const [x] = pointer(e);
    date = timeScale.invert(x);
  }

  function handleMouseleave() {
    date = null;
  }

  function handleClick(e) {
    const [x] = pointer(e);
    selectedDate = timeScale.invert(x);
  }

  const parseTime = timeParse("%m/%d/%y");
  const formatTime = timeFormat("%a %e, %B");
  const formatAxis = timeFormat("%b");
  const formatDate = timeFormat("%A %e, %B");

  const dimensions = {
    width: 600,
    height: 125,
    margin: {
      top: 0,
      right: 10,
      bottom: 25,
      left: 10,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - (dimensions.margin.left + dimensions.margin.right);
  dimensions.boundedHeight =
    dimensions.height - (dimensions.margin.top + dimensions.margin.bottom);

  const timeScale = scaleTime()
    .domain([new Date(2021, 0, 1), new Date(2021, 11, 31)])
    .range([0, dimensions.boundedWidth])
    .clamp(false);

  const ticks = timeScale.ticks();
</script>

<article>
  <h2>{game.title}</h2>

  <svg
    viewBox="-{dimensions.margin.left} -{dimensions.margin
      .top} {dimensions.width} {dimensions.height}"
    width={dimensions.width}
    height={dimensions.height}
  >
    <defs>
      <linearGradient
        id="gradient"
        gradientTransform="rotate(45)"
        gradientUnits="userSpaceOnUse"
        spreadMethod="repeat"
        x1="0"
        x2="25"
      >
        <stop stop-color="hsl(39, 100%, 48%)" offset="0" />
        <stop stop-color="hsl(39, 100%, 48%)" offset="50%" />
        <stop stop-color="transparent" offset="50%" />
        <stop stop-color="transparent" offset="100%" />
      </linearGradient>
    </defs>

    <rect
      opacity="0.1"
      fill="url(#gradient)"
      width={dimensions.boundedWidth}
      height={dimensions.boundedHeight}
    />
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      d="M 0 {dimensions.boundedHeight} h {dimensions.boundedWidth}"
    />

    <g transform="translate(0 {dimensions.boundedHeight})">
      {#each ticks as tick}
        <g transform="translate({timeScale(tick)} 0)">
          <path
            fill="none"
            stroke="currentColor"
            stroke-width="0.1"
            stroke-dasharray="5"
            d="M 0 0 v -{dimensions.boundedHeight}"
          />
          <text
            y={dimensions.margin.bottom - 12}
            text-anchor="middle"
            font-size="10">{formatAxis(tick).toLowerCase()}.</text
          >
        </g>
      {/each}
    </g>

    {#if selectedDate}
      <g transform="translate({timeScale(parseTime(game.date))} 0)">
        <path
          fill="none"
          stroke="hsl(120, 80%, 27%)"
          stroke-width="1"
          d="M 0 0 v {dimensions.boundedHeight}"
        />
      </g>

      <g transform="translate({timeScale(selectedDate)} 0)">
        <path
          fill="none"
          stroke="hsl(39, 100%, 48%)"
          stroke-width="1"
          d="M 0 0 v {dimensions.boundedHeight}"
        />
      </g>
    {/if}

    {#if !selectedDate}
      {#if date}
        <g transform="translate({timeScale(date)} 0)">
          <path
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            d="M 0 0 v {dimensions.boundedHeight}"
          />
          <text
            x={timeScale(date) > dimensions.boundedWidth / 2 ? -5 : 5}
            text-anchor={timeScale(date) > dimensions.boundedWidth / 2
              ? "end"
              : "start"}
            font-size="12"
            font-weight="bold"
            y={dimensions.boundedHeight / 2}
          >
            {formatTime(date)}
          </text>
        </g>
      {/if}

      <rect
        class="crosshair"
        on:click|once={handleClick}
        on:mousemove={handleMousemove}
        on:mouseleave={handleMouseleave}
        opacity="0"
        width={dimensions.boundedWidth}
        height={dimensions.boundedHeight}
      />
    {/if}
  </svg>

  {#if selectedDate}
    <p>
      You picked <span>{formatDate(selectedDate)}</span>, while the title was
      published <span>{formatDate(parseTime(game.date))}</span>. Exactly
      <strong
        >{Math.abs(timeDay.count(selectedDate, parseTime(game.date)))} days off</strong
      >.
    </p>
  {/if}
</article>

<style>
  article > * + * {
    margin-top: 0.5em;
  }

  h2 {
    font-size: 1rem;
  }

  p {
    line-height: 1.5;
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .crosshair {
    cursor: crosshair;
  }

  p span {
    padding: 0.1rem 0.25rem;
    font-weight: bold;
  }

  p span:nth-of-type(1) {
    color: hsl(0, 0%, 100%);
    background: hsl(39, 100%, 48%);
  }

  p span:nth-of-type(2) {
    color: hsl(0, 0%, 100%);
    background: hsl(120, 80%, 27%);
  }
</style>
