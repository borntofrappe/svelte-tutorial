<script>
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";

  export let title = "A matter of time";
  export let question =
    "Svelte 3 is alive and kicking, but in what year was the compiler created?";
  export let answer = 2016;
  export let details = "...";

  export let min = 2000;
  export let max = 2022;
  export let value = 2010;
  export let precision = 0;

  const x0 = (1 / (max - min)) * (answer - min) * 300;
  let x1 = (1 / (max - min)) * (value - min) * 300;

  let hasStarted = false;
  let isRevealed = false;

  let svg;
  let g;
  let sl, l, w;

  onMount(() => {
    handleSize();
  });

  const handleSize = () => {
    if (isRevealed === true) return;

    const { left: sleft } = svg.getBoundingClientRect();
    const { left, width } = g.getBoundingClientRect();
    sl = sleft;
    l = left;
    w = width;
  };

  const handleStart = (e) => {
    hasStarted = true;
    handleIng(e);
  };
  const handleEnd = () => (hasStarted = false);
  const handleIng = ({ offsetX }) => {
    if (hasStarted === false) return;

    const p = (offsetX - (l - sl)) / w;
    x1 = p * 300;
    value = min === 0 ? max * p : min + (max - min) * p;
  };

  const handleKeydown = (e) => {
    const { code } = e;
    if (code === "ArrowLeft" || code === "ArrowRight") {
      e.preventDefault();

      const increment = precision === 0 ? 1 : 1 / 10 ** precision;
      if (code === "ArrowLeft") value = Math.max(min, value - increment);
      if (code === "ArrowRight") value = Math.min(max, value + increment);

      x1 = (1 / (max - min)) * (value - min) * 300;
    }
  };

  const durations = {
    out: 500,
    in: 400,
  };

  const delays = {
    out: 0,
    inGuess: 500,
    inAnswer: 2000,
    details: 2700,
  };
</script>

<article>
  {#if title}
    <h2>
      {title}
    </h2>
  {/if}

  <p>
    {question}
  </p>

  <svg bind:this={svg} viewBox="-24 -50 348 100">
    <g>
      <rect y="-3.5" width="300" height="7" rx="3.5" fill="hsl(0, 0%, 85%)" />

      {#if isRevealed}
        <g transform="translate({x0} 0)">
          <g style:color="hsl(185, 62%, 45%)">
            <g fill="currentColor">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inAnswer,
                }}
              >
                <circle r="6" />
              </g>
            </g>
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inAnswer + 100,
                }}
              >
                <circle r="9" />
              </g>
            </g>

            <g
              in:fade={{
                duration: durations.in,
                delay: delays.inAnswer + durations.in,
              }}
            >
              <g>
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M 0 9 v 11" />
                </g>
                <g fill="currentColor">
                  <g
                    transform="translate(0 34)"
                    font-size="12"
                    text-anchor={x0 > 150 ? "end" : "start"}
                  >
                    <text> Correct answer </text>
                    <text y="12" font-size="10" font-weight="700">
                      {answer}
                    </text>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        <g transform="translate({x1} 0)">
          <g style:color="hsl(205, 87%, 29%)">
            <g fill="currentColor">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inGuess,
                }}
              >
                <circle r="6" />
              </g>
            </g>
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inGuess + 100,
                }}
              >
                <circle r="9" />
              </g>
            </g>
            <g
              in:fade={{
                duration: durations.in,
                delay: delays.inGuess + durations.in,
              }}
            >
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M 0 -9 v -11" />
              </g>
              <g fill="currentColor">
                <g
                  transform="translate(0 -38)"
                  font-size="12"
                  text-anchor={x1 > 150 ? "end" : "start"}
                >
                  <text> You guessed... </text>
                  <text y="12" font-size="10" font-weight="700"
                    >{value.toFixed(precision)}</text
                  >
                </g>
              </g>
            </g>
          </g>
        </g>
      {:else}
        <g
          style:cursor="pointer"
          on:mousedown={handleStart}
          on:mouseup={handleEnd}
          on:mouseleave={handleEnd}
          on:mousemove={handleIng}
          style:outline="none"
          tabindex="0"
          aria-label="Change the value with the left and right arrow keys."
          class="focusable"
          on:keydown={handleKeydown}
        >
          <g style:pointer-events="none">
            <g transform="translate({x1} 0)">
              <g style:color="hsl(205, 87%, 29%)">
                <g out:scale={{ duration: durations.out }}>
                  <g transform="translate(0 -28)">
                    <g
                      fill="currentColor"
                      font-size="11"
                      font-weight="700"
                      text-anchor="middle"
                    >
                      <text>{value.toFixed(precision)}</text>
                    </g>
                  </g>

                  <g transform="scale(0)" class="focus">
                    <circle
                      r="23.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                    />
                  </g>

                  <circle
                    r="18.5"
                    fill="hsl(0, 0%, 100%)"
                    stroke="currentColor"
                    stroke-width="3"
                  />
                  <g fill="currentColor">
                    <path d="M 2 -5 l 5 5 -5 5z" />
                    <path transform="scale(-1 1)" d="M 2 -5 l 5 5 -5 5z" />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g bind:this={g}>
            <rect opacity="0" y="-50" width="300" height="100" />
          </g>
        </g>
      {/if}
    </g>
  </svg>

  {#if isRevealed}
    <p in:fade={{ delay: delays.details }}>
      {details}
    </p>
  {:else}
    <button on:click|once={() => (isRevealed = true)}> Reveal answer </button>
  {/if}
</article>

<style>
  article {
    max-width: 60ch;
    width: 90vw;
    margin: 1rem auto;
    background: hsl(0, 0%, 100%);
    padding: 1rem;
    box-shadow: 0 2px 5px hsla(0, 0%, 50%, 0.1), 0 0 5px hsla(0, 0%, 0%, 0.2);
  }

  h2 {
    font-size: 1.2rem;
  }

  article > * + * {
    margin-top: 0.75em;
  }

  p {
    line-height: 1.7;
  }

  svg {
    display: block;
  }

  svg,
  svg + * {
    margin-top: 1.5em;
  }

  button {
    display: block;
    background: hsl(205, 87%, 29%);
    font-weight: 700;
    border: none;
    padding: 0.75rem 0.95rem;
    color: hsl(0, 0%, 100%);
  }

  .focus {
    transition: transform 0.25s cubic-bezier(0.45, 0, 0.55, 1);
  }

  .focusable:focus .focus {
    transform: scale(1);
  }

  .focusable:focus:not(:focus-visible) .focus {
    transform: scale(0);
  }
</style>
