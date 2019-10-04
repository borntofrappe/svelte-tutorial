<script>
    import { flip } from "svelte/animate";

    export let data;

    const margin = {
        top: 60,
        right: 40,
        bottom: 20,
        left: 40
    };

    const width = 400 - (margin.left + margin.right);
    const height = 400 - (margin.top + margin.bottom);

    $: xScale = d3
        .scaleBand()
        .domain(data.map(({ word }) => word))
        .range([0, width]);

    $: yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.frequency)])
        .range([0, height]);

    $: xAxis = d3.axisLeft(xScale);
</script>

<style>
    svg {
        display: block;
        background: hsl(0, 0%, 100%);
        width: 100%;
        height: 100%;
    }
</style>

<svg viewBox="0 0 {width + (margin.left + margin.right)} {height + (margin.top + margin.bottom)}" {width} {height}>
    <g transform="translate({margin.left} {margin.top})">
        {#each data as datum, i (datum.word)}
        <g transform="translate({xScale(datum.word) + xScale.bandwidth() / 2} {height - yScale(datum.frequency)})">
            <rect x="{-xScale.bandwidth() / 4}" y="0" width="{xScale.bandwidth() / 2}" height="{yScale(datum.frequency)}"></rect>
            <text x="0" y="0" transform="translate(0 -10) rotate(-45)" font-size="1rem">{datum.word}</text>
        </g>
        {/each}
    </g>
</svg>
