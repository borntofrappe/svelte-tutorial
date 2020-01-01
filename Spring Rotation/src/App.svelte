<script>
  import { spring } from "svelte/motion";
	import Illustration from "./Illustration.svelte";
	import { telephoneCheck } from "./utils.js";

  const angle = 20;
  let rotation = spring({
    x: 0,
    y: 0
  });

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
	}

	let isValid = false;
	let phone = '1 (134) 756 4258';

	$: isValid = telephoneCheck(phone);

</script>

<style>
  :global(body) {
    perspective: 400px;
  }
  form {
		background: hsl(220, 2%, 10%);
    color: hsl(30, 85%, 90%);
    padding: 1.5rem 2rem;
    width: 300px;
    transform: translateZ(-50px) rotate3d(0, 0, 0, 25deg);
	}
	form > * + * {
		margin-top: 1rem;
	}
	label {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 0.8rem;
		letter-spacing: 1px;
		color: hsl(0, 0%, 80%);
		line-height: 2;
	}
	input {
		width: 100%;
		border: none;
		font-family: inherit;
		color: inherit;
		padding: 0.2rem 0.8rem;
		background: hsl(0, 0%, 25%);
		outline: none;
		font-size: 1rem;
	}
	input:focus {
    background: hsl(0, 0%, 15%);
	}
</style>

<svelte:window on:mousemove="{handleMousemove}"></svelte:window>

<form e:preventDefault style="transform: translateZ(-50px) rotate3d({$rotation.y * -1}, {$rotation.x}, 0, {angle}deg)">
	<Illustration {isValid}/>
	<label>
		US Phone
		<input type="text" bind:value="{phone}" on:change="{(e) => phone = e.target.value}"/>
	</label>

</form>