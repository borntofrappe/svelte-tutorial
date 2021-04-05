<script>
  export let segment;
</script>

<nav>
  <a aria-current={segment === undefined ? 'page' : undefined} href=".">home</a>
  <a
    rel="prefetch"
    aria-current={segment === 'demos' ? 'page' : undefined}
    href="demos">demos</a
  >
  <a aria-current={segment === 'about' ? 'page' : undefined} href="about"
    >about</a
  >
</nav>

<style>
  nav {
    box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.1);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  a {
    border-bottom: none;
    text-transform: capitalize;
    padding: 1em 0.5em;
    transition: color 0.2s ease-out;
  }

  a:hover {
    color: hsl(204, 100%, 63%);
  }

  [aria-current] {
    color: hsl(15, 100%, 50%);
  }
</style>
