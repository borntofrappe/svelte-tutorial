<script>
  export let letters = ["a", "b", "c", "d"];

  const dimensions = Math.floor(letters.length ** 0.5);

  const grid = letters.map((letter, i) => {
    return {
      letter,
      c: i % dimensions,
      r: Math.floor(i / dimensions),
    };
  });
</script>

<svg viewBox="-0.5 -0.5 {dimensions} {dimensions}">
  <g
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="monospace"
    font-size="0.5"
  >
    {#each grid as { letter, c, r }}
      <g transform="translate({c} {r})">
        <text>{letter}</text>
      </g>
    {/each}
  </g>
</svg>
