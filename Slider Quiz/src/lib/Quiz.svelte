<script>
  export let title;
  export let question;
  export let answer;
  export let details;

  let isRevealed = false;
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

  <svg viewBox="-20 -50 340 100">
    <g>
      <rect y="-3.5" width="300" height="7" rx="3.5" fill="hsl(0, 0%, 85%)" />

      {#if isRevealed}
        <g transform="translate(20 0)">
          <g style:color="hsl(185, 62%, 45%)">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <circle r="9" />
              <path d="M 0 9 v 11" />
            </g>
            <g fill="currentColor">
              <circle r="6" />
              <g transform="translate(-2 34)" font-size="11">
                <text> Correct answer </text>
                <text y="12" font-size="9" font-weight="700">
                  {answer}
                </text>
              </g>
            </g>
          </g>
        </g>

        <g transform="translate(200 0)">
          <g style:color="hsl(205, 87%, 29%)">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <circle r="9" />
              <path d="M 0 -9 v -11" />
            </g>
            <g fill="currentColor">
              <circle r="6" />
              <g transform="translate(2 -38)" font-size="11" text-anchor="end">
                <text> You guessed... </text>
                <text y="12" font-size="9" font-weight="700"> 10.2 </text>
              </g>
            </g>
          </g>
        </g>
      {:else}
        <g transform="translate(200 0)">
          <g style:color="hsl(205, 87%, 29%)">
            <g transform="translate(0 -26)">
              <g
                fill="currentColor"
                font-size="11"
                font-weight="700"
                text-anchor="middle"
              >
                <text>10.2</text>
              </g>
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

            <g style:cursor="col-resize">
              <circle r="20" opacity="0" />
            </g>
          </g>
        </g>
      {/if}
    </g>
  </svg>

  {#if isRevealed}
    <p>
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
</style>
