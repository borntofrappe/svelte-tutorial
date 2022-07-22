<script>
  import { onMount } from "svelte";

  export let time = 20;

  onMount(() => {
    let date = new Date(new Date().getTime() + time * 1000);

    const interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval);
      } else {
        time = Math.round((date.getTime() - new Date().getTime()) / 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<svg viewBox="-15.5 -15.5 30 30">
  <g
    text-anchor="middle"
    dominant-baseline="central"
    font-family="sans-serif"
    paint-order="stroke"
    fill="#ffffff"
    stroke="#3c3c3c"
    stroke-width="1.65"
    stroke-linejoin="round"
    stroke-linecap="round"
    font-size="15"
  >
    <text>{time}</text>
  </g>
</svg>

<style>
  svg {
    outline: 1px solid;
    max-width: 10rem;
  }
</style>
