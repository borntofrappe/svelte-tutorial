<script>
  import { onMount } from "svelte";

  let path;
  let points = [];

  onMount(() => {
    const totalLength = path.getTotalLength();
    points = Array(14)
      .fill()
      .map((_, i, { length }) => {
        const { x, y } = path.getPointAtLength((totalLength / length) * i);
        return { x, y };
      });
  });
</script>

<svg viewBox="-50 -50 100 100">
  <defs>
    <path
      bind:this={path}
      fill="none"
      stroke="currentColor"
      d="M 0 0 l 20 20 0 -40 -20 -20 -20 20 0 40z"
    />
  </defs>

  <g fill="currentColor" font-size="5">
    {#each points as { x, y }, i}
      <g transform="translate({x} {y})">
        <circle r="1" />
        <text x="1" y="-1">
          {i}
        </text>
      </g>
    {/each}
  </g>
</svg>

<style>
  svg {
    pointer-events: none;
  }
</style>
