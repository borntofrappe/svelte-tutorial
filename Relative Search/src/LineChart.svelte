<script>
    export let data;
    export let title = "Line Chart";

    const width = 100;
    const height = 80;

    const margin = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
    };

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);

    const parseTime = d3.timeParse("%Y-%m-%d");

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, d => parseTime(d.date)))
        .range([0, width]);

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
    <svg {width} {height} viewBox="0 0 {width + (margin.left + margin.right)} {height + (margin.top + margin.bottom)}">
        <defs>
            <mask id="mask-{title.toLowerCase().split(' ').join('-')}">
                <rect {width} {height} fill="hsl(0, 0%, 100%)" />
                {#each dataPoints as dataPoint}
                <circle fill="hsl(0, 0%, 0%)" stroke="none" r="1.5" cx="{dataPoint.x}" cy="{dataPoint.y}" />
                {/each}
            </mask>
        </defs>
        <g transform="translate({margin.top} {margin.left})">
            <g mask="url(#mask-{title.toLowerCase().split(' ').join('-')})">
                <path fill="none" stroke="currentColor" stroke-width="1" d="{line(data)}" />
                <path opacity="0.15" fill="currentColor" stroke="none" d="{area(data)}" />
            </g>

            {#each dataPoints as dataPoint}
            <circle fill="none" stroke="currentColor" stroke-width="1" r="1.5" cx="{dataPoint.x}" cy="{dataPoint.y}" />
            <text text-anchor="middle" font-size="5" font-weight="bold" fill="currentColor" x="{dataPoint.x}" y="{dataPoint.y - 3}">{dataPoint.value}</text>
            {/each}
        </g>
    </svg>
</article>
