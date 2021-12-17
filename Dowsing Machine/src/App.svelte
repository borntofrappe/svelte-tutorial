<script>
  const initialMessage = "Discover an item!";
  const initialGuesses = 2;
  const patches = 5;

  let patch = 0;
  let item = Math.floor(Math.random() * patches);

  let isGuessing = false;
  let isFound = false;

  let guesses = [];
  let guessesLeft = initialGuesses;
  let currentMessage = initialMessage;

  function handleGuess() {
    if (isGuessing) return;

    if (guessesLeft === 0 || isFound) {
      isGuessing = false;
      isFound = false;

      item = Math.floor(Math.random() * patches);
      guesses = [];
      guessesLeft = initialGuesses;
      currentMessage = initialMessage;
    } else if (!guesses.includes(patch)) {
      isGuessing = true;
    }
  }

  function handleReveal() {
    guesses = [...guesses, patch];
    guessesLeft = guessesLeft - 1;

    if (patch === item) {
      isFound = true;
      currentMessage = "Found it!";
    } else if (guessesLeft === 0) {
      isFound = true;
      currentMessage = "Out of luck...";
    } else {
      const distance = Math.abs(patch - item);
      currentMessage = `It's ${distance > 1 ? "far away" : "close"}!`;
    }

    isGuessing = false;
  }
</script>

<svg style="display: none;" viewBox="0 0 100 100">
  <symbol id="tree" viewBox="0 0 150 100">
    <g fill="currentColor">
      <rect x="0" y="36" width="17" height="16" />
      <rect x="4" y="32" width="9" height="28" />
    </g>
  </symbol>

  <symbol id="house" viewBox="0 0 150 100">
    <g stroke="currentColor" stroke-width="5">
      <path d="M 16.5 43 v 10" fill="none" />
      <path
        d="M 2.5 38 h 40 l -10 -10 h -20 l -10 10"
        fill="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <rect x="7.5" y="38" width="30" height="20" fill="none" />
    </g>
  </symbol>

  <symbol id="location" viewBox="0 0 150 100">
    <use transform="translate(5 0) " href="#tree" />
    <use transform="translate(30 0) " href="#house" />
    <use transform="translate(80 0) " href="#tree" />
    <use transform="translate(105 0) " href="#house" />

    <line
      x1="0"
      x2="150"
      y1="60"
      y2="60"
      stroke="currentColor"
      stroke-width="5"
    />
    <rect
      opacity="0.3"
      x="0"
      y="60"
      width="150"
      height="40"
      fill="currentColor"
    />
  </symbol>

  <symbol id="patch" viewBox="0 0 120 100">
    <path
      d="M 2.5 30 q 5 50 20 67.5 h 75 q 15 -17.5 20 -67.5 q -15 10 -25 30 q 5 -30 0 -50 q -20 10 -32.5 40 q -12.5 -30 -32.5 -40 q -5 20 0 50 q -10 -20 -25 -30"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </symbol>

  <symbol id="arrow" viewBox="0 0 100 100">
    <path opacity="0.2" d="M 20 0 l 70 50 l -70 50" fill="currentColor" />
  </symbol>

  <symbol id="item" viewBox="0 0 120 100">
    <g stroke="currentColor" stroke-width="5">
      <path
        d="M 25 37.5 v -10 l 25 -25 h 20 l 25 25 v 10"
        fill="currentColor"
      />
      <g fill="none">
        <rect x="25" y="37.5" width="50" height="60" />
        <rect x="75" y="37.5" width="20" height="60" />
      </g>
    </g>
  </symbol>
</svg>

