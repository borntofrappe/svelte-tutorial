<script>
  const exponents = Array(8)
    .fill()
    .map((d, i, { length }) => 2 ** (length - (i + 1)));

  let digits = [];

  $: number = digits.reduce((acc, curr) => acc + curr, 0);
  $: disabled = !digits.some((digit) => digit !== 0);

  function shiftBitRight() {
    digits = digits.reduce(
      (acc, curr) =>
        Math.floor(curr / 2) !== 0 ? [...acc, Math.floor(curr / 2)] : [...acc],
      []
    );
  }

  function shiftBitLeft() {
    digits = digits.reduce(
      (acc, curr) =>
        curr !== 2 ** (exponents.length - 1)
          ? [...acc, Math.floor(curr * 2)]
          : [...acc],
      []
    );
  }

  $: console.log(digits);
</script>

<style>
  :global(body) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  :global(body > * + *) {
    margin-top: 1.25rem;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  label {
    display: inline-flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
  }

  label > * + * {
    margin-bottom: 0.75rem;
  }

  label svg {
    width: 7rem;
    height: 7rem;
    filter: grayscale(1);
  }

  label input:checked + svg {
    filter: grayscale(0);
  }

  p {
    font-size: 3rem;
  }

  div {
    display: flex;
    gap: 0 1.5rem;
  }

  button {
    text-transform: capitalize;
    letter-spacing: 1px;
    box-shadow: 0 0 0 2px currentColor;
    border: none;
    font-family: inherit;
    color: inherit;
    background: none;
    padding: 0.75rem 0.75rem;
    border-radius: 5px;
    font-size: 1rem;
    transition: box-shadow 0.2s ease-in-out;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    box-shadow: 0 0 0 3px;
  }

  button:not(:disabled):focus {
    outline: none;
    box-shadow: 0 0 0 3px, 0 0 0 6px hsl(0, 0%, 15%), 0 0 0 9px;
  }
</style>

<form on:submit|preventDefault>
  {#each exponents as exponent}
    <label>
      <span class="visually-hidden">2 to the power of {exponent}</span>
      <input type="checkbox" bind:group={digits} value={exponent} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-22.5 -37.5 45 52"
        width="1rem"
        height="1rem">
        <g>
          <circle
            fill="hsl(45, 90%, 55%)"
            stroke="hsl(0, 0%, 70%)"
            stroke-width="1"
            cy="-15"
            r="15" />
          <path
            fill="none"
            stroke="hsl(0, 0%, 100%)"
            stroke-width="0.5"
            d="M -2 0 v -12 a 3 3 0 0 0 -6 0 3 3 0 0 0 3 3 h 9 a 3 3 0 0 0 3 -3 3 3 0 0 0 -6 0 v 12" />
        </g>
        <g fill="hsl(0, 0%, 70%)" stroke="hsl(0, 0%, 60%)" stroke-width="1">
          <circle cy="9" r="5" />
          <rect x="-7" width="14" height="5" rx="2.5" />
          <rect x="-7" width="14" y="5" height="5" rx="2.5" />
        </g>
      </svg>
    </label>
  {/each}
</form>

<p>{number}</p>
<div>
  <button {disabled} on:click={shiftBitLeft}>Left shift &lt;&lt;</button>
  <button {disabled} on:click={shiftBitRight}>Right shift &gt;&gt;</button>
</div>
