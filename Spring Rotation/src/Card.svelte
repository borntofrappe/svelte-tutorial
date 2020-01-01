<script>
  import Illustration from "./Illustration.svelte";

  import { spring } from "svelte/motion";

  export let name;
  export let title;
  export let phone;
  export let isValid;

  const angle = 20;
  let rotation = spring({
    x: 0,
    y: 0
  });
  let translation = spring(0);

  function handleMousemove({ x, y }) {
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
      { soft: 0.4 }
    );

    const cx = Math.abs((x - width / 2) / (width / 2));
    const cy= Math.abs((y - height / 2) / (height / 2));
    const z = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));

    translation.set(z * 200 * -1, {
      soft: 0.2,
    });
  }
</script>

<style>
  main {
    background: hsl(220, 2%, 10%);
		color: hsl(30, 85%, 90%);
    padding: 1.5rem 2rem;
    text-align: center;
  }
  main > * + * {
    margin-top: 1rem;
  }
  h1, h2 {
    font-family: 'Playfair Display', cursive;
    font-size: 1.5rem;
  }
  h3 {
    font-weight: 400;
  }
</style>

<svelte:window on:mousemove="{handleMousemove}"></svelte:window>
<main style="transform: translateZ({$translation}px) rotate3d({$rotation.y * -1}, {$rotation.x}, 0, {angle}deg);">
	<Illustration {isValid} />
  <h1>{name}</h1>
  <h2>{title}</h2>
  <h3>{phone}</h3>
</main>
