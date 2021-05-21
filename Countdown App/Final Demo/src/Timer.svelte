<script>
  import { fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let seconds;
  let interval;

  function handleNewTimer() {
    dispatch('new');
  }

  function handleToggle() {
    if (interval) {
      clearInterval(interval);
    } else {
      // set up interval
    }
  }

  function handleReset() {
    clearInterval(interval);
    // reset to seconds
  }
</script>

<svg in:fly={{ y: -5 }} viewBox="-50 -50 100 100" width="250" height="250">
  <title>Remaining seconds: {seconds}</title>
  <g
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle stroke="#0088ff" r="46" />
    <path
      stroke="currentColor"
      d="M 0 -46 a 46 46 0 0 1 0 92 46 46 0 0 1 0 -92"
      pathLength="1"
      stroke-dasharray="1"
      stroke-dashoffset={0}
    />
  </g>
  <g fill="#0088ff" stroke="none">
    <g transform="scale(-1 1)">
      <g transform="rotate({0})">
        <g transform="translate(0 -46)">
          <circle r="4" />
        </g>
      </g>
    </g>
  </g>

  <g
    fill="currentColor"
    font-weight="bold"
    text-anchor="middle"
    dominant-baseline="middle"
    font-size="14"
  >
    <text y="2">
      {seconds}
    </text>
  </g>
</svg>

<div in:fly={{ y: -10, delay: 100 }}>
  <button on:click={handleNewTimer}>New timer</button>

  <button on:click={handleToggle}>
    <span class="visually-hidden">{interval ? 'Pause timer' : 'Run timer'}</span
    >
    <svg viewBox="-50 -50 100 100" width="30" height="30">
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="20"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d={interval
            ? 'M -25 -30 v 60 m 50 0 v -60'
            : 'M -25 -40 l 60 40 -60 40z'}
        />
      </g>
    </svg>
  </button>

  <button on:click={handleReset}>Reset timer</button>
</div>

<style>
  svg {
    display: block;
    width: 75%;
    height: auto;
    margin: 1rem auto 2rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  button:nth-of-type(odd) {
    font-size: 0.85rem;
    color: inherit;
    border: none;
    background: none;
    font-size: 1rem;
    text-transform: capitalize;
  }

  button:nth-of-type(odd):hover {
    text-decoration: underline;
  }

  button:nth-of-type(2) {
    color: inherit;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    padding: 1rem;
    background: hsl(210, 98%, 52%);
    box-shadow: 0px 1px 2px hsl(210, 98%, 52%);
    transition: box-shadow 0.2s ease-in-out;
  }

  button:nth-of-type(2):hover,
  button:nth-of-type(2):focus {
    box-shadow: 0px 1px 5px hsl(210, 98%, 52%);
  }

  button:nth-of-type(2) svg {
    margin: initial;
    display: block;
    width: 100%;
    height: auto;
  }
</style>
