<script>
    // describe the variables received from the parent component
    export let isMetric;
    export let temperature;
    export let speed;
    export let index;
</script>

<!-- include the values in a wrapping container -->
<main>
    <h2>Temperature: {temperature} {isMetric ? 'c°' : 'f°'}</h2>
    <h2>Speed: {speed} {isMetric ? 'km/h' : 'mph'}</h2>
    <h1>Wind Chill Index: {index}</h1>
</main>
