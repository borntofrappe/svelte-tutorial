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
    const formatTime = d3.timeFormat("%e %B");

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, d => parseTime(d.date)))
        .range([0, width]);

    const xAxis = d3
        .axisBottom(xScale)
        .ticks(5)
        .tickSize(0);

    const yAxis = d3
        .axisLeft(yScale)
        .ticks(5)
        .tickSize(0)
        .tickPadding(5);

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

    const dataPointsX = [minDate, q1, q2, q3, maxDate];

    const dataPointsY = Array(10)
        .fill()
        .map((value, index) => (index + 1) * 10);
</script>

<style>
    svg {
        width: 100%;
        height: auto;
        display: block;
        color: hsl(200, 90%, 45%);
    }
    .axes {
        color: hsl(0, 0%, 0%);
    }
</style>

<article>
    <h1>{title}</h1>
    <svg {width} {height} viewBox="0 0 {width + (margin.left + margin.right)} {height + (margin.top + margin.bottom)}">
        <defs>
            <mask id="mask-{title.toLowerCase().split(' ').join('-')}">
                <rect x="{-margin.left}" y="{-margin.top}" width="{width + (margin.left + margin.right)}" height="{height + (margin.top + margin.bottom)}" fill="hsl(0, 0%, 100%)" />
                {#each dataPoints as dataPoint}
                <circle fill="hsl(0, 0%, 0%)" stroke="none" r="1.5" cx="{dataPoint.x}" cy="{dataPoint.y}" />
                {/each}
            </mask>
        </defs>
        <g transform="translate({margin.top} {margin.left})">
            <g mask="url(#mask-{title.toLowerCase().split(' ').join('-')})">
                <g class="axes">
                    <g transform="translate(0 {height})">
                        <path fill="none" stroke="currentColor" stroke-width="0.5" d="M 0 0 h {width}" />
                        {#each dataPointsX as dataPointX}
                        <g transform="translate({xScale(dataPointX)} 0)">
                            <text font-size="3" text-anchor="middle" y="5">{formatTime(dataPointX)}</text>
                        </g>
                        {/each}
                    </g>
                    {#each dataPointsY as dataPointY}
                    <g transform="translate(0 {yScale(dataPointY)})">
                        <text opacity="0.5" font-size="3" text-anchor="start" x="0" y="-1">{dataPointY}</text>
                        <path opacity="0.2" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1" d="M 0 0 h {width}" />
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
        </g>
    </svg>
</article>
