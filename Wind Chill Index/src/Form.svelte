<script>
    // following the submit event dispatch a function to update the windchill index
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // import the function and the boundaries for the temperature and speed
    import { windChill, bounds } from "./utils.js";

    // set up the variables used in the form
    let isMetric = true;
    // include default values
    let temperature = -20;
    let speed = 4.8;

    // extract the boundaries for the temperature and speed to include the values in the matching input element
    const { temperature: maxTemperature, speed: minSpeed } = bounds;

    // following the submit event compute the windChillIndex based on the input values
    // dispatch the submit event passing the value in the .details property
    // ! include the input values as well to have the result component describe every value
    function handleSubmit() {
        const index = windChill(isMetric, temperature, speed);
        dispatch("submit", {
            isMetric,
            temperature,
            speed,
            index
        });
    }
</script>

<style>
    form {
        background: hsl(210, 25%, 25%);
        color: hsl(210, 25%, 85%);
        box-shadow: 0 1px 10px -5px hsla(220, 20%, 2%, 0.4);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    form > * + * {
        margin-top: 2rem;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    label > * + * {
        margin-left: 1.25rem;
    }
    span {
        font-size: 1.5rem;
        font-weight: 700;
    }
    input[type="number"] {
        text-align: right;
        font-family: inherit;
        color: inherit;
        width: 5rem;
        height: 3rem;
        padding: 0.5rem;
        font-size: 1.2rem;
        border: none;
        background: hsla(210, 25%, 80%, 0.15);
        border-radius: 12px;
        opacity: 0.7;
        outline: none;
    }
    input[type="number"]:focus {
        opacity: 1;
    }
    sub {
        font-size: 1.2rem;
    }
    input[type="number"] + sub + svg {
        display: block;
        height: 64px;
        width: auto;
    }
    input[type="number"] + sub + svg .scale,
    input[type="number"] + sub + svg .rotate {
        transition: transform 3s cubic-bezier(0.175, 0.885, 0.32, 1.5);
    }

    input[type="number"]:focus + sub + svg .scale {
        transform: scaleY(1);
    }
    input[type="number"]:focus + sub + svg .rotate {
        transform: rotateY(-30deg);
    }

    input[type="checkbox"] {
        color: inherit;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 64px;
        opacity: 0;
    }
    input[type="checkbox"] + svg {
        opacity: 0.7;
    }
    input[type="checkbox"]:focus + svg,
    input[type="checkbox"]:active + svg {
        opacity: 1;
    }
    input[type="checkbox"] + svg {
        display: block;
        width: 64px;
        height: auto;
    }
    input[type="checkbox"] + svg .translate {
        transition: transform 0.5s ease-in-out;
    }
    input[type="checkbox"]:checked + svg .translate {
        transition: transform 0.25s ease-in-out;
        transform: translate(0px);
    }
    button {
        margin-top: 2.5rem;
        background: hsla(210, 25%, 15%);
        border: none;
        border-bottom: 2px inset hsl(210, 25%, 0%);
        padding: 1rem 1rem;
        border-radius: 10px;
        font-family: inherit;
        font-size: 1rem;
        letter-spacing: 0.015rem;
        color: inherit;
        text-transform: uppercase;
        position: relative;
    }
</style>

<!--
markup
	form
		one input of type number for the temperature and speed each
		one input of type checkbox for the unit of measure
		button to submit the form

	heading describing the index
-->
<form on:submit|preventDefault="{handleSubmit}">
    <!-- wrap each input in a label -->
    <label>
        <span>Temperature</span>
        <!-- change the min and max attributes according to the chosen unit of measure
            accordingly, change the text for the unit of measure
        -->
        <input required type="number" bind:value={temperature} max={isMetric ? maxTemperature.metric : maxTemperature.imperial} step="0.1" />
        <sub>{isMetric ? 'c°' : 'f°'}</sub>
        <svg viewBox="0 0 22 51" width="66" height="153">
            <g transform="translate(10.5 7.5)" stroke-linecap="round" stroke-linejoin="round">
                <g stroke="hsl(210, 25%, 40%)" stroke-width="3">
                    <path id="line" d="M 0 2 h 10"></path>
                    <use href="#line" y="6"></use>
                    <use href="#line" y="12"></use>
                    <use href="#line" y="18"></use>
                </g>
                <path stroke="hsl(210, 25%, 40%)" stroke-width="15" d="M 0 0 v 30 a 3 3 0 0 0 0 6 a 3 3 0 0 0 0 -6"></path>
                <path stroke="hsl(210, 25%, 20%)" stroke-width="5" d="M 0 0 v 30 a 3 3 0 0 0 0 6 a 3 3 0 0 0 0 -6"></path>
                <g transform="translate(0 -3.5)">
                    <path class="scale" transform="scale(1 0)" stroke-linecap="initial" stroke="hsl(210, 25%, 40%)" stroke-width="5" d="M 0 0 v 30"></path>
                </g>
                <path stroke="hsl(210, 25%, 20%)" stroke-width="5" d="M 0 30 a 3 3 0 0 0 0 6 a 3 3 0 0 0 0 -6"></path>
            </g>
        </svg>
    </label>
    <label>
        <span>Speed</span>
        <input required type="number" bind:value={speed} min={isMetric ? minSpeed.metric : minSpeed.imperial} step="0.1" />
        <sub>{isMetric ? 'km/h' : 'mph'}</sub>
        <svg viewBox="0 0 93 84" width="93" height="84">
            <g transform="translate(4 65)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
                <g transform="translate(47.5 0)">
                    <g class="rotate">
                        <g transform="translate(-47.5 0)">
                            <path fill="none" stroke="hsl(210, 25%, 40%)" d="M 10 0 q 18.75 0 37.5 -5 q 18.75 5 37.5 5"></path>
                            <g fill="hsl(210, 25%, 40%)" stroke="hsl(210, 25%, 40%)">
                                <path d="M 10 0 h 37.5 v 15 v -15 h 37.5 l -8 -7 l 8 7 l -8 7 l 8 -7 h -60 l -10 -10 h -15 l 10 10 l -10 10 h 15 l 10 -10"></path>
                                <path d="M 47.5 0 v -10 q -25 -5 -25 -25 q -10 0 -10 12 q 0 -20 5 -20 q -15 0 -15 10 a 22.5 22.5 0 0 1 45 0 q 10 0 15 -20 q 0 -8 -5 -8 q 15 0 15 8 l 5 5 l -5 5 q 0 33 -25 33"></path>
                            </g>
                            <circle cx="68" cy="-52" r="3" stroke="none" fill="hsl(210, 25%, 20%)"></circle>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </label>
    <label for="unit">
        <span>Imperial</span>
        <input bind:checked="{isMetric}" type="checkbox" name="unit" id="unit" />
        <svg viewBox="0 0 100 60" width="100" height="60">
            <rect fill="hsla(210, 25%, 80%, 0.15)" x="0" y="0" width="100" height="60" rx="30"></rect>
            <circle fill="hsl(210, 25%, 90%)" class="translate" cx="75" cy="30" r="17" transform="translate(-50 0)"></circle>
        </svg>
        <span>Metric</span>
    </label>
    <button>
        Calculate
    </button>
</form>
