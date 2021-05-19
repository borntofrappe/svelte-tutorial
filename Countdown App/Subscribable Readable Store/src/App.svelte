<script>
  /* Helpful resources
		https://svelte.dev/tutorial/writable-stores
		https://svelte.dev/tutorial/readable-stores
	*/
  import { time } from './stores.js';

  let time_value = new Date();
  let unsubscribe;
  let checked;

  $: if (checked) {
    unsubscribe = time.subscribe((value) => {
      time_value = value;
    });
  } else if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }

  const formatter = new Intl.DateTimeFormat('en', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
</script>

<label>
  <input type="checkbox" bind:checked />
  <span>keep track</span>
</label>

<h1>
  {formatter.format(time_value)}
</h1>

<style>
  :global(body) {
    background: hsl(35, 90%, 98%);
  }
  h1 {
    font-size: 2.5rem;
    font-family: monospace;
    letter-spacing: 1px;
    display: inline-block;
    font-feature-settings: tnum;
    padding: 0.15rem 0.35rem;
    text-align: center;
    border: 3px solid currentColor;
    border-radius: 0.5rem;
    position: relative;
    background: hsl(35, 90%, 97%);
  }

  h1::before {
    position: absolute;
    content: '';
    width: 25%;
    height: 0.2rem;
    background: currentColor;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -0.35rem);
  }

  h1::before,
  h1::after {
    position: absolute;
    content: '';
    background: currentColor;
    left: 50%;
    transform: translate(-50%, 0);
    border: inherit;
    background: hsl(50, 90%, 75%);
  }

  h1::before {
    height: 0.1em;
    bottom: 100%;
    width: 70%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  h1::after {
    height: 0.15em;
    top: 100%;
    width: 80%;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }

  ::selection {
    background: hsla(50, 90%, 50%, 0.5);
  }
</style>
