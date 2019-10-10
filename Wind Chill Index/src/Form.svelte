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
        Temperature
        <!-- change the min and max attributes according to the chosen unit of measure
				accordingly, change the text for the unit of measure
 		-->
        <input required type="number" bind:value={temperature} max={isMetric ? maxTemperature.metric : maxTemperature.imperial} step="0.1" /> ({isMetric ? 'c°' : 'f°'})
    </label>
    <label>
        Speed <input required type="number" bind:value={speed} min={isMetric ? minSpeed.metric : minSpeed.imperial} step="0.1" /> ({isMetric ? 'km/h' : 'mph'})
    </label>
    <label>
        <!-- display the appropriate system of measurement next to the checkbox -->
        <input bind:checked="{isMetric}" type="checkbox" />
        {isMetric ? 'Metric' : 'Imperial'}
    </label>
    <button>
        Calculate
    </button>
</form>
