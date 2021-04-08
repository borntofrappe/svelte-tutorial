<script>
  import * as d3 from 'd3';

  export let title;
  /* data describes an array of objects structured to describe a date and a value
    {
        date,
        value
    }
    */
  export let data;

  // size of the svg
  const width = 100;
  const height = 80;

  const margin = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  };

  // timeParse to parse the input data as to create a date object
  const parseTime = d3.timeParse('%Y-%m-%d');
  // timeFormat to style the date objects to a chosen format
  const formatTime = d3.timeFormat('%e %B');

  // horizontally create a scale based on the input dates
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => parseTime(d.date)))
    .range([0, width]);

  // vertically  consider the input values
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    // swap [0, height] to have the shapes positioned _from_ the bottom of the svg
    .range([height, 0]);

  // line function mapping the date and value in the svg
  const line = d3
    .line()
    .x((d) => xScale(parseTime(d.date)))
    .y((d) => yScale(d.value))
    .curve(d3.curveCatmullRom);

  // area function describing the area below the curve described by the dates and values
  const area = d3
    .area()
    .x((d) => xScale(parseTime(d.date)))
    .y0((d) => yScale(0))
    .y1((d) => yScale(d.value))
    .curve(d3.curveCatmullRom);

  // points highlighted through circle elements
  // in this instance the first and last
  const points = [0, data.length - 1];
  const dataPoints = points.map((point) => ({
    x: xScale(parseTime(data[point].date)),
    y: yScale(data[point].value),
    value: data[point].value,
  }));

  // "ticks", milestones marked on the x-axis
  // instead of using d3, we create here marks for an arbitrary set of dates
  const minDate = d3.min(data, (d) => parseTime(d.date));
  const maxDate = d3.max(data, (d) => parseTime(d.date));
  const q1 = d3.quantile(data, 0.25, (d) => parseTime(d.date));
  const q2 = d3.quantile(data, 0.5, (d) => parseTime(d.date));
  const q3 = d3.quantile(data, 0.75, (d) => parseTime(d.date));

  const xAxis = [minDate, q1, q2, q3, maxDate];

  // "ticks" for the y-axis
  // the idea is to include 10 values, up to the maximum value
  const maxValue = d3.max(data, (d) => d.value);
  const yTicks = 5;
  const yAxis = Array(yTicks)
    .fill()
    .map((value, index) => ((index + 1) * maxValue) / yTicks);

  // variable describing the tooltip
  // the idea is to assign a data point to this variable
  let tooltip = null;

  // subset of the input data delimited by the data points describing an arbitrary start and end
  // the idea is to highlight the specific area through a different visual (in this instance a repeating linear gradient)
  const highlightStart = data.findIndex((d) => d.start);
  const highlightEnd = data.findIndex((d) => d.end);
  const highlight = data.slice(highlightStart, highlightEnd + 1);
</script>

<!-- when exiting the article remove the tooltip -->
<article
  on:mouseout={() => {
    tooltip = null;
  }}
