<script>
  import Canvas from './Canvas.svelte';

  let size = 200;
  let color = 'rgb(0, 0, 0)';

  // attributes of the anchor link
  $: download = `icon-${size}`;
  let href;
</script>

<form on:submit|preventDefault>
  <label>
    Size
    <input type="number" bind:value={size} />
  </label>

  <label>
    Color
    <input type="color" bind:value={color} />
  </label>
</form>

<!-- update the href attribute with the value dispatched by the canvas component -->
<Canvas on:draw={(e) => (href = e.detail)} {size} {color} />

{#if href}
  <a {href} {download}>Download <strong>{download}</strong></a>
{/if}

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  a {
    font-size: 3rem;
    display: block;
  }
</style>
