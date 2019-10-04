<script>
    // map the data to a lollipop chart
    export let data;

    // values for the visualization
    const width = 100;
    const height = 100;
    const margin = 20;

    $: xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.frequency)])
        .range([0, width - margin]);

    $: yScale = d3
        .scaleBand()
        .domain(data.map(({ word }) => word))
        .range([0, height]);
</script>

<style>
    /* third component
have the svg expand to cover the available width and height */
    section .graphic {
        width: 100%;
        height: auto;
        color: hsl(210, 90%, 55%);
    }
    section .graphic text {
        color: hsl(240, 70%, 5%);
    }
</style>

<section class="chart">
    <svg class="icon" viewBox="0 0 100 100" width="50" height="50">
        <use href="#chart"></use>
    </svg>
    <svg class="graphic" viewBox="0 0 {width} {height}" {width} {height}>
        <!-- for each datum add a line, circle and text element describing the word and frequency -->
        {#each data as datum, i (datum.word)}
        <g transform="translate(0 {yScale(datum.word) + yScale.bandwidth() / 2})">
            <path d="M 0 0 h {xScale(datum.frequency)}" fill="none" stroke="currentColor" stroke-width="1"></path>
            <g transform="translate({xScale(datum.frequency)} 0)">
                <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                <text x="5" y="0" dominant-baseline="middle" font-size="5">{datum.word}</text>
            </g>
        </g>
        {/each}
    </svg>
</section>
