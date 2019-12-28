<script>
	import Logo from './Logo.svelte';
	import { convertToRoman } from './utils.js';
	export let title;
	export let text;

	const episode = convertToRoman(Math.ceil(Math.random() * 100));
</script>

<style>
	section {
		color: hsl(60, 100%, 50%);
		height: 450px;
		width: 100%;
		overflow: hidden;
		perspective: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}
	div {
		transform: translateZ(0px);
		opacity: 1;
	}
	main {
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: 50% 100%;
		transform: translateZ(250px) rotateX(25deg) translateY(10%);
		padding: 1rem 0;
		font-size: 1.5rem;
	}
	main h1, main h2 {
		text-align: center;
		text-transform: uppercase;
		font-weight: 500;
	}
	main p {
		line-height: 2.5;
	}
</style>

<section>
	<div id="logo">
		<Logo />
	</div>

	<main>
		<h2>
			Episode {episode}
		</h2>
		<h1>
			{title}
		</h1>
		<p>
			{text}
		</p>
	</main>
</section>