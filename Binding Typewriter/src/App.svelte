<script>
  function typewriter(node, { speed = 50 }) {
    const { innerText: text } = node;
    const { length } = text;

    const duration = speed * length;
    return {
      duration,
      tick: (t) => {
        const i = ~~(length * t);
        node.innerText = text.slice(0, i);
      },
    };
  }

  let checked;
  const talks = ['Begone, you fool!', 'Fwah-fwah-fwah-<br/>fwah!'];

  const vases = [
    { value: "What's this?<br/> The Herb?", odds: 0.2 },
    { value: "What's this?<br/> The Cloth?", odds: 0.1 },
    { value: "What's this?<br/> The STRseed?", odds: 0.1 },
    { value: 'But nothing was<br/>found.', odds: 0.6 },
  ].reduce(
    (acc, { value, odds }) => [
      ...acc,
      {
        value,
        odds: acc[acc.length - 1] ? acc[acc.length - 1].odds + odds : odds,
      },
    ],
    []
  );

  function getOptions(n = 3) {
    return Array(n)
      .fill()
      .map((_) => ({
        id: Math.random(),
        value: vases.find(({ odds }) => Math.random() < odds).value,
      }));
  }

  let option;
  let options = getOptions();

  function handleBlur() {
    option = null;
    // regenerate the options
    options = getOptions();
  }
</script>

<label>
  <input bind:checked type="checkbox" />
  <span>Talk</span>
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
</label>

{#if checked}
  <p in:typewriter>
    {@html talks[Math.floor(Math.random() * talks.length)]}
  </p>
{/if}

<fieldset>
  <legend> Peer into a vase </legend>
  {#each options as { id, value }}
    <label>
      <input bind:group={option} type="radio" value={id} on:blur={handleBlur} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -0.5 16 16"
        shape-rendering="crispEdges"
      >
        <path
          stroke="#0c1019"
          d="M5 0h6M4 1h1M11 1h1M3 2h1M5 2h6M12 2h1M2 3h1M4 3h8M13 3h1M2 4h1M4 4h8M13 4h1M3 5h1M5 5h6M12 5h1M2 6h1M4 6h1M11 6h3M1 7h1M5 7h6M12 7h3M0 8h1M11 8h5M0 9h1M10 9h1M12 9h1M14 9h2M0 10h1M11 10h1M13 10h3M0 11h1M10 11h1M12 11h4M1 12h1M9 12h1M11 12h1M13 12h2M2 13h1M4 13h1M6 13h1M8 13h1M10 13h1M12 13h2M3 14h3M7 14h1M9 14h4M4 15h8"
        />
        <path
          stroke="#a4773e"
          d="M5 1h1M9 1h2M11 2h1M12 3h1M3 4h1M12 4h1M4 5h1M11 5h1M3 6h1M5 6h6M2 7h1M4 7h1M11 7h1M1 8h1M6 8h5M1 9h1M3 9h1M5 9h1M7 9h1M9 9h1M11 9h1M13 9h1M1 10h2M4 10h1M6 10h5M12 10h1M1 11h9M11 11h1M2 12h7M10 12h1M12 12h1M3 13h1M5 13h1M7 13h1M9 13h1M11 13h1M6 14h1M8 14h1"
        />
        <path
          stroke="#ffe489"
          d="M6 1h3M4 2h1M3 3h1M3 7h1M2 8h4M2 9h1M4 9h1M6 9h1M8 9h1M3 10h1M5 10h1"
        />
      </svg>
    </label>
  {/each}
</fieldset>

{#if option}
  <p in:typewriter>
    {@html options.find(({ id }) => id === option).value}
  </p>
{/if}

<style>
  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(body) {
    padding: 0.5rem;
  }

  label svg {
    width: 2em;
    height: auto;
    display: inline-block;
  }

  p {
    font-size: 1rem;
  }
</style>
