<script>
    // map the data to a lollipop chart
    export let data;

    // values for the visualization
    const width = 100;
    const height = 100;

    // slice the pie according to the individual frequencies
    const pie = d3.pie().value(d => d.frequency);

    // arc used for the slices
    // use an outerRadius smaller than half the width to allocate space for the text
    const arc = d3
        .arc()
        .innerRadius(width / 8)
        .outerRadius(width / 3.5);

    // arc used for the text
    // the idea is to use the arc's centroid to have the text positioned outside the slices
    const arcText = d3
        .arc()
        .innerRadius(width / 2.75)
        .outerRadius(width / 2.25);

    // color scale for the slices
    const color = d3.scaleOrdinal(d3.schemePastel1);
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
        <defs>
            <clipPath id="clip">
                <circle cx="0" cy="0" r="{width / 3}"></circle>
            </clipPath>
        </defs>
        <!-- center the arcs in the svg -->
        <g transform="translate({width / 2} {height / 2})">
            <!-- for each datum add an arc using the pie-d data -->
            {#each pie(data) as datum, i (datum.data.word)}
            <!-- between the text and the slice include a stroke connecting the two centroids
            included before the slice to have the line beneath the path element
            -->
            <path clip-path="url(#clip)" fill="none" stroke="currentColor" stroke-width="0.5" d="M {arc.centroid(datum).join(' ')} L {arcText.centroid(datum).join(' ')}">{datum.data.word}</path>
            <!-- slice -->
            <path d="{arc(datum)}" fill="{color(i)}" stroke="hsl(0, 0%, 100%)" stroke-width="1"></path>
            <!-- next to each slice include a text with the second arc -->
            <text x="0" y="0" font-size="4" text-anchor="middle" dominant-baseline="middle" transform="translate({arcText.centroid(datum).join(' ')})">{datum.data.word}</text>
            {/each}
        </g>
    </svg>
</section>
