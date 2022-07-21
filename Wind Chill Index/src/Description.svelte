<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  // describe the variables received from the parent component
  export let isMetric;
  export let temperature;
  export let speed;
  export let index;
</script>

<!-- include the values in a wrapping container -->
<dl in:fly={{ y: -25, duration: 500, easing: quintOut }}>
  <dt>{index}</dt>
  <dd>WCI</dd>

  <dt>{temperature}</dt>
  <dd>{isMetric ? 'c°' : 'f°'}</dd>

  <dt>{speed}</dt>
  <dd>{isMetric ? 'km/h' : 'mph'}</dd>
</dl>

<style>
  dl {
    box-shadow: 0 2px 10px -4px hsla(180, 60%, 0%, 0.1);
    text-align: right;
    box-shadow: 0 1px 10px -5px hsla(220, 20%, 2%, 0.2);
    padding: 1.5rem 3rem;
    font-weight: 700;
    text-align: center;
    color: hsl(180, 60%, 85%);
  }
  dt {
    font-size: 7rem;
  }
  dt:nth-of-type(n + 2) {
    margin-top: 1rem;
    font-size: 2.5rem;
  }
  dd {
    margin-left: 0.75rem;
    color: hsl(180, 60%, 50%);
    font-size: 2rem;
    text-transform: uppercase;
  }
</style>
