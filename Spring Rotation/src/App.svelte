<script>
  import { spring } from "svelte/motion";
  import Illustration from "./Illustration.svelte";
  import Form from "./Form.svelte";
  import { telephoneCheck } from "./utils.js";

	let contact = {
		name: 'George Cartwright',
		title: 'Hen Supervisor',
		phone: '1 (134) 756 4258',
	}
	let isValid = telephoneCheck(contact.phone);

	function handleSubmit(e) {
		const { detail } = e;
		console.log(e);
	}

  const angle = 20;
  let rotation = spring({
    x: 0,
    y: 0,
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
</script>

<style>
  :global(body) {
    perspective: 400px;
	}
	div {
		width: 280px;
		background: hsl(220, 2%, 10%);
		color: hsl(30, 85%, 90%);
		padding: 1.5rem 2rem;
		transform: translateZ(0px) rotate3d(0, 0, 0, 20deg);
	}
</style>

<!-- <svelte:window on:mousemove="{handleMousemove}"></svelte:window> -->
<!-- style="transform: translateZ(-50px) rotate3d({$rotation.y * -1}, {$rotation.x}, 0, {angle}deg);" -->
<div>
	<Illustration {isValid} />
	<Form
		on:phone="{(e) => isValid = telephoneCheck(e.detail)}"
		on:submit={handleSubmit}
		{...contact} />
</div>


