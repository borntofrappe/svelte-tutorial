<script>
  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let svg;
  let g;
  let sl, l, w;
  let hasStarted = false;

  let value = 0;

  onMount(() => {
    handleSize();
  });

  const handleSize = () => {
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

    value = (offsetX - (l - sl)) / w;
  };

  const handleKeydown = (e) => {
    const { code } = e;
    if (code === "ArrowLeft" || code === "ArrowRight") {
      e.preventDefault();
      if (code === "ArrowLeft") value = Math.max(0, value - 0.01);
      if (code === "ArrowRight") value = Math.min(1, value + 0.01);
    }
  };

  $: dispatch("change", { value });
</script>

<svelte:window on:resize={handleSize} />

<svg
  bind:this={svg}
  on:mouseleave={handleEnd}
  style:display="block"
  viewBox="-7 -10 214 20"
>
  <g style:color="hsl(0, 0%, 90%)">
    <rect y="-2.5" width="200" height="5" rx="2.5" fill="currentColor" />
  </g>

  <g
    style:cursor="pointer"
    on:mousedown={handleStart}
    on:mouseup={handleEnd}
    on:mousemove={handleIng}
    style:outline="none"
    tabindex="0"
    aria-label="Change the value with the left and right arrow keys."
    class="focusable"
    on:keydown={handleKeydown}
  >
    <g style:pointer-events="none">
      <!-- [0, 200] 200 being the width of the rectangle -->
      <g transform="translate({value * 200} 0)">
        <g style:color="hsl(185, 62%, 45%)">
          <g transform="scale(0)" class="focus">
            <circle
              r="6.5"
              stroke-width="1"
              fill="none"
              stroke="currentColor"
            />
          </g>
          <circle r="4.5" fill="currentColor" />
        </g>
      </g>
    </g>
    <g bind:this={g}>
      <rect style:opacity="0" width="200" y="-10" height="20" />
    </g>
  </g>
</svg>

<style>
  .focusable .focus {
    transition: transform 0.25s cubic-bezier(0.45, 0, 0.55, 1);
    transform: scale(0);
  }

  .focusable:focus .focus {
    transform: scale(1);
  }
</style>
