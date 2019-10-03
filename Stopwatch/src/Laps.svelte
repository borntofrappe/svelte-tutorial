<script>
    // import fly to introduce new list items from the top
    import { fly } from "svelte/transition";
    // import flip to animate the remaining list items toward their new position
    import { flip } from "svelte/animate";

    import { formatTime } from "./utils.js";

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
        font-size: 0.75rem;
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

    /* for -webkit supported browsers style the scrollbar closer to the overall ui */
    ul::-webkit-scrollbar {
        width: 6px;
    }
    ul::-webkit-scrollbar-track {
        border-radius: 3px;
        background: hsl(0, 0%, 80%);
    }
    ul::-webkit-scrollbar-thumb {
        background-color: hsl(0, 0%, 30%);
        border-radius: 3px;
    }

</style>

<!-- use lap.total as a unique key to differentiate between the items -->
<ul>
    {#each laps as lap (lap.total)}
    <li in:fly="{{ y: -20, duration: 300, delay: 50 }}" animate:flip="{{ duration: 350 }}">
        <h2>Lap <sup>{lap.number}</sup></h2>
        <h3>{formatTime(lap.total)}</h3>
        <h4>+{formatTime(lap.partial)}</h4>
    </li>
    {/each}
</ul>
