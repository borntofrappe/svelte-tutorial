<script context="module">
  export async function preload() {
    const res = await this.fetch('/demos.json');
    const demos = await res.json();

    return {
      demos,
    };
  }
</script>

<script>
  export let demos;
  const { id } = demos[Math.floor(Math.random() * demos.length)];
</script>

<svelte:head>
  <title>Svelte Showcase</title>
</svelte:head>

<h1>Svelte Showcase</h1>
<p>A series of demos built with Svelte.</p>

<figure>
  <img alt="Svelte Logo" src="/logo-192.png" />
  <figcaption>
    <a rel="prefetch" href="demos/{id}">Try your luck</a>
  </figcaption>
</figure>

<style>
  h1,
  p,
  figure {
    text-align: center;
  }

  h1 {
    font-size: 3rem;
  }

  p,
  a {
    font-weight: 300;
  }

  figure {
    margin: 2rem 0;
  }

  a {
    font-weight: 600;
  }
</style>
