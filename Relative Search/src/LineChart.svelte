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

    const xAxis = d3
        .axisBottom(xScale)
        .ticks(5)
        .tickSize(0);

    const yAxis = d3
        .axisLeft(yScale)
        .ticks(5)
        .tickSize(0)
        .tickPadding(5);

    let xAxisGroup;
    let yAxisGroup;

    $: if (xAxisGroup) {
        d3.select(xAxisGroup).call(xAxis);
        const group = d3.select(xAxisGroup).call(xAxis);

        group
            .select("path")
            .attr("stroke-width", "0.25")
            .attr("stroke-linecap", "square");
        group
            .selectAll("text")
            .attr("font-size", "4")
            .attr("fill", "hsl(0, 0%, 30%)");

        group
            .selectAll(".tick")
            .append("path")
            .attr("fill", "none")
            .attr("opacity", "0.3")
            .attr("stroke", "currentColor")
            .attr("stroke-width", "0.5")
            .attr("stroke-dasharray", "0.5 2")
            .attr("d", `M 0 0 v -${height}`);
    }
    $: if (yAxisGroup) {
        const group = d3.select(yAxisGroup).call(yAxis);

        group.select("path").style("display", "none");
        group
            .selectAll("text")
            .attr("font-size", "4")
            .attr("fill", "hsl(0, 0%, 30%)");

        group
            .selectAll(".tick")
            .append("path")
            .attr("fill", "none")
            .attr("opacity", "0.3")
            .attr("stroke", "currentColor")
            .attr("stroke-width", "0.5")
            .attr("stroke-dasharray", "0.5 2")
            .attr("d", `M 0 0 h ${width}`);
    }

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
                    <g transform="translate(0 {height})" bind:this="{xAxisGroup}"></g>
                    <g bind:this="{yAxisGroup}"></g>
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
