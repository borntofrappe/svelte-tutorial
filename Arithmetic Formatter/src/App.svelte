<script>
  let num1 = 0;
  let num2 = 0;
  let operator = "+";
</script>

<style>
  form {
    display: grid;
    grid-template-columns: 5rem 8rem;
    grid-auto-rows: 5rem;
  }
  input:first-of-type,
  button {
    grid-column: span 2;
  }
  input,
  select,
  button {
    padding: 0.5rem;
    margin: 0.5rem;
    color: inherit;
    font-family: inherit;
    font-weight: bold;
    font-size: 2.5rem;
    text-align: right;
    border: none;
    background: inherit;
    transition: all 0.5s ease-in-out;
    box-shadow: 0 0 0.3rem hsl(0, 0%, 0%), 0.1rem 0.2rem 0.3rem hsl(0, 0%, 0%), 0.1rem -0.2rem 0.3rem hsl(0, 0%, 10%);
  }
  input:focus,
  select:focus,
  button:focus,
  input:hover,
  select:hover,
  button:hover {
    outline: none;
    box-shadow: 0 0 0.1rem hsl(0, 0%, 0%), 0.1rem 0.2rem 0.1rem -0.1rem hsl(0, 0%, 0%), 0.1rem -0.1rem 0.1rem hsl(0, 0%, 10%);
  }
  input::selection {
    background: hsl(0, 0%, 50%);
  }
  select option {
    background: hsl(0, 0%, 5%);
    color: hsl(0, 0%, 96%);
  }
  button {
    text-align: center;
  }
</style>

<form on:submit|preventDefault>
  <input type="number" bind:value="{num1}" min="0" max="9999" step="1" />
  <select bind:value="{operator}">
    <option value="+">+</option>
    <option value="-">-</option>
  </select>
  <input type="number" bind:value="{num2}" min="0" max="9999" step="1" />
  <button>=</button>
</form>
