<script>
  import { tweened } from 'svelte/motion';
  import { cubicInOut as easing } from 'svelte/easing';
  import { fly, fade } from 'svelte/transition';
  import { timer } from 'd3-timer';
  import { min } from 'd3-array';
  import { json } from 'd3-fetch';
  import { format } from 'd3-format';

  import Highlight from './Highlight.svelte';
  import Blocks from './Blocks.svelte';

  const duration = 1250;
  const viewBoxes = [
    {
      x: 0,
      y: 0,
      width: 550,
      height: 170,
    },
    {
      x: 360,
      y: 130,
      width: 10,
      height: 10,
    },
  ];

  const viewBox = tweened(viewBoxes[0], {
    easing,
    duration,
  });

  let svg;
  let canvas;

  let data;
  let blocks;
  let highlight;
  let error;

  let isExploring;
  let isSuccessful;

  async function drawCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;

    try {
      data = await json(
        'https://storage.googleapis.com/bb-search-data/parsed/blocks-colors.json?'
      );
    } catch (err) {
      console.log(err);
      error = err;
      return;
    }

    isSuccessful = true;

    const size = width;
    const dimensions = Math.floor(Math.sqrt(data.length));
    const cellSize = size / dimensions;

    blocks = data.map(({ colors }, i, { length }) => {
      const column = i % dimensions;
      const row = Math.floor(i / dimensions);

      return {
        color: Object.entries(colors).sort((a, b) =>
          a[1] < b[1] ? 1 : -1
        )[0][0],
        column,
        row,
      };
    });

    const context = canvas.getContext('2d');

    const t = timer(function (elapsed) {
      const scale = min([1, elapsed / duration]);

      context.clearRect(0, 0, size, size);
      for (const { color, column, row } of blocks) {
        context.fillStyle = color;
        context.fillRect(
          column * cellSize - (cellSize / 2) * (scale - 1),
          row * cellSize - (cellSize / 2) * (scale - 1),
          cellSize * scale,
          cellSize * scale
        );
      }

      if (scale === 1) {
        t.stop();
      }
    });
  }

  function handleInput() {
    isExploring = true;
    const promise = viewBox.set(viewBoxes[1]);
    promise.then((d) => {
      const { width, height } = svg.getBoundingClientRect();
      drawCanvas(width, height);
    });
  }

  function handleResize(e) {
    if (!isSuccessful) return;

    const { width, height } = svg.getBoundingClientRect();
    if (canvas.width !== width) {
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      const size = width;
      const dimensions = Math.floor(Math.sqrt(data.length));
      const cellSize = size / dimensions;

      context.clearRect(0, 0, size, size);
      for (const { color, column, row } of blocks) {
        context.fillStyle = color;
        context.fillRect(
          column * cellSize - cellSize / 2,
          row * cellSize - cellSize / 2,
          cellSize,
          cellSize
        );
      }
    }
  }

  function handleClick(e) {
    if (!isSuccessful) return;

    const { x, y, width, height } = canvas.getBoundingClientRect();
    const { clientX, clientY } = e;
    const dimensions = Math.floor(Math.sqrt(data.length));
    const size = width;
    const cellSize = size / dimensions;
    const column = Math.floor((clientX - x) / cellSize);
    const row = Math.floor((clientY - y) / cellSize);

    const top = ((row * cellSize + cellSize / 2) / size) * 100;
    const left = ((column * cellSize + cellSize / 2) / size) * 100;
    highlight = {
      left: `${left}%`,
      top: `${top}%`,
      data: { ...data[column + row * dimensions] },
    };
  }
</script>

<svelte:window
  on:resize={handleResize}
  on:click={() => {
    if (highlight) highlight = null;
  }}
/>

