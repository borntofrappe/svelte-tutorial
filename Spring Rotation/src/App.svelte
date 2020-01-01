<script>
  import { spring } from "svelte/motion";
  import Illustration from "./Illustration.svelte";
  import Form from "./Form.svelte";
  import Card from "./Card.svelte";
  import { telephoneCheck } from "./utils.js";

	let contact = {
		name: 'George Cartwright',
		title: 'Hen Supervisor',
		phone: '1 (134) 756 4258',
	}
	$: isValid = telephoneCheck(contact.phone);

	function handleUpdate(e) {
		const { name, title, phone } = e.detail;
		contact = {
			name,
			title,
			phone,
		}
	};

	let isSubmitted = false;

	const angle = 20;
  let rotation = spring({
    x: 0,
    y: 0
  });
  let translation = spring(0);

	$: if(!isSubmitted) {
		translation.set(0);
		rotation.set({
			x: 0,
			y: 0,
		});
	}

	function handleSubmit() {
		isSubmitted = !isSubmitted;
		if(!isSubmitted) {
				translation.set(0);
				rotation.set({
				x: 0,
				y: 0,
			});
		}
	}

  function handleMousemove({ x, y }) {
		if(isSubmitted) {
    const { innerWidth: width, innerHeight: height } = window;
    // [0,1] range
    const px = x / width;
    const py = y / height;
    // [-1,1] range
    const rx = px * 2 - 1;
    const ry = (py * 2 - 1) * -1;

    // from the API, a second object allows to customize how fast the properties reach the final value
    // https://svelte.dev/docs#spring
    rotation.set(
      {
        x: ry,
        y: rx
      }
    );

    const cx = Math.abs((x - width / 2) / (width / 2));
    const cy= Math.abs((y - height / 2) / (height / 2));
    const z = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));

    translation.set(z * 200 * -1 - 50);
		}
  }

</script>

<style>
	:global(body) {
		perspective: 400px;
	}
	div {
		width: 300px;
    color: hsl(30, 85%, 90%);
		background: hsl(220, 2%, 10%);
		padding: 1.5rem 2rem;
		transform: translateZ(0px) rotate3d(0, 0, 0, 20deg);
		position: relative;
		transition: transform 0.1s ease-in-out;
	}
	div > * + * {
		margin-top: 1.5rem;
	}

	button {
		margin-top: 1.2rem;
    color: inherit;
    background: none;
    border: 1px solid currentColor;
    padding: 0.5rem 1rem;
    letter-spacing: 2px;
    font-family: inherit;
    text-transform: uppercase;
  }
</style>

<svelte:window on:mousemove="{handleMousemove}"></svelte:window>
<div style="transform: translateZ({$translation}px) rotate3d({$rotation.x}, {$rotation.y}, 0, {angle}deg);">
	<Illustration {isValid} />
	{#if isSubmitted}
		<Card {...contact} />
	{:else}
		<Form
			on:update="{handleUpdate}"
			{...contact} />
	{/if}

</div>

<button on:click="{handleSubmit}">
	{isSubmitted ? 'Edit' : 'Submit'}
</button>

