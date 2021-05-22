<script>
  export let value = '';

  const select = (v) => {
    if (v === 0 && !value) return;
    if (value.length >= 6) return;

    value += v;
  };
</script>

<form on:submit|preventDefault>
  {#each Array(10).fill() as _, i}
    <button type="button" on:click={() => select(i)}>
      {i}
    </button>
  {/each}

  <button disabled={!value} type="submit">
    <span class="visually-hidden">Start timer</span>
    <svg viewBox="-50 -50 100 100" width="30" height="30">
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="20"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M -25 -40 l 60 40 -60 40z" />
      </g>
    </svg>
  </button>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  button {
    color: inherit;
    font-size: 1.5rem;
    margin: 0;
    border: none;
    background: none;
    aspect-ratio: 1;
  }

  button:not(:last-of-type) {
    opacity: 0.3;
    transition: opacity 0.2s ease-out;
    position: relative;
    z-index: 5;
  }

  button:not(:last-of-type)::before {
    z-index: -5;
    content: '';
    background: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 80%;
    height: 80%;
    border-radius: 50%;
    opacity: 1;
  }

  button:not(:last-of-type):hover::before {
    transition: transform 0.5s ease-out, opacity 0.3s ease-out;
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }

  button:not(:last-of-type):hover,
  button:not(:last-of-type):focus {
    opacity: 1;
  }

  button:first-of-type {
    grid-column: 2;
    grid-row: 4;
  }

  button:last-of-type {
    grid-column: 2;
    transition: opacity 0.25s ease-out, box-shadow 0.2s ease-out;
    margin: 22%;
    padding: 18%;
    border-radius: 50%;
    background: hsl(208, 100%, 50%);
    box-shadow: 0px 1px 2px hsl(208, 100%, 50%);
  }

  button:last-of-type svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  button:last-of-type:hover,
  button:last-of-type:focus {
    box-shadow: 0px 1px 5px hsl(208, 100%, 50%);
  }

  button[disabled] {
    opacity: 0;
  }
</style>
