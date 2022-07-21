<script>
  export let value = '';
</script>

<form on:submit|preventDefault>
  {#each Array(10).fill() as _, i}
    <button
      type="button"
      on:click={() => {
        value += i;
      }}
    >
      {i}
    </button>
  {/each}

  <button
    type="button"
    on:click={() => {
      value = '';
    }}
    disabled={!value}
  >
    Clear
  </button>

  <button type="submit" disabled={!value}> Submit </button>
</form>

<style>
  form {
    background: hsl(0, 0%, 90%);
    padding: 0.5rem 0.5rem;
    max-width: 280px;
    width: 90vw;
    display: grid;
    gap: 0rem 0rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.25rem;
  }

  button {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    border: none;
    aspect-ratio: 1;
    background: hsl(0, 0%, 100%);
  }

  button:focus {
    outline: 1px solid currentColor;
  }

  button:active {
    background: hsl(0, 0%, 90%);
  }

  button:first-of-type {
    grid-column: 2;
    grid-row: 4;
  }
</style>
