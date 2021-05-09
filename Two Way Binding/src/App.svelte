<script>
  import { tweened } from 'svelte/motion';
  import { quadInOut as easing } from 'svelte/easing';
  let value = tweened(0);

  function handleInput(e) {
    value.set(parseInt(e.target.value, 0), { duration: 0 });
  }

  function handleRelease() {
    if ($value === 0) return;
    value.set(0, { duration: 1000, easing });
  }

  $: offset = $value * 3;
  $: angle = $value * 14.2;
  $: charge = offset / 8;
</script>

<div>
  <svg viewBox="0 0 100 50">
    <defs>
      <path id="bird" d="M 0 0 a 2 2 0 0 1 2 2 2 2 0 0 1 2 -2" />
      <path
        id="cloud"
        d="M -5 10 h 5 m 3 0 a 2.5 2.5 0 0 0 0 -5 h -2 m 2 0 a 3 3 0 0 0 -3 -3 h -3 a 2.5 2.5 0 0 0 -2.5 2.5 a 2.5 2.5 0 0 0 0 5.5"
      />
    </defs>
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g transform="translate({offset * -1} 0)">
        {#each Array(5).fill() as _, i}
          <use
            transform="translate({70 * (i + 1)} {Math.floor(
              Math.random() * 7.5 + 2.5
            )}) scale({Math.random() > 0.5 ? 1 : -1} 1)"
            href="#cloud"
          />
        {/each}
        <g transform="translate({-offset} 0)">
          {#each Array(7).fill() as _, i}
            <use
              href="#bird"
              x={30 + 100 * i}
              y={Math.floor(Math.random() * 7.5 + 2.5)}
            />
          {/each}
        </g>
        <path stroke-dasharray="40 5 50 0" d="M 0 40 h 500" />
        <path stroke-dasharray="5 40 5 40" d="M 0 48 h 500" />
        <path stroke-dasharray="2 60 4 80" d="M 0 44 h 500" />
      </g>

      <g transform="translate(30 37)">
        <g transform="translate({charge} 0)">
          <path
            d="M 3 1 h 16 m 7 0 h 1 a 6 6 0 0 0 0 -6 v -3 l -4 -2.5 m 1 -2 h -12 q -5 0 -10 5 q -8 0 -10 5 v 3.5 h 3"
          />
          <path d="M 9 -4.5 h 2 m 5 0 h 2" />
          <path d="M 5.5 -7 h 14 v -4" />
          <path d="M 13 -10 v 3 m 0 1.5 v 6.5" />
          <path d="M -7 -4 h 3 q 1.5 0 2 -1" />
          <circle r="3" />
          <circle
            transform="rotate({angle})"
            r="1.5"
            stroke-dasharray="1.5"
            stroke-linecap="round"
          />
          <g transform="translate(22 0)">
            <circle r="3" />
            <circle
              transform="rotate({angle})"
              r="1.5"
              stroke-dasharray="1.5"
              stroke-linecap="round"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>

  <input
    on:input={handleInput}
    on:mouseup={handleRelease}
    on:blur={handleRelease}
    on:keyup={({ key }) => {
      if (key === 'ArrowRight') {
        handleRelease();
      }
    }}
    type="range"
    min="0"
    max="100"
    value={$value}
  />
</div>

<style>
  :global(body) {
    background: #f2f2f2;
    color: #1c1c1a;
    padding: 0;
  }

  div {
    width: 100%;
    max-width: 600px;
    margin: 1rem auto;
  }

  input {
    width: 100%;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
