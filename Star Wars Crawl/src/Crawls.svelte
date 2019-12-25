<script>
	import Logo from './Logo.svelte';
	export let title;
	export let text;
</script>

<style>
	#screen {
		color: hsl(205, 100%, 50%);
		height: 450px;
		width: 100%;
		overflow: hidden;
		perspective: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}
	#logo {
		transform: translateZ(0px);
		opacity: 0;
	}

	#intro {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		padding: 1rem;
	}
	#intro h2 {
		margin: auto;
		line-height: 1.5;
		font-size: 2rem;
	}

	#crawl {
		color: hsl(60, 100%, 50%);
		position: absolute;
		top: 0;
		left: 0;
		transform-origin: 50% 100%;
		transform: translateZ(250px) rotateX(25deg) translateY(0%);
		padding: 1rem 0;
		font-size: 1.5rem;
	}
	#crawl h1 {
		text-align: center;
		text-transform: uppercase;
		font-weight: 500;
	}
	#crawl p {
		line-height: 2.5;
	}
</style>

<div id="screen">
	<div id="intro">
		<h2>A long time ago in a galaxy far, far away....</h2>
	</div>
	<div id="logo">
		<Logo />
	</div>

	<main id="crawl">
		<h1>
			{title}
		</h1>
		<p>
			{text}
		</p>
	</main>
</div>