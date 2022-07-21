<script>
  import { spring } from 'svelte/motion';

  // animate the bug's position and rotation
  const coords = spring(
    {
      x: 0,
      y: 0,
    }
    /* experiment with the spring options
	{
		stiffness: 0.5,
		damping: 0.5
	}
	*/
  );
  const angle = spring(0);

  // collect the cursor coordinates to describe the d attribute of the path element
  let path = [[0, 0]];
  // build a line starting at the coordinates of path[0] and progressing with each set of coordinates
  $: d = `${path
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join('')}`;

  // compute the angle on the basis of the opposite and adjacent segments of the right triangle
  function getAngle(dx, dy) {
    let a = (Math.atan(Math.abs(dx) / Math.abs(dy)) * 180) / 3.14;
    if (dx < 0 && dy < 0) {
      a += 270;
    }
    if (dx < 0 && dy > 0) {
      a += 180;
    }
    if (dx > 0 && dy > 0) {
      a += 90;
    }
    return a;
  }

  // update the coordinates and the angle on the basis of the mouse coordinates
  function handleMousemove(e) {
    const { clientX, clientY } = e;
    angle.set(getAngle(clientX - $coords.x, clientY - $coords.y));
    path = [...path, [clientX, clientY]];

    coords.set({
      x: clientX,
      y: clientY,
    });
  }
</script>

<!-- reset the path array following a click event -->
<svg on:mousemove={handleMousemove} on:click={() => (path = [])}>
  <!-- dashed line using the array coordinates -->
  <path
    opacity="0.4"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="5"
    stroke-dasharray="10 20"
    {d}
  />

  <!-- bug icon translated and rotated with the springs' values -->
  <g transform="translate({$coords.x} {$coords.y}) rotate({$angle})">
    <g
      transform="scale(0.5)"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-linecap="round"
    >
      <g stroke-width="8" fill="currentColor">
        <path d="M -0 -46 a 17 17 0 0 1 17 17 h -34 a 17 17 0 0 1 17 -17" />
        <path d="M -0 -10 h 25 v 25 a 25 25 0 0 1 -50 0 v -25 z" />

        <g stroke-width="16" transform="translate(0 13.5)">
          <path d="M 34 0 h -68" />
          <path transform="rotate(45)" d="M 40 0 h -80" />
          <path transform="rotate(-45)" d="M 40 0 h -80" />
        </g>
      </g>
    </g>
  </g>
</svg>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    color: hsl(0, 0%, 10%);
    background: hsl(35, 90%, 50%);
    position: relative;
  }
  /* add text in the body's background and through pseudo elements
	! pointer-events: none;
	 */
  :global(body:before),
  :global(body:after) {
    pointer-events: none;
    position: absolute;
    left: 50%;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
  :global(body:before) {
    content: "It's a Feature";
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20vmin;
    opacity: 0.2;
    font-weight: bold;
  }
  /* hide the pseudo element when the body is being hovered upon */
  :global(body:after) {
    content: 'Click to clear the "canvas"';
    bottom: 0%;
    transform: translate(-50%, 0%);
    font-size: 1rem;
    transition: opacity 0.2s ease-in-out;
    width: max-content;
  }
  :global(body:hover:after) {
    opacity: 0;
  }
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
