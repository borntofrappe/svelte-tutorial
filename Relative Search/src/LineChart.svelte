<script>
    import * as d3 from "d3";

    export let title;
    export let data;

    const width = 100;
    const height = 80;

    const margin = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
    };

    const parseTime = d3.timeParse("%Y-%m-%d");
    const formatTime = d3.timeFormat("%e %B");

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, d => parseTime(d.date)))
        .range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    const line = d3
        .line()
        .x(d => xScale(parseTime(d.date)))
        .y(d => yScale(d.value))
        .curve(d3.curveCatmullRom);

    const area = d3
        .area()
        .x(d => xScale(parseTime(d.date)))
        .y0(d => yScale(0))
        .y1(d => yScale(d.value))
        .curve(d3.curveCatmullRom);

    const points = [0, data.length - 1];
    const dataPoints = points.map(point => ({
        x: xScale(parseTime(data[point].date)),
        y: yScale(data[point].value),
        value: data[point].value
    }));

    const minDate = d3.min(data, d => parseTime(d.date));
    const maxDate = d3.max(data, d => parseTime(d.date));
    const q1 = d3.quantile(data, 0.25, d => parseTime(d.date));
    const q2 = d3.quantile(data, 0.5, d => parseTime(d.date));
    const q3 = d3.quantile(data, 0.75, d => parseTime(d.date));

    const xAxis = [minDate, q1, q2, q3, maxDate];

    const maxValue = d3.max(data, d => d.value);
    const yTicks = 10;
    const yAxis = Array(Math.floor(maxValue / yTicks))
        .fill()
        .map((value, index) => (index + 1) * yTicks);

    let tooltip = null;

    const startPeriod = data.findIndex(d => d.start);
    const endPeriod = data.findIndex(d => d.end);
    const dataPeriod = data.slice(startPeriod, endPeriod + 1);
</script>

<style>
    svg {
        width: 100%;
        height: auto;
        display: block;
        color: hsl(200, 90%, 45%);
    }
</style>

<article>
    <h1>{title}</h1>
    <svg on:mouseout="{() => { tooltip = null; }}" {width} {height} viewBox="0 0 {width + (margin.left + margin.right)} {height + (margin.top + margin.bottom)}">
        <defs>
            <mask id="mask-{title.toLowerCase().split(' ').join('-')}">
                <rect x="{-margin.left}" y="{-margin.top}" width="{width + (margin.left + margin.right)}" height="{height + (margin.top + margin.bottom)}" fill="hsl(0, 0%, 100%)" />
                {#each dataPoints as dataPoint}
                <circle fill="hsl(0, 0%, 0%)" stroke="none" r="1.5" cx="{dataPoint.x}" cy="{dataPoint.y}" />
                {/each}
            </mask>
            <linearGradient id="gradient-{title.toLowerCase().split(' ').join('-')}" gradientUnits="userSpaceOnUse" spreadMethod="repeat" x1="0" x2="1" y1="0" y2="1">
                <stop stop-color="currentColor" offset="0.5" />
                <stop stop-color="hsl(0, 0%, 100%)" offset="0.5" />
            </linearGradient>
        </defs>
        <g transform="translate({margin.top} {margin.left})">
            <g mask="url(#mask-{title.toLowerCase().split(' ').join('-')})">
                <path opacity="0.25" fill="url(#gradient-{title.toLowerCase().split(' ').join('-')})" stroke="none" d="{area(dataPeriod)}" />

                <g class="axes">
                    <g transform="translate(0 {height})">
                        <path fill="none" stroke="hsl(0, 0%, 0%)" stroke-width="0.5" d="M 0 0 h {width}" />
                        {#each xAxis as xTick}
                        <g transform="translate({xScale(xTick)} 0)">
                            <text fill="hsl(0, 0%, 0%)" font-size="3" text-anchor="middle" y="5">{formatTime(xTick)}</text>
                        </g>
                        {/each}
                    </g>
                    {#each yAxis as yTick}
                    <g transform="translate(0 {yScale(yTick)})">
                        <text fill="hsl(0, 0%, 0%)" opacity="0.5" font-size="3" text-anchor="start" x="0" y="-1">{yTick}</text>
                        <path opacity="0.2" fill="none" stroke="hsl(0, 0%, 0%)" stroke-width="0.5" stroke-dasharray="1" d="M 0 0 h {width}" />
                    </g>
                    {/each}
                </g>

                <path fill="none" stroke="currentColor" stroke-width="1" d="{line(data)}" />
                <path opacity="0.15" fill="currentColor" stroke="none" d="{area(data)}" />
            </g>

            {#each dataPoints as dataPoint}
            <circle fill="none" stroke="currentColor" stroke-width="1" r="1.5" cx="{dataPoint.x}" cy="{dataPoint.y}" />
            <text text-anchor="middle" font-size="5" font-weight="bold" fill="currentColor" x="{dataPoint.x}" y="{dataPoint.y - 3}">{dataPoint.value}</text>
            {/each}
            <!--  -->
            {#if tooltip}
            <g fill="currentColor" transform="translate({xScale(parseTime(tooltip.date))} {yScale(tooltip.value)})">
                <text text-anchor="middle" font-size="5" font-weight="bold" fill="hsl(0, 0%, 10%)" y="-3">{tooltip.value}</text>
                <path opacity="0.75" fill="none" stroke="hsl(0, 0%, 10%)" stroke-width="0.5" stroke-dasharray="1" d="M 0 0 v {height - yScale(tooltip.value)}" />
                <circle r="2" fill="hsl(0, 0%, 10%)" />
            </g>
            {/if}
            <!--  -->
            {#each data as dataPoint, index}
            <g transform="translate({xScale(parseTime(dataPoint.date))} 0)">
                <rect on:mouseenter="{() => {tooltip = data[index]}}" opacity="0" x="-{xScale(parseTime(data[1].date)) / 2}" width="{xScale(parseTime(data[1].date)) - xScale(parseTime(data[0].date))}" {height} />
            </g>
            {/each}
        </g>
    </svg>
</article>
