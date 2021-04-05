<script>
  import Nav from '../components/Nav.svelte';
  import Footer from '../components/Footer.svelte';

  export let segment;
</script>

<div>
  <Nav {segment} />

  <main>
    <slot />
  </main>

  <Footer />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    position: relative;
    max-width: 62em;
    width: 90vw;
    padding: 2em;
    align-self: center;
  }

  div :global(footer) {
    margin-top: auto;
  }
</style>
