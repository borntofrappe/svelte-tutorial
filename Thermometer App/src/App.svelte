<script>
  import Display from './Display.svelte';
  import Toggle from './Toggle.svelte';

  let value = 50;
  let min = 0;
  let max = 100;

  // clamp the value in the range of [min, max]
  $: if (value <= min) {
    value = min;
  }
  $: if (value >= max) {
    value = max;
  }

  // change the color palette according to the input of type checkbox
  let isDark = false;
  let main;
  $: if (main && isDark) {
    main.style.setProperty('color', 'var(--moon-text)');
    main.style.setProperty('background', 'var(--moon-bg)');
  }
  $: if (main && !isDark) {
    main.style.setProperty('color', 'var(--sun-text)');
    main.style.setProperty('background', 'var(--sun-bg)');
  }
</script>

<main bind:this={main}>
  <Toggle on:checked={() => (isDark = !isDark)} />

  <Display {value} {min} {max} />

  <hr />

  <form on:submit|preventDefault>
    <label>
      <h2>Value</h2>
      <p>Current temperature</p>
      <input type="number" bind:value />
    </label>
    <label>
      <h2>Min</h2>
      <p>Lower threshold</p>
      <input type="number" bind:value={min} />
    </label>
    <label>
      <h2>Max</h2>
      <p>Upper threshold</p>
      <input type="number" bind:value={max} />
    </label>
  </form>
</main>

<style>
  main {
    max-width: 20rem;
    width: 90vw;
    margin: 1rem auto;
    padding: 3rem 2rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    color: var(--color);
    background: var(--background);
    transition: color 0.25s ease-in-out, background 0.25s ease-in-out;
    box-shadow: 0 0.1rem 1.5rem -1.25rem hsla(0, 0%, 0%, 0.2);
  }

  main > * + * {
    margin-top: 1.5rem;
  }

  :global(main > label) {
    align-self: flex-end;
  }

  :global(main > svg) {
    align-self: center;
    width: 90%;
    height: auto;
    display: block;
  }

  hr {
    opacity: 0.2;
  }

  form > * + * {
    margin-top: 0.75rem;
  }

  form label {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  form label h2 {
    grid-column: 1/-1;
    font-weight: 600;
    font-size: 1.1rem;
  }

  form label p {
    font-size: 1rem;
    align-self: center;
  }

  form label input {
    color: inherit;
    align-self: center;
    font-size: 1rem;
    font-family: inherit;
    background: none;
    border: none;
    padding: 0.25rem 0.5rem;
    width: 100%;
    height: 100%;
    text-align: right;
  }
</style>
