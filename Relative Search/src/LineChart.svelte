<script>
    export let data;
    export let title = "Line Chart";

    const width = 100;
    const height = 80;

    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
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
        .y(d => yScale(d.value));
</script>

<style>
    svg {
        width: 100%;
        height: auto;
        display: block;
    }
</style>

<article>
    <h1>{title}</h1>
    <svg {width} {height} viewBox="0 0 {width + (margin.left + margin.right)} {height + (margin.top + margin.bottom)}">
        <g transform="translate({margin.top} {margin.left})">
            <g fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round">
                <path d="{line(data)}" />
            </g>
        </g>
    </svg>
</article>
