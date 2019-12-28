<script>
  import Logo from "./Logo.svelte";
	import { convertToRoman } from "./utils.js";
	import { quartIn, sineInOut } from 'svelte/easing';

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
  main {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
		min-height: 100%;
    transform-origin: 50% 100%;
    transform: rotateX(25deg) translateY(100%);
    padding: 1rem 0;
		animation: scrollUpwards 60s linear;
  }
	div {
		animation-name: moveFurther, fadeOut;
		animation-timing-function: cubic-bezier(0.59,-0.01,0.75,0.02), cubic-bezier(0.895, 0.03, 0.685, 0.22);
		animation-duration: 8s;
		animation-fill-mode: forwards;
	}
  main h1,
  main h2 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
  }
  main p {
    line-height: 2.5;
  }

	@keyframes moveFurther {
		to {
			transform: translateZ(-1500px);
		}
	}
	@keyframes fadeOut {
		to {
			opacity: 0;
		}
	}
	@keyframes scrollUpwards {
		to {
			transform: rotateX(25deg) translateY(-200%);
		}

	}
</style>

<section>
	<div>
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
