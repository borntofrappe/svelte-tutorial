<script>
  import { createEventDispatcher } from 'svelte';
  import { min, max } from './utils.js';

  const dispatch = createEventDispatcher();

  export let num1;
  export let num2;
  export let operator;

  function handleSubmit() {
    dispatch('update', {
      num1,
      operator,
      num2,
    });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={num1} type="number" {min} {max} step="1" />
  <select bind:value={operator}>
    <option value="+">+</option>
    <option value="-">-</option>
  </select>
  <input bind:value={num2} type="number" {min} {max} step="1" />
  <button>=</button>
</form>

<style>
  form {
    max-width: 10rem;
  }
  @supports (display: grid) {
    form {
      max-width: initial;
      display: grid;
      grid-template-columns: 5rem 7rem;
      grid-auto-rows: 5rem;
      grid-gap: 1.5rem;
    }
  }
  input:first-of-type,
  button {
    grid-column: span 2;
  }
  input,
  select,
  button {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    color: inherit;
    font-family: inherit;
    font-weight: bold;
    font-size: 2rem;
    text-align: right;
    border: none;
    background: inherit;
    transition: box-shadow 0.5s ease-in-out;
    box-shadow: 0 0 0.3rem hsl(0, 0%, 2%), 0.1rem 0.2rem 0.3rem hsl(0, 0%, 2%),
      0.1rem -0.2rem 0.3rem hsl(0, 0%, 10%);
  }
  input:focus,
  select:focus,
  button:focus,
  input:hover,
  select:hover,
  button:hover {
    outline: none;
    box-shadow: 0 0 0.1rem hsl(0, 0%, 2%),
      0.1rem 0.2rem 0.1rem -0.1rem hsl(0, 0%, 2%), 0 0rem 0.1rem hsl(0, 0%, 10%);
  }
  input::selection,
  button::selection {
    background: hsla(0, 0%, 90%, 0.2);
  }
  select option {
    background: hsl(0, 0%, 5%);
    color: hsl(0, 0%, 96%);
  }
  button {
    text-align: center;
  }
</style>
