<script>
  import { spring } from "svelte/motion";

  const angle = 30;
  let rotation = spring({
    x: 0,
    y: 0
  });

  function handleMouseMove({ x, y }) {
    const { innerWidth: width, innerHeight: height } = window;
    // [0,1] range
    const px = x / width;
    const py = y / height;
    // [-1,1] range
    const rx = px * 2 - 1;
    const ry = py * 2 - 1;

    // from the API, a second object allows to customize how fast the properties reach the final value
    // https://svelte.dev/docs#spring
    rotation.set(
      {
        x: rx,
        y: ry
      },
      { soft: 0.7 }
    );
  }
</script>

<style>
  :global(body) {
    perspective: 400px;
  }
  svg {
    padding: 1.5rem 2rem;
    background: hsl(220, 2%, 10%);
    color: hsl(30, 85%, 90%);
    display: block;
    width: 300px;
    height: auto;
    transform: translateZ(-50px) rotate3d(0, 0, 0, 25deg);
  }
</style>

<svelte:window on:mousemove="{handleMouseMove}"></svelte:window>
<svg style="transform: translateZ(-50px) rotate3d({$rotation.y * -1}, {$rotation.x}, 0, {angle}deg)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 65" width="110" height="65">
  <rect id="line--half" x="55" width="55" height="5" fill="currentColor" />
  <use href="#line--half" y="10" />
  <use href="#line--half" y="20" />
  <use href="#line--half" y="30" />
  <rect id="line" y="40" width="110" height="5" fill="currentColor" />
  <use href="#line" y="10" />
  <use href="#line" y="20" />
  <g id="stars">
    <path id="star" transform="translate(10 10)" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" d="M 0 -5 L 3.25 5 -5 -1.25 5 -1.25 -3.25 5z" />
    <use href="#star" x="17.5" />
    <use href="#star" x="35" />
  </g>
  <use href="#stars" y="20" />
  <use href="#star" x="26.25" y="10" />
  <use href="#star" x="8.75" y="10" />
</svg>
