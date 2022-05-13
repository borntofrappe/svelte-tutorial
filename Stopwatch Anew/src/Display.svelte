<script>
  import { stopwatch } from "./stores.js";
  import { tweened } from "svelte/motion";

  let ms, s, m, i;

  $: {
    let time = $stopwatch;
    ms = time % 1000;
    time = Math.floor(time / 1000);
    s = time % 60;
    time = Math.floor(time / 60);
    m = time % 60;
  }

  const formatTime = (t) => `${t}`.slice(0, 2).padStart(2, 0);
  $: timer = `${formatTime(m)}:${formatTime(s)}.${formatTime(ms)}`;
</script>

<main>
  <h2 class="visually-hidden">Current timing</h2>
  <strong>{timer}</strong>
</main>

<style>
  main {
    text-align: center;
  }

  strong {
    font-size: 3.25rem;
    font-weight: 400;
  }
</style>
