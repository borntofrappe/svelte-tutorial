<script>
    import { items } from "./stores.js";

    // define the variables and functions used in the visualization
    const margin = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    };

    const width = 400;
    const height = 400;

    // pie function, based on the individual values of the input array
    $: pie = d3.pie().value(d => d.value);

    // arc function, describing a hollow pie, a donut chart
    const arc = d3
        .arc()
        .innerRadius(width / 3)
        .outerRadius(width / 2);

    // subset of data for the row chart
    // the input array is already sorted, so it's enough to consider the first 5 items
    $: topFive = $items.slice(0, 5);

    // scales for the lollipop chart
    // horizontally consider the values
    $: xScale = d3
        .scaleLinear()
        .domain([0, d3.max(topFive, d => d.value) * 1.25])
        .range([0, width])
        .nice();

    // vertically consider one band for each item
    $: yScale = d3
        .scaleBand()
        .domain(d3.range(topFive.length))
        .range([0, height]);
</script>

<style>
    /* display the visualization in a wrapping row */
    div {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
    }
</style>

{#if $items.length > 0}
<section>
    <!-- in the heading include a span element with an icon visually connected to the section -->
    <h2>
        <span>
            <svg viewBox="0 0 100 100" width="40" height="40">
                <use href="#highlight"></use>
            </svg>
        </span>
        Highlight items
    </h2>

    <!-- include the visualization here -->
    <div>
        <svg viewbox="0 0 {width + (margin.left + margin.right)} {height + (margin.top + margin.bottom)}" {width} {height}>
            <g transform="translate({margin.left} {margin.top})">
                <g transform="translate({width / 2} {height / 2})">
                    {#each pie($items) as slice}
                    <path d="{arc(slice)}" fill="{slice.data.color}"></path>
                    {/each}
                    <text x="0" y="0" text-anchor="middle" dominant-baseline="middle" fill="hsl(240, 40%, 95%)" font-size="{width / 8}">
                        {$items.reduce((acc, curr) => acc + curr.value, 0)}
                    </text>
                </g>
            </g>
        </svg>
        <svg viewbox="0 0 {width + (margin.left + margin.right)} {height + (margin.top + margin.bottom)}" {width} {height}>
            <g transform="translate({margin.left} {margin.top})">
                {#each topFive as top, index}
                <g transform="translate(0 {yScale(index) + yScale.bandwidth()})">
                    <path d="M 0 0 h {xScale(top.value)}" fill="none" stroke="{top.color}" stroke-linecap="round" stroke-width="7"></path>
                    <g transform="translate({xScale(top.value)} 0)">
                        <circle cx="0" cy="0" r="12" fill="{top.color}"></circle>
                        <text x="25" y="0" dominant-baseline="middle" fill="hsl(240, 25%, 95%)" font-size="{width / 22}">{top.name}</text>
                    </g>
                </g>
                {/each}
            </g>
        </svg>
    </div>
</section>
{/if}
