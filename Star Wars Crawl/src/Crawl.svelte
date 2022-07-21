<script>
  import Logo from './Logo.svelte';
  import { convertToRoman } from './utils.js';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let title;
  export let text;
  // for the number of the episode pick a random integer at random and convert it to a roman numeral
  const episode = convertToRoman(Math.ceil(Math.random() * 100));
</script>

<div>
  <header>
    <Logo />
  </header>

  <!-- dispatch an event when the animation is complete -->
  <main on:animationend={() => dispatch('end')}>
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
</div>

<style>
  /* add a perspective to the div container
  this affects the z translation specified for the logo
  && the transform values for the crawl's own text
  */
  div {
    color: hsl(60, 100%, 50%);
    height: 350px;
    width: 100%;
    /* hide the crawl outside of the div container */
    overflow: hidden;
    perspective: 300px;
    /* center the logo in the div container
    the crawl is absolute positioned at the bottom of the div
    */
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  /* absolute position the crawl at the bottom of the div */
  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    /* animate the crawl to scroll upwards */
    transform-origin: 50% 100%;
    transform: rotateX(25deg) translateY(100%);
    animation: scrollUpwards 50s linear;
  }
  /* animate the container wrapping the logo to move away from the viewer's perspective */
  header {
    /* specify a different timing function for the opacity, to retain higher values for a longer stretch of time */
    animation-name: moveFurther, fadeOut;
    animation-timing-function: cubic-bezier(0.59, -0.01, 0.75, 0.02),
      cubic-bezier(0.895, 0.03, 0.685, 0.22);
    animation-duration: 7s;
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

  /* the animations are triggered as soon as the components are rendered */
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
