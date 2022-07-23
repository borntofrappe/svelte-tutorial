<script>
  import { onMount, createEventDispatcher } from "svelte";

  import { jiggleJS as jiggle } from "./utils.js";
  import { createTimer } from "./stores.js";

  const dispatch = createEventDispatcher();

  export let time = 5;

  let timer;

  onMount(() => {
    timer = createTimer(time + 1);

    return () => {
      timer = null;
    };
  });

  $: if (timer && $timer === 0) {
    dispatch("end");
    timer = null;
  }
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
  font-size="14"
>
  {#key $timer - 1}
    <g in:jiggle>
      <text>{$timer - 1}</text>
    </g>
  {/key}
</g>
