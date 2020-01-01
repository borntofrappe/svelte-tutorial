<script>
  export let name;
  export let title;
  export let phone;
</script>

<style>
  main {
    text-align: center;
  }
  main > * + * {
    margin-top: 1rem;
  }
  h1,
  h2 {
    font-family: "Playfair Display", cursive;
    font-size: 1.5rem;
  }
  h3 {
    font-weight: 400;
  }
</style>

<main>
  <h1>{name}</h1>
  <h2>{title}</h2>
  <h3>{phone}</h3>
</main>
