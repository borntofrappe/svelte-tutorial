<script>
    // import the utility function to pad integer values with a 0 and always return a string
    import { zeroPadded } from "./utils.js";

    // on destroy to remove the interval instantiated with the components
    import { onDestroy } from "svelte";

    // retrieve the current date
    let now = new Date();
    // reactive variables: hours and minutes change as **now** changes
    // use the utility function to fabricate a two-characters long string out of the input value
    $: hours = zeroPadded(now.getHours());
    $: minutes = zeroPadded(now.getMinutes());

    // instantiate an interval to update the date
    let interval = setInterval(() => {
        now = new Date();
    }, 1000);

    onDestroy(() => {
        clearInterval(interval);
    });
</script>
<style>
    svg {
        display: block;
        width: 100%;
        height: auto;
    }
    .colon {
        animation: blink 1s step-end infinite;
    }
    @keyframes blink {
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>

<svg viewBox="0 0 100 100">
    <!-- define the path used in the dial for the numbers
        ! be sure to provide an element, text or otherwise, to provide the time to assistive technologies
        -->
    <defs>
        <!-- each path element draws a number from the center -->
        <path id="0" d="M -6 -15 h 12 v 30 h -12 z"></path>
        <path id="1" d="M 6 -15 v 30"></path>
        <path id="2" d="M -6 -15 h 12 v 15 h -12 v 15 h 12"></path>
        <path id="3" d="M -6 -15 h 12 v 30 h -12 m 0 -15 h 12"></path>
        <path id="4" d="M -6 -15 v 15 h 12 v 15 m 0 -30 v 15"></path>
        <g id="5"><use href="#2" transform="scale(-1 1)"></use></g>
        <path id="6" d="M 6 -15 h -12 v 30 h 12 v -15 h -12"></path>
        <path id="7" d="M -6 -15 h 12 v 30"></path>
        <path id="8" d="M -6 -15 h 12 v 30 h -12 z m 0 15 h 12"></path>
        <path id="9" d="M 6 15 v -30 h -12 v 15 h 12"></path>
        <rect id="square" x="-2.5" y="-2.5" width="5" height="5"></rect>
    </defs>
    <g transform="translate(0 50)">
        <!-- include the different values of the hours and minutes string at the following intervals
        14 35 65 86
        -->
        <g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="square" stroke-linejoin="square">
            {#if now}
            <g transform="translate(14 0)">
                <use href="#{hours[0]}"></use>
            </g>
            <g transform="translate(35 0)">
                <use href="#{hours[1]}"></use>
            </g>

            <g transform="translate(65 0)">
                <use href="#{minutes[0]}"></use>
            </g>
            <g transform="translate(86 0)">
                <use href="#{minutes[1]}"></use>
            </g>
            {/if}
        </g>
        <!-- colon separating the digits -->
        <g class="colon" transform="translate(50 0)">
            <use href="#square" y="-10"></use>
            <use href="#square" y="10"></use>
        </g>
    </g>
    <!-- the chicken was created for another project, and I'd rather scale the graphic down than recreating the shape with another set of coordinates -->
    <g transform="translate(25 100) scale(0.45)">
        <g opacity="0.35" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 0 0 q -25 -5 -25 -25 q -10 0 -10 12 q 0 -20 5 -20 q -15 0 -15 10 a 22.5 22.5 0 0 1 45 0 q 10 0 15 -20 q 0 -8 -5 -8 q 15 0 15 8 l 5 5 l -5 5 q 0 33 -25 33"></path>
        </g>
    </g>
</svg>
