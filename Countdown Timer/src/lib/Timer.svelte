<script>
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  import { createTimer } from "./stores.js";

  export let time = 20;

  let timer;
  onMount(() => {
    timer = createTimer(time);

    return () => {
      timer = null;
    };
  });

  $: if (timer && $timer === 0) {
    timer = null;
    dispatch("end");
  }
</script>

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
  <text>{$timer}</text>
</g>
