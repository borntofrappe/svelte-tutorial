<script>
  // dispatcher to bubble up the data for the picture
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let size;
  export let color;
  // variable bound to the canvas element
  let canvas;
  $: if (canvas) {
    // the delay seems to fix the overlap between the change in size and the paint operation
    const timeout = setTimeout(() => {
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, size, size);
      context.save();

      /* recreate icon.svg with the Path2D interface
      !! experimental !!
      */

      // viewBox
      context.translate(size / 2, size / 2);
      context.scale(size / 100, size / 100);

      // appearance
      context.lineWidth = 8;
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineCap = 'round';
      context.lineJoin = 'round';

      const path = new Path2D(
        'M 0 -15 c 5 -30 45 -30 45 0 q 0 25 -45 55 q -45 -30 -45 -55 c 0 -30 40 -30 45 0'
      );
      context.stroke(path);
      context.fill(path);

      context.restore();

      // context.restore();
      dispatch('draw', canvas.toDataURL('image/png'));

      clearTimeout(timeout);
    });
  }
</script>

<canvas bind:this={canvas} width={size} height={size} />

<style>
  canvas {
    margin: 2rem 0;
  }
</style>
