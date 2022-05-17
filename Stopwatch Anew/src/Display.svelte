<script>
  import { stopwatch } from "./stores.js";
  import { tweened } from "svelte/motion";
  import { getTime, formatTime } from "./utils";

  let t, s, m;

  $: {
    const time = getTime($stopwatch);
    t = time.t;
    s = time.s;
    m = time.m;
  }

  $: timer = formatTime({ t, s, m });

  let tweening;
  const duration = 200;
  const threshold = 100 - Math.floor(duration / 10);

  $: offsetDot = s;

  const scaleDot = tweened(1, { duration });

  $: if (t > threshold && !tweening) {
    tweening = true;
    scaleDot.set(0).then(() => {
      scaleDot.set(1);
      tweening = false;
    });
  }
</script>

<main>
  <h2 class="visually-hidden">Current timing</h2>
  <p>{timer}</p>
</main>

<svg viewBox="0 0 60 1">
  <defs>
    <pattern
      id="stopwatch-pattern-dots"
      viewBox="-0.5 -0.5 1 1"
      width="1"
      height="1"
      patternUnits="userSpaceOnUse"
    >
      <circle r="0.1" />
    </pattern>
  </defs>
  <rect width="60" height="1" fill="url(#stopwatch-pattern-dots)" />
  <g transform="translate(0.5 0.5)">
    <g transform="translate({offsetDot} 0)">
      <g transform="scale({$scaleDot})">
        <circle r="0.5" fill="currentColor" />
      </g>
    </g>
  </g>
</svg>
