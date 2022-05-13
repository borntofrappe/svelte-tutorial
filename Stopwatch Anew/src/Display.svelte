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

  const duration = 150;
  const threshold = 1000 - duration * 2;

  $: offsetDot = s;
  const scaleDot = tweened(1, { duration });

  $: if (ms > threshold) {
    const offsetNext = (s + 1) % 60;
    scaleDot.set(0).then(() => {
      scaleDot.set(1);
    });
  }
</script>

<main>
  <h2 class="visually-hidden">Current timing</h2>
  <strong>{timer}</strong>
</main>

<svg viewBox="0 0 60 1">
  <defs>
    <circle r="0.2" />
    <pattern
      id="p"
      viewBox="-0.5 -0.5 1 1"
      width="1"
      height="1"
      patternUnits="userSpaceOnUse"
    >
      <circle r="0.1" />
    </pattern>
  </defs>
  <rect width="60" height="1" fill="url(#p)" />
  <g transform="translate(0.5 0.5)">
    <g transform="translate({offsetDot} 0)">
      <g transform="scale({$scaleDot})">
        <circle r="0.5" fill="currentColor" />
      </g>
    </g>
  </g>
</svg>

<style>
  main {
    text-align: center;
  }

  strong {
    font-size: 3.25rem;
    font-weight: 400;
  }

  svg {
    max-width: 18rem;
    display: block;
    margin: 1rem auto 2rem;
  }
</style>
