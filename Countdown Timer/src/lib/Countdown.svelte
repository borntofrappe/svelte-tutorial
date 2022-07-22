<script>
  import { onMount, createEventDispatcher } from "svelte";

  import { jiggleJS as jiggle } from "./utils.js";

  const dispatch = createEventDispatcher();

  export let time = 5;

  onMount(() => {
    let date = new Date(new Date().getTime() + time * 1000);

    const interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval);
        dispatch("end");
      } else {
        time = Math.round((date.getTime() - new Date().getTime()) / 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<circle r="10" fill="#f9c801" stroke="#3c3c3c" />
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
  {#key time}
    <g in:jiggle>
      <text>{time}</text>
    </g>
  {/key}
</g>
