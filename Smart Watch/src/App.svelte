<script>
  /* import the different components
	the idea is to show the different components in a chain of if:else statements
	*/
  import DigitalWatch from './DigitalWatch.svelte';
  import Calculator from './Calculator.svelte';
  import Counter from './Counter.svelte';
  import AnalogWatch from './AnalogWatch.svelte';

  import { onDestroy } from 'svelte';

  // app is a counter variable which describes the component being displayed
  let app = 0;

  // screen refers to the container nesting the component(s)
  // the idea is to have a reference to the element to add/remove a class of .changing and create the curtain transition
  let screen;

  // timeout refers to the identifier of the timeout used to toggle the class of .changing on the container
  let timeout;

  // for some reason starting without a class of .changing doesn't allow for the transition
  // use a conditional statement to remove the existing class
  $: if (screen) {
    screen.classList.remove('changing');
  }

  // following a click on the prev/next buttons change the app to refer to the previous/following application
  // ! use classList methods to toggle the class and prevent changing the screen twice before the timeout has a change to run out
  function changeApp(direction) {
    if (!screen.classList.contains('changing')) {
      screen.classList.add('changing');
      timeout = setTimeout(() => {
        if (direction === 'next') {
          app = app === 3 ? 0 : app + 1;
        } else {
          app = app === 0 ? 3 : app - 1;
        }
        screen.classList.remove('changing');
        clearTimeout(timeout);
      }, 800);
    }
  }

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<div>
  <section>
    <main class="changing" bind:this={screen}>
      {#if app === 0}
        <DigitalWatch />
      {:else if app === 1}
        <Calculator />
      {:else if app === 2}
        <Counter />
      {:else}
        <AnalogWatch />
      {/if}
    </main>
  </section>
  <nav>
    <button aria-label="Previous Gadget" on:click={() => changeApp('prev')} />
    <button arial-label="Next Gadget" on:click={() => changeApp('next')} />
  </nav>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    filter: drop-shadow(0 0 0.65rem hsl(0, 0%, 80%));
    height: 18rem;
  }

  section {
    width: 18rem;
    height: 100%;
    padding: 2rem;
    background: hsl(0, 0%, 95%);
    background: linear-gradient(
        to right,
        transparent 25%,
        hsl(0, 0%, 5%) 25%,
        hsl(0, 0%, 5%) 75%,
        transparent 75%
      ),
      hsl(0, 0%, 100%);
  }

  main {
    width: 100%;
    height: 100%;
    background: hsl(120, 30%, 58%);
    border: 0.25rem solid hsl(0, 0%, 5%);
    position: relative;
  }
  main:before,
  main:after {
    content: '';
    position: absolute;
    left: 0%;
    width: 100%;
    height: 50%;
    background: hsl(0, 0%, 5%);
    transform: scaleY(0);
    z-index: 10;
    transition: transform 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  main:before {
    top: 0%;
    transform-origin: 50% 0%;
  }
  main:after {
    bottom: 0%;
    transform-origin: 50% 100%;
  }
  main.changing:before,
  main.changing:after {
    transform: scaleY(1);
  }

  nav {
    width: 5rem;
    height: 100%;
    padding: 3rem 2rem;
    padding-left: 0rem;
    background: hsl(0, 0%, 100%);
    border-radius: 0 5rem 5rem 0;
    display: flex;
    flex-direction: column;
  }
  nav button {
    background: hsl(360, 85%, 65%);
    border: 0.25rem solid hsl(0, 0%, 5%);
    flex-grow: 1;
  }
  nav button:active {
    filter: brightness(95%);
  }
  nav button:first-of-type {
    border-top-right-radius: 2rem;
    border-bottom: none;
  }
  nav button:last-of-type {
    border-bottom-right-radius: 2rem;
  }
</style>
