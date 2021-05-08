<script>
  import { interpolateSinebow as interpolate } from 'd3-scale-chromatic';
  const duration = 0.5;

  const n = 16;
  const cellSize = 5;
  const width = n * cellSize;
  const height = cellSize;
  const blocks = Array(n)
    .fill()
    .map((_, i, { length }) => {
      return {
        color: interpolate(i / length),
        x: i * cellSize,
        delay:
          i < n / 2
            ? (i / length) * duration
            : ((length - i) / length) * duration,
        scale: 0.25,
        angle: i < n / 2 ? '-0.25turn' : '0.25turn',
      };
    });
</script>

<svg viewBox="{-cellSize / 2} {-cellSize / 2} {width} {height}">
  {#each blocks as { color, x, delay, scale, angle }}
    <g transform="translate({x} 0)">
      <g
        class="scale"
        style="transition: transform {duration}s {delay}s ease-in-out; transform: scale({scale}) rotate({angle})"
      >
        <rect
          transform="translate({-cellSize / 2} {-cellSize / 2})"
          fill={color}
          stroke={color}
          width={cellSize}
          height={cellSize}
        />
      </g>
    </g>
  {/each}
</svg>

<style>
  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  svg:hover .scale {
    transform: scale(0.5) rotate(0turn) !important;
  }
</style>
