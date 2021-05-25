<script>
  let checked;
  const talks = [
    'Keys! Keys that open any door!',
    'Begone, you fool!',
    'Fwah-fwah-fwah-fwah!',
  ];
  $: talk = checked && talks[Math.floor(Math.random() * talks.length)];

  function typewriter(node, { speed = 50 }) {
    const { textContent: text } = node;
    const { length } = text;

    const duration = speed * length;
    return {
      duration,
      tick: (t) => {
        const i = ~~(length * t);
        node.textContent = text.slice(0, i);
      },
    };
  }
</script>

<div>
  <label>
    <svg
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 16 16"
      shape-rendering="crispEdges"
    >
      <path
        stroke="#0c1019"
        d="M5 0h7M3 1h2M12 1h1M1 2h2M12 2h1M3 3h1M12 3h1M4 4h1M7 4h1M10 4h1M12 4h1M5 5h1M7 5h1M10 5h1M12 5h1M5 6h1M13 6h1M2 7h3M13 7h1M2 8h2M14 8h1M1 9h1M4 9h1M14 9h1M1 10h1M4 10h1M14 10h1M2 11h2M14 11h1M2 12h2M14 12h1M2 13h1M4 13h1M14 13h1M2 14h1M4 14h1M13 14h1M2 15h1M6 15h2M10 15h2"
      />
      <path
        stroke="#101cae"
        d="M5 1h7M3 2h9M4 3h3M8 3h2M11 3h1M5 4h1M8 6h2M12 6h1M5 7h3M10 7h3M4 8h2M12 8h2M5 9h2M11 9h3M5 10h3M11 10h3M4 11h5M10 11h4M4 12h10M5 13h9M7 14h6"
      />
      <path
        stroke="#f8fefc"
        d="M7 3h1M10 3h1M6 4h1M8 4h2M11 4h1M6 5h1M8 5h2M11 5h1M6 6h2M10 6h2M8 7h2M6 8h6M2 9h2M7 9h4M2 10h2M8 10h3M9 11h1M5 14h2"
      />
    </svg>
    <input bind:checked type="checkbox" />
    <span>Talk</span>
  </label>

  {#if talk}
    <p>
      <span aria-hidden="true">
        <span>{talk}</span>
      </span>
      <span in:typewriter>
        {talk}
      </span>
    </p>
  {/if}
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(body) {
    padding: 0.5rem;
  }

  div {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0 1rem;
    padding: 0.5rem 0;
  }

  label svg {
    width: 2em;
    height: auto;
    display: inline-block;
  }

  p {
    position: absolute;
    bottom: 100%;
    left: 0%;
  }

  p span[aria-hidden] span {
    opacity: 0;
  }

  p > span {
    position: absolute;
    bottom: 100%;
    width: max-content;
    border: 2px solid transparent;
    padding: 0.35rem 0.5rem;
  }

  p > span:first-of-type {
    background: hsl(0, 0%, 100%);
    border-color: currentColor;
    border-radius: 0.25rem;
  }
</style>
