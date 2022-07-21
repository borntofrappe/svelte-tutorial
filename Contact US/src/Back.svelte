<script>
  // display the information following the illustration
  import Illustration from './Illustration.svelte';

  export let name;
  export let title;
  export let phone;
</script>

<main>
  <section>
    <Illustration {phone} />
    <h1>{name}</h1>
    <h2>{title}</h2>
    <h3>{phone}</h3>
  </section>
</main>