<div>
  <p>
    <a href="https://blockbuilder.org/">Blockbuilder</a> is a now deprecated
    platform which played a foundational role in the development of the d3
    <a href="https://d3js.org/">library</a>
    and <a href="https://d3js.community">community</a>. Introduced as an
    <q cite="https://blockbuilder.org/"
      >in-browser code editor built for creating and sharing d3.js examples</q
    >, the site is responsible for thousands of informative and intriguing
    demos, affectionately described as <em>bl.ocks</em>.
  </p>
  <p>Informative, intriguing, and full of color.</p>

  <Blocks />

  <p>
    <em>Which color exactly</em>? Let's try to answer this question by exploring
    <a href="https://observablehq.com/@enjalot/blockbuilder-search-data"
      >a very rich dataset</a
    > and thousands of bl.ocks. Building bl.ocks.
  </p>
  <main>
    <svg
      tabindex="0"
      class="title"
      aria-label="Colorful building bl.ocks."
      bind:this={svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={Object.values($viewBox)}
      ><title>Colorful building bl.ocks.</title><g
        fill="currentColor"
        stroke="currentColor"
        ><rect x="70" y="110" width="10" height="10" /><rect
          x="70"
          y="120"
          width="10"
          height="10"
        /><rect x="70" y="130" width="10" height="10" /><rect
          x="80"
          y="130"
          width="10"
          height="10"
        /><rect x="90" y="130" width="10" height="10" /><rect
          x="90"
          y="120"
          width="10"
          height="10"
        /><rect x="90" y="110" width="10" height="10" /><rect
          x="110"
          y="110"
          width="10"
          height="10"
        /><rect x="110" y="120" width="10" height="10" /><rect
          x="110"
          y="130"
          width="10"
          height="10"
        /><rect x="110" y="90" width="10" height="10" /><rect
          x="130"
          y="90"
          width="10"
          height="10"
        /><rect x="130" y="100" width="10" height="10" /><rect
          x="130"
          y="110"
          width="10"
          height="10"
        /><rect x="130" y="120" width="10" height="10" /><rect
          x="130"
          y="130"
          width="10"
          height="10"
        /><rect x="170" y="90" width="10" height="10" /><rect
          x="170"
          y="100"
          width="10"
          height="10"
        /><rect x="170" y="110" width="10" height="10" /><rect
          x="170"
          y="120"
          width="10"
          height="10"
        /><rect x="170" y="130" width="10" height="10" /><rect
          x="160"
          y="130"
          width="10"
          height="10"
        /><rect x="150" y="130" width="10" height="10" /><rect
          x="150"
          y="120"
          width="10"
          height="10"
        /><rect x="150" y="110" width="10" height="10" /><rect
          x="160"
          y="110"
          width="10"
          height="10"
        /><rect x="30" y="90" width="10" height="10" /><rect
          x="30"
          y="100"
          width="10"
          height="10"
        /><rect x="30" y="110" width="10" height="10" /><rect
          x="30"
          y="120"
          width="10"
          height="10"
        /><rect x="30" y="130" width="10" height="10" /><rect
          x="40"
          y="130"
          width="10"
          height="10"
        /><rect x="50" y="130" width="10" height="10" /><rect
          x="50"
          y="120"
          width="10"
          height="10"
        /><rect x="50" y="110" width="10" height="10" /><rect
          x="40"
          y="110"
          width="10"
          height="10"
        /><rect x="190" y="110" width="10" height="10" /><rect
          x="190"
          y="120"
          width="10"
          height="10"
        /><rect x="190" y="130" width="10" height="10" /><rect
          x="190"
          y="90"
          width="10"
          height="10"
        /><rect x="210" y="110" width="10" height="10" /><rect
          x="210"
          y="120"
          width="10"
          height="10"
        /><rect x="210" y="130" width="10" height="10" /><rect
          x="220"
          y="110"
          width="10"
          height="10"
        /><rect x="230" y="110" width="10" height="10" /><rect
          x="230"
          y="120"
          width="10"
          height="10"
        /><rect x="230" y="130" width="10" height="10" /><rect
          x="250"
          y="110"
          width="10"
          height="10"
        /><rect x="250" y="120" width="10" height="10" /><rect
          x="250"
          y="130"
          width="10"
          height="10"
        /><rect x="260" y="130" width="10" height="10" /><rect
          x="270"
          y="130"
          width="10"
          height="10"
        /><rect x="270" y="120" width="10" height="10" /><rect
          x="270"
          y="110"
          width="10"
          height="10"
        /><rect x="260" y="110" width="10" height="10" /><rect
          x="270"
          y="140"
          width="10"
          height="10"
        /><rect x="270" y="150" width="10" height="10" /><rect
          x="260"
          y="150"
          width="10"
          height="10"
        /><rect x="250" y="150" width="10" height="10" /><rect
          x="300"
          y="90"
          width="10"
          height="10"
        /><rect x="300" y="100" width="10" height="10" /><rect
          x="300"
          y="110"
          width="10"
          height="10"
        /><rect x="300" y="120" width="10" height="10" /><rect
          x="300"
          y="130"
          width="10"
          height="10"
        /><rect x="310" y="130" width="10" height="10" /><rect
          x="320"
          y="130"
          width="10"
          height="10"
        /><rect x="320" y="120" width="10" height="10" /><rect
          x="320"
          y="110"
          width="10"
          height="10"
        /><rect x="310" y="110" width="10" height="10" /><rect
          x="340"
          y="90"
          width="10"
          height="10"
        /><rect x="340" y="100" width="10" height="10" /><rect
          x="340"
          y="110"
          width="10"
          height="10"
        /><rect x="340" y="120" width="10" height="10" /><rect
          x="340"
          y="130"
          width="10"
          height="10"
        /><rect x="360" y="130" width="10" height="10" /><rect
          x="380"
          y="110"
          width="10"
          height="10"
        /><rect x="380" y="120" width="10" height="10" /><rect
          x="380"
          y="130"
          width="10"
          height="10"
        /><rect x="390" y="130" width="10" height="10" /><rect
          x="400"
          y="130"
          width="10"
          height="10"
        /><rect x="400" y="120" width="10" height="10" /><rect
          x="400"
          y="110"
          width="10"
          height="10"
        /><rect x="390" y="110" width="10" height="10" /><rect
          x="440"
          y="110"
          width="10"
          height="10"
        /><rect x="430" y="110" width="10" height="10" /><rect
          x="420"
          y="110"
          width="10"
          height="10"
        /><rect x="420" y="120" width="10" height="10" /><rect
          x="420"
          y="130"
          width="10"
          height="10"
        /><rect x="430" y="130" width="10" height="10" /><rect
          x="440"
          y="130"
          width="10"
          height="10"
        /><rect x="460" y="130" width="10" height="10" /><rect
          x="460"
          y="120"
          width="10"
          height="10"
        /><rect x="460" y="110" width="10" height="10" /><rect
          x="460"
          y="100"
          width="10"
          height="10"
        /><rect x="480" y="110" width="10" height="10" /><rect
          x="480"
          y="130"
          width="10"
          height="10"
        /><rect x="470" y="120" width="10" height="10" /><rect
          x="510"
          y="100"
          width="10"
          height="10"
        /><rect x="500" y="110" width="10" height="10" /><rect
          x="510"
          y="120"
          width="10"
          height="10"
        /><rect x="500" y="130" width="10" height="10" /><rect
          x="30"
          y="50"
          width="10"
          height="10"
        /><rect x="30" y="40" width="10" height="10" /><rect
          x="30"
          y="30"
          width="10"
          height="10"
        /><rect x="30" y="20" width="10" height="10" /><rect
          x="30"
          y="10"
          width="10"
          height="10"
        /><rect x="40" y="10" width="10" height="10" /><rect
          x="50"
          y="10"
          width="10"
          height="10"
        /><rect x="60" y="10" width="10" height="10" /><rect
          x="30"
          y="60"
          width="10"
          height="10"
        /><rect x="40" y="60" width="10" height="10" /><rect
          x="50"
          y="60"
          width="10"
          height="10"
        /><rect x="60" y="60" width="10" height="10" /><rect
          x="80"
          y="40"
          width="10"
          height="10"
        /><rect x="80" y="50" width="10" height="10" /><rect
          x="80"
          y="60"
          width="10"
          height="10"
        /><rect x="90" y="60" width="10" height="10" /><rect
          x="100"
          y="60"
          width="10"
          height="10"
        /><rect x="100" y="50" width="10" height="10" /><rect
          x="100"
          y="40"
          width="10"
          height="10"
        /><rect x="90" y="40" width="10" height="10" /><rect
          x="120"
          y="20"
          width="10"
          height="10"
        /><rect x="120" y="30" width="10" height="10" /><rect
          x="120"
          y="40"
          width="10"
          height="10"
        /><rect x="120" y="50" width="10" height="10" /><rect
          x="120"
          y="60"
          width="10"
          height="10"
        /><rect x="140" y="40" width="10" height="10" /><rect
          x="140"
          y="50"
          width="10"
          height="10"
        /><rect x="140" y="60" width="10" height="10" /><rect
          x="150"
          y="60"
          width="10"
          height="10"
        /><rect x="160" y="60" width="10" height="10" /><rect
          x="160"
          y="50"
          width="10"
          height="10"
        /><rect x="160" y="40" width="10" height="10" /><rect
          x="150"
          y="40"
          width="10"
          height="10"
        /><rect x="180" y="60" width="10" height="10" /><rect
          x="180"
          y="50"
          width="10"
          height="10"
        /><rect x="180" y="40" width="10" height="10" /><rect
          x="190"
          y="40"
          width="10"
          height="10"
        /><rect x="230" y="20" width="10" height="10" /><rect
          x="210"
          y="60"
          width="10"
          height="10"
        /><rect x="210" y="50" width="10" height="10" /><rect
          x="210"
          y="40"
          width="10"
          height="10"
        /><rect x="210" y="30" width="10" height="10" /><rect
          x="220"
          y="20"
          width="10"
          height="10"
        /><rect x="220" y="40" width="10" height="10" /><rect
          x="240"
          y="40"
          width="10"
          height="10"
        /><rect x="240" y="50" width="10" height="10" /><rect
          x="240"
          y="60"
          width="10"
          height="10"
        /><rect x="250" y="60" width="10" height="10" /><rect
          x="260"
          y="60"
          width="10"
          height="10"
        /><rect x="260" y="50" width="10" height="10" /><rect
          x="260"
          y="40"
          width="10"
          height="10"
        /><rect x="280" y="20" width="10" height="10" /><rect
          x="280"
          y="30"
          width="10"
          height="10"
        /><rect x="280" y="40" width="10" height="10" /><rect
          x="280"
          y="50"
          width="10"
          height="10"
        /><rect x="280" y="60" width="10" height="10" /></g
      ></svg
    >

    {#if isExploring}
      <canvas
        bind:this={canvas}
        in:fly={{ delay: duration }}
        on:click|stopPropagation={handleClick}
      />
      {#if isSuccessful}
        {#if highlight}
          <div
            in:fly={{ y: 200, easing }}
            out:fly={{ y: 200, easing }}
            style="top: {highlight.top}; left: {highlight.left};"
            on:click|stopPropagation
          >
            <Highlight {...highlight.data} />
          </div>
        {/if}
      {:else if error}
        <svg
          in:fade
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-60 -60 120 120"
        >
          <defs>
            <linearGradient id="gradient-d3" x1="1" y1="0" x2="0" y2="1">
              <stop stop-color="#f26d58" offset="0" />
              <stop stop-color="#f68e48" offset="0.5" />
              <stop stop-color="#f9a03c" offset="1" />
            </linearGradient>
          </defs>
          <g fill="url(#gradient-d3)" stroke="none">
            <path
              d="M-6.28-45A54.667 54.667 0 0111.8-25h10.7c4.261 0 7.5 3.239 7.5 7.5S26.761-10 22.5-10h-5.451C17.664-6.755 18-3.416 18 0s-.336 6.755-.951 10H22.5c4.261 0 7.5 3.239 7.5 7.5S26.761 25 22.5 25H11.8A54.599 54.599 0 01-6.28 45H22.5C37.57 45 50 32.57 50 17.5c0-6.656-2.521-12.72-6.527-17.5C47.48-4.783 50-10.84 50-17.5 50-32.57 37.57-45 22.5-45H-6.28z"
            />
            <path
              d="M-50-45v20h10c13.93 0 25 11.07 25 25s-11.07 25-25 25h-10v20h10C-15.27 45 5 24.73 5 0s-20.27-45-45-45z"
            />
          </g>
        </svg>
      {/if}
    {:else}
      <button on:click={handleInput} out:fade> Explore colors </button>
    {/if}
  </main>

  {#if isSuccessful}
    <footer in:fly={{ y: -50, delay: duration }}>
      <h2>What's this?</h2>
      <p>
        The canvas describes the color most frequently used by each of the {format(
          ','
        )(data.length)} bl.ocks retrieved from the dataset.
      </p>
      <p>Try selecting a specific pixel to highlight the matching project.</p>
    </footer>
  {:else if error}
    <footer in:fly={{ y: -50, delay: duration }}>
      <p>
        Unfortunately, we weren't able to fetch the desired data...If refreshing
        the page doesn't work, consider filing an issue <a
          href="https://github.com/borntofrappe/svelte-tutorial">on Github</a
        >.
      </p>
      <p>Here's an error message for context.</p>
      <pre><code>{error}</code></pre>
    </footer>
  {/if}
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    padding: 0;
    background: hsl(0, 0%, 100%);
    color: hsl(0, 0%, 20%);
    min-height: 100vh;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10"><g fill="hsl(0, 0%, 96%)"><rect width="5" height="5"/><rect x="5" y="5" width="5" height="5"/></g></svg>');
    background-size: 20px;
  }

  :global(p) {
    line-height: 1.5;
  }

  :global(::selection) {
    background: hsla(0, 0%, 20%, 0.25);
  }

  :global(.visually-hidden:not(:focus):not(:active)) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  :global(a) {
    position: relative;
    padding-left: 0.5rem;
    color: inherit;
    font-weight: bold;
  }

  :global(a::before) {
    content: '';
    width: 0.4rem;
    height: 0.4rem;
    background: currentColor;
    position: absolute;
    top: 0%;
    left: 0%;
    transition: transform 0.25s ease-out;
    transform-origin: 50% 50%;
  }

  :global(a:hover::before),
  :global(a:focus::before) {
    transform: rotate(0.25turn);
  }

  :global(button) {
    text-transform: uppercase;
    font-weight: bold;
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    position: relative;
  }

  :global(button:focus) {
    outline: 2px solid currentColor;
  }

  :global(button::before),
  :global(button::after) {
    content: '';
    position: absolute;
    top: 50%;
    width: 0.5rem;
    height: 0.5rem;
    color: currentColor;
    background: currentColor;
    transform: translateY(-50%);
    transition: transform 0.25s ease-out;
  }

  :global(button::before) {
    left: 0;
  }
  :global(button::after) {
    right: 0;
  }

  :global(button:hover::before),
  :global(button:focus::before) {
    transform: translateY(-50%) rotate(0.25turn);
  }

  :global(button:hover::after),
  :global(button:focus::after) {
    transform: translateY(-50%) rotate(-0.25turn);
  }

  @media (prefers-reduced-motion: no-preference) {
    :global(a) {
      animation: rainbow 2s 0.2s infinite linear paused;
    }

    :global(a:hover),
    :global(a:focus) {
      animation-play-state: running;
    }

    :global(a:focus) {
      outline-color: currentColor;
    }

    :global(button) {
      animation: rainbow 2s 0.2s infinite linear paused;
    }

    :global(button:hover),
    :global(button:focus) {
      animation-play-state: running;
    }

    main svg.title {
      animation: rainbow 2s infinite paused;
    }

    main svg.title:focus {
      outline-color: currentColor;
    }

    main svg.title:hover,
    main svg.title:focus {
      animation-play-state: running;
    }

    @keyframes rainbow {
      9% {
        color: rgb(110, 64, 170);
      }
      18% {
        color: rgb(191, 60, 175);
      }
      27% {
        color: rgb(254, 75, 131);
      }
      36% {
        color: rgb(255, 120, 71);
      }
      45% {
        color: rgb(226, 183, 47);
      }
      54% {
        color: rgb(175, 240, 91);
      }
      64% {
        color: rgb(82, 246, 103);
      }
      73% {
        color: rgb(29, 223, 163);
      }
      82% {
        color: rgb(35, 171, 216);
      }
      91% {
        color: rgb(76, 110, 219);
      }
    }
  }

  div {
    max-width: 700px;
    width: 90vw;
    margin: 0 auto;
    background: hsl(0, 0%, 100%);
    padding: 1rem 1rem 2rem;
  }

  div > :global(* + *) {
    margin-top: 1em;
  }

  main {
    max-width: 600px;
    margin: 2rem auto;
    position: relative;
    text-align: center;
    aspect-ratio: 1/1;
  }

  main div {
    max-width: 320px;
    width: 90vw;
    margin: initial;
    position: absolute;
    transform: translate(-50%, 10px);
    text-align: initial;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    color: hsl(0, 0%, 10%);
    background: hsl(0, 0%, 100%);
    border: 3px solid currentColor;
  }

  main div::before,
  main div::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    pointer-events: none;
  }

  main div::before {
    transform: translate(-50%, -5px);
    width: 10px;
    height: 10px;
    border: 2px solid currentColor;
    background: none;
  }

  main div::after {
    transform: translateX(-50%);
    width: 20px;
    height: 10px;
    background: currentColor;
    clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  }

  main div > :global(* + *) {
    margin-top: 0.5em;
  }

  main svg {
    width: 100%;
    height: auto;
    display: block;
  }

  main svg:nth-of-type(2) {
    position: absolute;
    top: 0;
    left: 0;
  }

  main canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  main button {
    font-size: 1.1rem;
    margin: 1.5rem 1rem;
    cursor: zoom-in;
  }

  footer > * + * {
    margin-top: 0.5em;
  }

  pre {
    background: hsl(0, 0%, 20%);
    color: hsl(0, 0%, 98%);
    padding: 0.5rem 0.75rem;
  }

  code::selection {
    background: hsla(0, 0%, 98%, 0.2);
  }
</style>