>
  <h1>{title}</h1>
  <svg
    {width}
    {height}
    viewBox="0 0 {width + (margin.left + margin.right)} {height +
      (margin.top + margin.bottom)}"
  >
    <defs>
      <!-- through a carve out the area dedicated to the data points
            this makes it possible to hide elements behind their circles
            ! use the title in the ID to avoid a conflict between multiple svg
            -->
      <mask id="mask-{title.toLowerCase().split(' ').join('-')}">
        <rect
          x={-margin.left}
          y={-margin.top}
          width={width + (margin.left + margin.right)}
          height={height + (margin.top + margin.bottom)}
          fill="hsl(0, 0%, 100%)"
        />
        {#each dataPoints as dataPoint}
          <circle
            fill="hsl(0, 0%, 0%)"
            stroke="none"
            r="1.5"
            cx={dataPoint.x}
            cy={dataPoint.y}
          />
        {/each}
      </mask>
      <!-- repeating linear gradient describing the highlight section
            ! use the title in the ID to avoid a conflict between multiple svg
             -->
      <linearGradient
        id="gradient-{title.toLowerCase().split(' ').join('-')}"
        gradientUnits="userSpaceOnUse"
        spreadMethod="repeat"
        x1="0"
        x2="1"
        y1="0"
        y2="1"
      >
        <stop stop-color="currentColor" offset="0.5" />
        <stop stop-color="hsl(0, 0%, 100%)" offset="0.5" />
      </linearGradient>
    </defs>
    <g transform="translate({margin.top} {margin.left})">
      <!-- line+area chart
            using the mask to avoid drawing shapes where the highlighted points rest
            -->
      <g mask="url(#mask-{title.toLowerCase().split(' ').join('-')})">
        <!-- area describing the highlight section -->
        <path
          opacity="0.25"
          fill="url(#gradient-{title.toLowerCase().split(' ').join('-')})"
          stroke="none"
          d={area(highlight)}
        />

        <!-- made-up axes using the dates and values chosen in the Axis variables to draw text and a few lines -->
        <g class="axes">
          <g transform="translate(0 {height})">
            <!-- solid dash of the xAxis -->
            <path
              fill="none"
              stroke="hsl(0, 0%, 0%)"
              stroke-width="0.5"
              d="M 0 0 h {width}"
            />
            {#each xAxis as xTick}
              <g transform="translate({xScale(xTick)} 0)">
                <text
                  fill="hsl(0, 0%, 0%)"
                  font-size="3"
                  text-anchor="middle"
                  y="5">{formatTime(xTick)}</text
                >
              </g>
            {/each}
          </g>
          {#each yAxis as yTick}
            <g transform="translate(0 {yScale(yTick)})">
              <!-- grid lines for the y axis -->
              <path
                opacity="0.2"
                fill="none"
                stroke="hsl(0, 0%, 0%)"
                stroke-width="0.5"
                stroke-dasharray="1"
                d="M 0 0 h {width}"
              />
              <!-- position the text right atop the grid lines -->
              <text
                fill="hsl(0, 0%, 0%)"
                opacity="0.5"
                font-size="3"
                text-anchor="start"
                x="0"
                y="-1">{yTick}</text
              >
            </g>
          {/each}
        </g>

        <!-- line chart -->
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          d={line(data)}
        />
        <!-- area chart -->
        <path opacity="0.15" fill="currentColor" stroke="none" d={area(data)} />
      </g>

      <!-- data points highlighted through circle and text elements -->
      {#each dataPoints as dataPoint}
        <circle
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          r="1.5"
          cx={dataPoint.x}
          cy={dataPoint.y}
        />
        <text
          text-anchor="middle"
          font-size="5"
          font-weight="bold"
          fill="currentColor"
          x={dataPoint.x}
          y={dataPoint.y - 3}>{dataPoint.value}</text
        >
      {/each}
      <!-- tooltip described with a text, circle, and a line connecting the data point vertically to the x axis -->
      {#if tooltip}
        <g
          fill="currentColor"
          transform="translate({xScale(parseTime(tooltip.date))} {yScale(
            tooltip.value
          )})"
        >
          <text
            text-anchor="middle"
            font-size="5"
            font-weight="bold"
            fill="hsl(0, 0%, 10%)"
            y="-3">{tooltip.value}</text
          >
          <path
            opacity="0.75"
            fill="none"
            stroke="hsl(0, 0%, 10%)"
            stroke-width="0.5"
            stroke-dasharray="1"
            d="M 0 0 v {height - yScale(tooltip.value)}"
          />
          <circle r="2" fill="hsl(0, 0%, 10%)" />
        </g>
      {/if}
      <!-- rectangles included atop the visualization to manage mouse events  -->
      {#each data as dataPoint, index}
        <g transform="translate({xScale(parseTime(dataPoint.date))} 0)">
          <!-- upon entering the rectangle update the tooltip with the data point behind the respective rectangle -->
          <rect
            on:mouseenter={() => {
              tooltip = data[index];
            }}
            opacity="0"
            x="-{xScale(parseTime(data[1].date)) / 2}"
            width={xScale(parseTime(data[1].date)) -
              xScale(parseTime(data[0].date))}
            {height}
          />
        </g>
      {/each}
    </g>
  </svg>
</article>

<style>
  svg {
    width: 100%;
    height: auto;
    display: block;
    color: hsl(200, 95%, 45%);
  }
</style>
