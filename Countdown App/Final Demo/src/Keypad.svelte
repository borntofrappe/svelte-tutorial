<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import Input from './Input.svelte';

  let value;

  $: time = getTime(value);
  $: timeMarkup = Object.entries(time)
    .map(([a, b]) => `${b}<span>${a}</span>`)
    .join(' ');

  function getTime(v = '') {
    const [h, m, s] = v
      .padStart(6, '0')
      .replace(/(\d{2})/g, '$1:')
      .split(':');
    return { h, m, s };
  }

  function handleSubmit() {
    const { h, m, s } = time;
    const countdown = [s, m, h].reduce(
      (acc, curr, i) => acc + parseInt(curr, 10) * 60 ** i,
      0
    );
    dispatch('countdown', countdown);
  }
</script>

<header>
  <h1 class:translucent={!value}>
    {@html timeMarkup}
  </h1>

  <button
    disabled={!value}
    on:click={() => {
      value = value.slice(0, -1);
    }}
  >
    <span class="visually-hidden">Remove last digit</span>
    <svg viewBox="-50 -50 100 100" width="1em" height="1em">
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M -46 0 l 28 -32 h 64 v 64 h -64z" />
        <path d="M 3 -11 l 22 22 m -22 0 l 22 -22" />
      </g>
    </svg>
  </button>
</header>

<hr />

<Input bind:value on:submit={handleSubmit} />

<style>
  header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }

  h1 {
    font-size: 1.75rem;
    flex-grow: 1;
    text-align: center;
    font-weight: initial;
    letter-spacing: 1px;
    word-spacing: 0.5rem;
    transition: opacity 0.2s ease-in-out;
  }

  h1.translucent {
    opacity: 0.3;
  }

  h1 :global(span) {
    font-size: 1rem;
    margin-left: 0.15rem;
  }

  button {
    width: 3rem;
    height: 3rem;
    border: none;
    color: inherit;
    background: none;
    padding: 0.5rem;
    margin: 0;
    opacity: 0.3;
    transition: opacity 0.2s ease-in-out;
  }

  button:hover,
  button:focus {
    opacity: 1;
  }

  hr {
    transform: scaleY(0.5);
    opacity: 0.5;
  }

  button svg {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
