<script>
  import { onDestroy } from 'svelte';

  const dots = ['#f0c49a', '#ff798b', '#945a8b'].map((color, i, { length }) => {
    const cx = (i - Math.floor(length / 2)) * 10;
    const cy = i % 2 === 0 ? 0 : -5;
    return {
      color,
      cx,
      cy,
    };
  });

  const rays = {
    sun: 7,
    moon: 3,
  };

  const intervalDuration = 1.5;
  let isDark;
  let count = 0;
  let direction = 1;
  let interval = setInterval(() => {
    count += direction;
    if (count > dots.length - 1 || count < 0) {
      direction *= -1;
      isDark = !isDark;
    }
  }, intervalDuration * 1000);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<svelte:head>
  {#if isDark}
    <style>
      body {
        color: hsl(0, 0%, 20%);
        background: hsl(0, 0%, 10%);
      }
    </style>
  {/if}
</svelte:head>

<svg viewBox="0 -25 65 37.5">
  <defs>
    <radialGradient id="gradient" cx="0.4" cy="0.4">
      <stop offset="0" stop-color="hsl(0, 0%, 100%)" />
      <stop offset="1" stop-color="hsla(0, 0%, 100%, 0)" />
    </radialGradient>

    <mask id="mask-moon">
      <circle r="7" fill="hsl(0, 0%, 100%)" />
      <circle r="7" cx="7" cy="-6" fill="hsl(0, 0%, 0%)" />
    </mask>
  </defs>

  <g fill="currentColor">
    <g transform="translate(12.5 0)">
      <g class="sun {isDark ? '' : 'active'}">
        <circle r="7" />
        <circle r="7" fill="url(#gradient)" opacity="0.1" />
        <g class="rays">
          {#each Array(rays.sun).fill() as _, i}
            <circle transform="rotate({(360 / rays.sun) * i})" cx="10" r="1" />
          {/each}
        </g>
      </g>
    </g>

    <g transform="translate(32.5 -15)">
      {#each dots as { color, cx, cy }, i}
        <g class="dots" style="color: {count === i ? color : 'currentColor'}">
          <circle {cx} {cy} r="2" />
        </g>
      {/each}
    </g>

    <g transform="translate(52.5 0)">
      <g class="moon {isDark ? 'active' : ''}">
        <g>
          <g mask="url(#mask-moon)">
            <circle r="7" />
            <circle r="7" fill="url(#gradient)" opacity="0.1" />
          </g>
          <g class="rays">
            {#each Array(rays.moon).fill() as _, i}
              <circle
                transform="rotate({(360 / rays.moon) * i})"
                cx="10"
                r="1"
              />
            {/each}
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>

<style>
  :global(body) {
    min-height: 100vh;
    display: grid;
    place-items: center;
    color: hsl(0, 0%, 90%);
    background: hsl(0, 0%, 98%);
    transition: background 0.25s ease-in-out, color 0.25s ease-in-out;
  }

  svg {
    width: 90vw;
    max-width: 500px;
  }

  .dots {
    transition: color 0.25s ease-in-out;
  }

  .rays {
    transition: transform 1s cubic-bezier(0.58, -0.27, 0.36, 1.25);
  }

  .sun .rays {
    transform: scale(0) rotate(270deg);
  }

  .moon .rays {
    transform: scale(0) rotate(0deg);
  }

  .active .rays {
    transform: scale(1) rotate(0deg);
  }

  .sun.active {
    color: hsl(46, 97%, 62%);
  }

  .moon.active {
    color: hsl(309, 24%, 47%);
  }
</style>