<main>
  <form on:submit|preventDefault>
    <svg viewBox="0 0 150 100" width="50" height="33.33">
      <use href="#location" />
    </svg>

    <h1>{currentMessage}</h1>

    <h2>
      Left:
      <span>{guessesLeft}</span>
    </h2>

    <fieldset class:guessing={isGuessing} on:animationend={handleReveal}>
      {#each Array(patches).fill() as _, i}
        <label class:active={patch === i}>
          <span class="visually-hidden">Select patch {i}</span>
          <input type="radio" name="patches" bind:group={patch} value={i} />
          <svg
            class:guessed={guesses.includes(i)}
            viewBox="0 0 120 100"
            width="12"
            height="10"
          >
            <use href="#patch" />
          </svg>

          {#if item === i && isFound}
            <svg id="found-item" viewBox="0 0 120 100" width="18" height="15">
              <use href="#item" />
            </svg>
          {/if}
        </label>
      {/each}
    </fieldset>
  </form>

  <div>
    <button
      on:click={() => {
        if (isGuessing) return;
        patch = Math.max(0, patch - 1);
      }}
    >
      <span class="visually-hidden">Select patch {Math.max(0, patch - 1)}</span>
      <svg
        style="transform: rotateY(180deg)"
        viewBox="0 0 100 100"
        width="15"
        height="15"
      >
        <use href="#arrow" />
      </svg>
    </button>

    <button on:click={handleGuess}>
      <span class="visually-hidden">Reveal patch {patch}</span>
    </button>

    <button
      on:click={() => {
        if (isGuessing) return;
        patch = Math.min(patches - 1, patch + 1);
      }}
    >
      <span class="visually-hidden"
        >Select patch {Math.min(patches - 1, patch + 1)}</span
      >
      <svg viewBox="0 0 100 100" width="15" height="15">
        <use href="#arrow" />
      </svg>
    </button>
  </div>
</main>

<style>
  :global(*) {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(html),
  :global(body) {
    height: 100%;
  }

  :global(body) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    color: hsl(0, 0%, 20%);
    background: hsl(0, 0%, 96%);
    accent-color: currentColor;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 1.25rem 0;
  }

  main > div {
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form fieldset {
    margin: 1.75rem 0 1rem;
  }

  form > svg {
    width: 3rem;
    height: auto;
    display: block;
  }

  form h1 {
    order: 1;
  }

  @supports (display: grid) {
    form {
      flex-direction: initial;
    }

    form h1 {
      order: initial;
    }

    form {
      display: grid;
      grid-template-columns: 3rem 1fr;
      gap: 0 0.25rem;
    }

    form > svg {
      width: 100%;
    }

    form h1 {
      grid-row: 3;
    }

    form h2 {
      align-self: end;
    }

    form h1,
    form fieldset {
      grid-column: 1/-1;
    }
  }

  main {
    width: 20rem;
    height: 20rem;
    padding: 3.75rem;
    border-radius: 50%;
    background: linear-gradient(
      to bottom,
      hsl(344, 93%, 50%) 48%,
      hsl(240, 25%, 21%) 48%,
      hsl(240, 25%, 21%) 52%,
      hsl(0, 0%, 96%) 52%
    );
    box-shadow: 0 0 0.25rem hsla(0, 0%, 0%, 0.25),
      0 0.1rem 0.7rem -0.4rem hsla(0, 0%, 0%, 0.5);
  }

  form {
    padding: 0.5rem;
    background: hsl(60, 20%, 49%);
    border: 0.3rem solid currentColor;
    border-radius: 0.4rem;
  }

  h1 {
    font-size: 1rem;
    padding: 0.2rem;
    border: 0.15rem solid currentColor;
    border-radius: 0.2rem;
  }

  h2 {
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  fieldset {
    border: none;
    display: flex;
    justify-content: center;
    gap: 0 0.5rem;
  }

  label {
    position: relative;
    width: 1.5rem;
  }

  label input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  label > svg:nth-of-type(1) {
    width: 100%;
    height: auto;
    display: block;
  }

  label > svg:nth-of-type(2) {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -0.2rem);
    width: 80%;
    height: auto;
    display: block;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 1rem;
  }

  button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 0.4rem;
    border: none;
    background: none;
    box-shadow: 0 0rem 0.1rem hsla(0, 0%, 0%, 0.25),
      0 0.1rem 0.5rem -0.2rem hsla(0, 0%, 0%, 0.45);
  }

  button:nth-of-type(2) {
    width: 2.5rem;
    height: 2.5rem;
  }

  button svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }

  label.active::before {
    position: absolute;
    content: "";
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 0.7rem;
    height: 0.7rem;
    background: currentColor;
    clip-path: polygon(0% 80%, 40% 40%, 60% 40%, 100% 80%, 100% 100%, 0% 100%);
    animation: none;
  }

  .guessing label.active > svg:nth-of-type(1) {
    animation: shake 1s step-start;
  }

  .guessed {
    opacity: 0.5;
  }

  @keyframes shake {
    33% {
      transform: translateY(0.1rem);
    }
    67% {
      transform: translateY(-0.1rem);
    }
  }
</style>
