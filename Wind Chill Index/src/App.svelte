<script>
	// import the function and the boundaries for the tempeature and speed
	import { windChill, bounds } from './utils.js';
	
	// set up the variables used throughout the project
	let isMetric = true;	
	let temperature;
	let speed;
	let windChillIndex;
	
	// extract the boundaries for the temperature and speed to include the values in the matching input element
	const { temperature: maxTemperature, speed: minSpeed } = bounds;

	// following the submit event compute the windChillIndex based on the input values
	function handleSubmit() {
		windChillIndex = windChill(isMetric, temperature, speed);
	}
	// following an input event set the index to null to conceal the previous value
	function handleInput() {
		if(windChillIndex) {
			windChillIndex = null;
		}
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
<form 
			on:input={handleInput}
			on:submit|preventDefault={handleSubmit}>
	<!-- wrap each input in a label -->
	<label>
		Temperature 
		<!-- change the min and max attributes according to the chosen unit of measure
				accordingly, change the text for the unit of measure
 		-->
		<input required type="number" bind:value={temperature} max={isMetric ? maxTemperature.metric : maxTemperature.imperial} step="0.1" />
		({isMetric ? 'c°' : 'f°'})
	</label>
	<label>
		Wind
		<input required type="number" bind:value={speed} min={isMetric ? minSpeed.metric : minSpeed.imperial} step="0.1" />
		({isMetric ? 'km/h' : 'mph'})
	</label>
	<label>
		<!-- display the approriate system of measurement next to the checkbox -->
		<input bind:checked={isMetric} type="checkbox">
		{isMetric ? 'Metric' : 'Imperial'}
	</label>
	<button>
		Calculate
	</button>
</form>

<!-- display the index conditional to the variable describing a value -->
{#if Number.isInteger(windChillIndex)}
	<h1>
		Windchill index: {windChillIndex}
	</h1>
{/if}