<script>
  import { lazy, lazyAll } from './utils.js';
  let src =
    'https://images.pexels.com/photos/164446/pexels-photo-164446.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';
</script>

<h1>Lazy Load Images</h1>
<p style="margin-bottom: 100vh;">Feel free to scroll</p>

<h2>lazy</h2>
<p>Individual images</p>
<img
  use:lazy={{ rootMargin: '-100px' }}
  alt=""
  data-src={src}
  width="1260"
  height="750"
/>

<hr />

<h2>lazyAll</h2>

<p>
  All the images in a <code>div</code> container.
</p>
<div use:lazyAll>
  {#each Array(5) as _}
    <article>
      <h3>Here's a cute dog</h3>

      <img alt="" data-src={src} width="1260" height="750" />
    </article>
  {/each}
</div>

<style>
  img {
    max-width: 400px;
    width: 100%;
    height: auto;
  }
</style>
