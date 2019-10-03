<script>
    export let laps = [];
</script>
<style>
    /* limit the height of the unordered list */
    ul {
        list-style: none;
        height: 225px;
        overflow-y: auto;
        padding: 0 0.5rem; /* horizontal padding included for the scrollbar */
    }
    /* display each list item in a row */
    ul li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid hsl(0, 0%, 70%);
        padding: 0.75rem 0;
    }
    ul > li + li {
        margin-top: 1rem;
    }
    /* separate the space of each row equally among the direct children (the h2, h3 and h4 elements */
    ul li > * {
        font-weight: 400;
        width: 0;
        flex-grow: 1;
    }
    ul li h2 {
        text-align: left;
        font-size: 1rem;
    }
    ul li h2 sup {
        font-size: 0.7rem;
        margin-left: -0.25rem;
    }
    ul li h3 {
        text-align: center;
        font-size: 1.15rem;
    }
    ul li h4 {
        text-align: right;
        font-size: 0.75rem;
    }
</style>
<ul>
    {#each laps as lap}
    <li>
        <h2>{lap}</h2>
    </li>
    {/each}
</ul>
