<script>
  import { Puzzle } from "./utils.js";

  const puzzle = new Puzzle({ size: 3 });

  const nums = puzzle.nums.map((row, r) =>
    row.map((d, c) => {
      const locked = puzzle.locks.includes(r * puzzle.size + c);
      const n = locked ? d : 0;
      return {
        d,
        n,
        locked,
      };
    })
  );

  $: rows = nums.reduce(
    (acc, curr) => [...acc, curr.reduce((a, c) => a + c.n, 0)],
    []
  );

  $: columns = Array(nums.length)
    .fill()
    .map((_, i) =>
      Array(nums[i].length)
        .fill()
        .map((_, j) => nums[j][i])
        .reduce((acc, curr) => acc + curr.n, 0)
    );

  let focus;
  const buttons = nums
    .reduce(
      (acc, curr) => [
        ...acc,
        ...curr.reduce((a, c) => (c.locked ? [...a] : [...a, c.d]), []),
      ],
      []
    )
    .sort();

  const handleFocus = ({ c, r }) => {
    focus = { c, r };
  };

  const handleBlur = () => {
    focus = null;
  };

  const handleKey = (e) => {
    if (!focus) return;

    const n = parseInt(e.key, 10);
    if (n) {
      nums[focus.r][focus.c].n = n;
    }
  };

  const handleSelection = ({ n }) => {
    if (!focus) return;

    nums[focus.r][focus.c].n = n;
  };

  $: solved = nums
    .reduce((acc, curr) => [...acc, ...curr], [])
    .every(({ d, n }) => d === n);

  $: if (solved) {
    focus = null;
  }
</script>

<svelte:body on:keydown={handleKey} on:click={handleBlur} />

<article>
  <svg viewBox="0 0 {puzzle.size + 2} {puzzle.size + 2}">
    <g transform="translate(0.5 0.5)">
      <g transform="translate(1 {puzzle.size + 1})">
        {#each puzzle.columns as c, i}
          <g transform="translate({i} 0)">
            <circle
              r="0.35"
              fill="none"
              stroke="currentColor"
              stroke-width="0.02"
            />
            <text
              font-family="monospace"
              font-size="0.3"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="currentColor">{c}</text
            >
          </g>
        {/each}
      </g>

      <g transform="translate({puzzle.size + 1} 1)">
        {#each puzzle.rows as r, i}
          <g transform="translate(0 {i})">
            <circle
              r="0.35"
              fill="none"
              stroke="currentColor"
              stroke-width="0.02"
            />
            <text
              font-family="monospace"
              font-size="0.3"
              text-anchor="middle"
              dominant-baseline="middle"
              fill="currentColor">{r}</text
            >
          </g>
        {/each}
      </g>

      <g opacity="0.6">
        <g transform="translate(1 0)">
          {#each columns as c, i}
            <g transform="translate({i} 0)">
              <path
                opacity="0.25"
                fill="none"
                stroke="currentColor"
                stroke-width="0.05"
                d="M 0 1 v {rows.length - 1}"
              />
              <circle
                r="0.35"
                fill="none"
                stroke="currentColor"
                stroke-width="0.02"
              />
              <text
                font-family="monospace"
                font-size="0.3"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="currentColor">{c}</text
              >
            </g>
          {/each}
        </g>

        <g transform="translate(0 1)">
          {#each rows as r, i}
            <g transform="translate(0 {i})">
              <path
                opacity="0.25"
                fill="none"
                stroke="currentColor"
                stroke-width="0.05"
                d="M 1 0 h {columns.length - 1}"
              />
              <circle
                r="0.35"
                fill="none"
                stroke="currentColor"
                stroke-width="0.02"
              />
              <text
                font-family="monospace"
                font-size="0.3"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="currentColor">{r}</text
              >
            </g>
          {/each}
        </g>
      </g>

      <g transform="translate(1 1)">
        {#if focus}
          <g transform="translate({focus.c} {focus.r})">
            <rect
              fill="none"
              stroke="#fcb22d"
              stroke-width="0.2"
              x="-0.38"
              y="-0.38"
              width="0.76"
              height="0.76"
              rx="0.15"
            />
          </g>
        {/if}

        {#each nums as row, i}
          <g transform="translate(0 {i})">
            {#each row as { n, locked }, j}
              <g transform="translate({j} 0)">
                <g
                  class:solved
                  style="animation-delay: {(i + j) % 2 ? 0 : 0.1}s"
                  opacity="0"
                >
                  <rect
                    fill="none"
                    stroke="#fcb22d"
                    stroke-width="0.2"
                    x="-0.38"
                    y="-0.38"
                    width="0.76"
                    height="0.76"
                    rx="0.15"
                  />
                </g>

                <rect
                  fill={locked ? "#017297" : "#02a5dc"}
                  x="-0.38"
                  y="-0.38"
                  width="0.76"
                  height="0.76"
                  rx="0.15"
                />
                {#if n !== 0}
                  <text
                    text-anchor="middle"
                    dominant-baseline="middle"
                    y="0.03"
                    font-size="0.4"
                    font-family="monospace"
                    fill="hsl(0, 0%, 97%)">{n}</text
                  >
                {/if}
                {#if !locked && !solved}
                  <g
                    on:click|stopPropagation={() => handleFocus({ c: j, r: i })}
                    style:cursor="pointer"
                    opacity="0"
                  >
                    <rect
                      x="-0.38"
                      y="-0.38"
                      width="0.76"
                      height="0.76"
                      rx="0.15"
                    />
                  </g>
                {/if}
              </g>
            {/each}
          </g>
        {/each}
      </g>
    </g>
  </svg>
  <div>
    {#each buttons as n}
      <button
        disabled={solved}
        on:click|stopPropagation={() => handleSelection({ n })}
      >
        {n}
      </button>
    {/each}
  </div>
</article>

<style>
  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(body) {
    color: hsl(0, 0%, 97%);
    background: hsl(249, 13%, 12%);
    min-height: 100vh;
    display: grid;
    place-items: center;
  }

  article {
    margin: 1rem auto;
    width: 100%;
    max-width: 24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  article > * + * {
    margin-top: 0.5em;
  }

  svg {
    display: block;
  }

  div {
    max-width: 100%;
    display: flex;
    gap: 0 1rem;
    overflow-x: auto;
    padding: 0.5rem 1rem;
  }

  div button {
    flex-shrink: 0;
  }

  div::-webkit-scrollbar {
    height: 0.25rem;
  }

  div::-webkit-scrollbar-track {
    background: hsla(0, 0%, 97%, 0.4);
  }

  div::-webkit-scrollbar-thumb {
    background: hsl(0, 0%, 97%);
  }

  button {
    width: 2.5rem;
    height: 2.5rem;
    color: hsl(249, 13%, 12%);
    background: hsl(0, 0%, 97%);
    border-radius: 0.5rem;
    border: none;
    font-family: monospace;
    display: block;
    font-size: 1.25rem;
  }

  .solved {
    animation: flash 0.5s 7 ease-in-out;
  }

  @keyframes flash {
    50% {
      opacity: 1;
    }
  }
</style>
