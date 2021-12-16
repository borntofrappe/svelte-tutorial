<script>
  const initialMessage = "Discover an item!";
  const initialGuesses = 2;

  const patches = 5;

  let patch = 0;
  let itemPatch = Math.floor(Math.random() * patches);
  let selectedPatches = [];

  let isGuessing = false;
  let isFound = false;
  let guessesLeft = initialGuesses;
  let currentMessage = initialMessage;

  function handleSubmit() {
    if (isGuessing) return;

    if (guessesLeft === 0 || isFound) {
      selectedPatches = [];
      isGuessing = false;
      isFound = false;
      itemPatch = Math.floor(Math.random() * patches);
      guessesLeft = initialGuesses;
      currentMessage = initialMessage;
      // reset
    } else if (!selectedPatches.includes(patch)) {
      isGuessing = true;
    }
  }

  function handleAnimationend() {
    selectedPatches = [...selectedPatches, patch];
    guessesLeft = guessesLeft - 1;
    if (patch === itemPatch) {
      isFound = true;
      currentMessage = "Found it!";
    } else if (guessesLeft === 0) {
      isFound = true;
      currentMessage = "Out of luck...";
    } else {
      currentMessage = `It's ${
        Math.abs(patch - itemPatch) > 1 ? "far away" : "close"
      }!`;
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

  <symbol id="bush" viewBox="0 0 120 100">
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

<form on:submit|preventDefault={handleSubmit}>
  <main>
    <svg viewBox="0 0 150 100" width="50" height="33.33">
      <use href="#location" />
    </svg>

    <h1>{currentMessage}</h1>

    <h2>
      Left:
      <span>{guessesLeft}</span>
    </h2>

    <div class:isGuessing on:animationend={handleAnimationend}>
      {#each Array(patches).fill() as _, i}
        <label class:active={patch === i}>
          <span class="visually-hidden">Select patch {i}</span>
          <input type="radio" name="patches" bind:group={patch} value={i} />
          <svg
            class:selectedPatches={selectedPatches.includes(i)}
            viewBox="0 0 120 100"
            width="12"
            height="10"
          >
            <use href="#bush" />
          </svg>

          {#if itemPatch === i && isFound}
            <svg id="found-item" viewBox="0 0 120 100" width="18" height="15">
              <use href="#item" />
            </svg>
          {/if}
        </label>
      {/each}
    </div>
  </main>

  <div>
    <button
      type="button"
      on:click={() => {
        if (isGuessing) return;
        patch = Math.max(0, patch - 1);
      }}
    >
      <span class="visually-hidden">Left patch</span>
      <svg
        style="transform: rotateY(180deg)"
        viewBox="0 0 100 100"
        width="15"
        height="15"
      >
        <use href="#arrow" />
      </svg>
    </button>

    <button type="submit">
      <span class="visually-hidden">Select patch</span>
    </button>

    <button
      type="button"
      on:click={() => {
        if (isGuessing) return;
        patch = Math.min(patches - 1, patch + 1);
      }}
    >
      <span class="visually-hidden">Right patch</span>
      <svg viewBox="0 0 100 100" width="15" height="15">
        <use href="#arrow" />
      </svg>
    </button>
  </div>
</form>

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
    display: grid;
    place-items: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    background: hsl(60, 20%, 97%);
    accent-color: currentColor;
  }

  form {
    width: 20rem;
    height: 20rem;
    padding: 3.5rem;
    border-radius: 50%;
    background: linear-gradient(
      to bottom,
      #f60b4a 48%,
      #282843 48%,
      #282843 52%,
      #f6f6f6 52%
    );
    box-shadow: 0 0 15px -7.5px hsla(0, 0%, 0%, 0.5);
  }

  main {
    color: #1a1a13;
    background: hsl(60, 20%, 49%);
    border-radius: 0.4rem;
    border: 0.3rem solid #282843;
    padding: 0.5rem;
    margin: 0.25rem 0.25rem 0.5rem;
    display: grid;
    grid-template-columns: 50px auto;
    grid-gap: 0.5rem 0.25rem;
  }

  h2 {
    text-transform: uppercase;
    font-size: 0.8rem;
    align-self: end;
  }

  main > div {
    grid-column: span 2;
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0 0.75rem;
  }

  label {
    position: relative;
    width: 1.42rem;
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
    display: block;
    width: 100%;
    height: auto;
  }

  label svg.selectedPatches {
    opacity: 0.5;
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

  label.active::before {
    position: absolute;
    content: "";
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 0.7rem;
    height: 0.7rem;
    background: #1a1a13;
    clip-path: polygon(0% 80%, 40% 40%, 60% 40%, 100% 80%, 100% 100%, 0% 100%);
    animation: none;
  }

  h1 {
    grid-column: 1/-1;
    grid-row: 3;
    font-size: 1rem;
    padding: 0.2rem;
    border: 2px solid #2c2c20;
    border-radius: 0.2rem;
  }

  form > div {
    display: flex;
    justify-content: center;
    margin-top: 1.75rem;
    gap: 0 1rem;
  }

  button {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    padding: 0.4rem;
    border: none;
    background: none;
    box-shadow: 0 0 2px hsla(0, 0%, 0%, 1);
  }

  button:nth-of-type(2) {
    width: 2.2rem;
    height: 2.2rem;
  }

  button svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .isGuessing .active > svg {
    animation: shake 1s step-start;
  }

  @keyframes shake {
    33% {
      transform: translateY(0.1rem);
    }
    67% {
      transform: translateY(-0.1rem);
    }
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
</style>
