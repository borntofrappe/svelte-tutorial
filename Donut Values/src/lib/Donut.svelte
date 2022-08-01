<script>
  import { fade } from "svelte/transition";
  import { tweened } from "svelte/motion";
  export let value = 57;
  export let average = 83;
  export let color = "hsl(125, 50%, 60%)";

  const pathLength = 100;
  const id = Math.random().toString().slice(-5);
  let showAverage = false;

  $: offset = pathLength - value;
  $: angle = (360 * average) / pathLength;

  const tOffset = tweened(pathLength, {
    duration: 1000,
  });
  const tAngle = tweened(-10, {
    duration: 500,
  });

  $: update(offset, angle);

  const update = async (offset, angle) => {
    await tOffset.set(offset);
    showAverage = true;
    tAngle.set(angle);
  };
</script>

<svg style:color viewBox="-70 -70 140 140">
  <defs>
    <path
      id="donut-textpath-{id}"
      d="M 0 -60 a 60 60 0 0 1 0 120 60 60 0 0 1 0 -120"
    />
    <path
      {pathLength}
      fill="none"
      stroke-width="10"
      stroke-linecap="round"
      id="donut-path-{id}"
      d="M 0 -50 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100"
    />
    <mask id="donut-mask-{id}">
      <rect fill="white" x="-70" y="-70" width="140" height="140" />
      {#if showAverage}
        <g in:fade>
          <g transform="rotate({$tAngle})">
            <g transform="translate(0 -55)">
              <path d="M -5 0 h 10 l -5 5z" />
            </g>
          </g>
        </g>
      {/if}
    </mask>
  </defs>
  <g mask="url(#donut-mask-{id})">
    <use href="#donut-path-{id}" stroke="hsl(0, 0%, 90%)" />
    <use
      href="#donut-path-{id}"
      stroke="currentColor"
      stroke-dasharray={pathLength}
      stroke-dashoffset={$tOffset}
    />
  </g>
  <g
    text-anchor="middle"
    dominant-baseline="central"
    font-size="20"
    font-weight="700"
    fill="currentColor"
  >
    <text>
      {Math.floor(pathLength - $tOffset)}%
    </text>
  </g>

  {#if showAverage}
    <g
      in:fade
      font-size="10"
      style:text-transform="uppercase"
      fill="hsl(0, 0%, 60%)"
    >
      <g transform="rotate({$tAngle})">
        <text>
          <textPath href="#donut-textpath-{id}">
            {average}% Average
          </textPath>
        </text>
      </g>
    </g>
  {/if}
</svg>

<style>
  svg {
    color: hsl(125, 50%, 60%);
    display: block;
    max-width: 20rem;
  }
</style>
