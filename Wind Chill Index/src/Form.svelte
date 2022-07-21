<script>
  // following the submit event dispatch a function to update the windchill index
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // import the function and the boundaries for the temperature and speed
  import { windChill, bounds } from './utils.js';

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
    dispatch('submit', {
      isMetric,
      temperature,
      speed,
      index,
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
<form on:submit|preventDefault={handleSubmit}>
  <p>
    The <em>wind chill index</em> tries to estimate the lowering of body temperature
    considering air temperature and the wind's speed.
  </p>
  <!-- wrap each input in a label -->
  <label>
    <span>Temperature <sub>({isMetric ? 'c°' : 'f°'})</sub></span>
    <!-- change the min and max attributes according to the chosen unit of measure
            accordingly, change the text for the unit of measure
        -->
    <input
      required
      type="number"
      bind:value={temperature}
      max={isMetric ? maxTemperature.metric : maxTemperature.imperial}
      step="0.1"
    />
  </label>
  <label>
    <span>Speed <sub>({isMetric ? 'km/h' : 'mph'})</sub></span>
    <input
      required
      type="number"
      bind:value={speed}
      min={isMetric ? minSpeed.metric : minSpeed.imperial}
      step="0.1"
    />
  </label>
  <label for="unit">
    <span>Imperial</span>
    <input bind:checked={isMetric} type="checkbox" name="unit" id="unit" />
    <svg viewBox="0 0 100 60" width="100" height="60">
      <rect
        fill="hsla(210, 25%, 80%, 0.15)"
        x="0"
        y="0"
        width="100"
        height="60"
        rx="30"
      />
      <circle
        fill="hsl(210, 25%, 90%)"
        class="translate"
        cx="75"
        cy="30"
        r="17"
        transform="translate(-50 0)"
      />
    </svg>
    <span>Metric</span>
  </label>
  <button>Compute</button>
</form>

<style>
  form {
    background: hsl(215, 95%, 15%);
    color: hsl(210, 25%, 85%);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    box-shadow: 0 2px 10px -4px hsla(180, 60%, 0%, 0.1);
  }
  form > * + * {
    margin-top: 2.5rem;
  }
  p {
    line-height: 1.5;
  }
  p em {
    font-style: initial;
    border-bottom: 2px solid hsl(210, 25%, 85%);
  }
  label {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* position relative to absolute position the input of type checkbox where the svg is set to stay */
    position: relative;
  }
  label > * + * {
    margin-left: 1.25rem;
  }
  span {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.01rem;
  }
  sub {
    font-size: 1.2rem;
  }
  input[type='number'] {
    margin-left: auto;
    text-align: right;
    font-family: inherit;
    color: inherit;
    width: 5rem;
    height: 3rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    border: none;
    background: hsla(200, 70%, 55%, 0.2);
    border-radius: 12px;
    opacity: 0.7;
    outline: none;
    transition: opacity 0.2s ease-in-out;
  }
  input[type='number']:focus {
    opacity: 1;
  }

  /* absolute position the checkbox on top of the replacing svg */
  input[type='checkbox'] {
    color: inherit;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    opacity: 0;
  }
  input[type='checkbox'] + svg {
    opacity: 0.7;
    fill: hsla(200, 70%, 55%, 0.2);
    transition: opacity 0.25s ease-in-out;
  }
  input[type='checkbox']:focus + svg,
  input[type='checkbox']:active + svg {
    opacity: 1;
  }
  input[type='checkbox'] + svg {
    display: block;
    width: 64px;
    height: auto;
  }
  input[type='checkbox'] + svg .translate {
    transition: transform 0.25s ease-in-out;
  }
  input[type='checkbox']:checked + svg .translate {
    transition: transform 0.25s ease-in-out;
    transform: translate(0px);
  }

  button {
    outline: none;
    border: none;
    background: hsl(180, 60%, 85%);
    color: hsl(210, 25%, 0%);
    padding: 1rem;
    border-radius: 10px;
    font-family: inherit;
    font-size: 1.2rem;
    letter-spacing: 0.015rem;
    text-transform: uppercase;
    filter: drop-shadow(0px 5px hsl(180, 60%, 50%));
    transition: all 0.2s ease-in-out;
  }
  button:hover,
  button:focus {
    transform: translateY(2px);
    filter: drop-shadow(0px 3px hsl(180, 60%, 50%));
  }
  button:active {
    transform: translateY(5px);
    filter: drop-shadow(0px 0px hsl(180, 60%, 50%));
  }
</style>
