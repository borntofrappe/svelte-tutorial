<script>
  import { spring } from "svelte/motion";
	import Front from './Front.svelte';
	import Back from './Back.svelte';

	let contact = {
		name: 'Cosmo Kramer',
		title: 'Movie Phone',
		phone: '1 (555) 555 3455',
	}

	function handleUpdate(e) {
		const { name, title, phone } = e.detail;
		contact = {
			name,
			title,
			phone,
		}
	};

	const options = {
		stiffness: 0.05,
		damping: 0.6,
	}
	const softness = {
		soft: 0.7
	}
	const rotation = spring({
		y: 0,
		z: 0
	}, options);
	let isRotated = true;

	$: if(isRotated) {
		rotation.set({
			y: 180,
			z: 450,
		}, softness);
	} else {
		rotation.set({
			y: 0,
			z: 0,
		}, softness);
	}

</script>

<style>
	:global(body) {
		perspective: 600px;
	}
	div {
		width: 280px;
		position: relative;
		transform: rotateY(0deg) rotateZ(0deg);
		transform-style: preserve-3d;
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

<div style="transform: rotateY({$rotation.y}deg) rotateZ({$rotation.z}deg)">
	<Front on:update="{handleUpdate}" {...contact}/>
	<Back {...contact} />
</div>

<button on:click="{() => isRotated = !isRotated}">
	Rotate
</button>

