<script>
  import Illustration from './Illustration.svelte';

  export let name;
  export let title;
  export let phone;
</script>

<style>
  main {
    color: hsl(30, 85%, 90%);
    background: hsl(220, 2%, 10%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
    backface-visibility: hidden;
  }
  main div {
    transform: rotate(90deg);
  }

  main div > * + * {
    line-height: 2;
    text-align: center;
  }
  h1 {
    font-family: 'Kanit', sans-serif;
    letter-spacing: 2px;
    font-size: 1.5rem;
    font-weight: 700;
  }
  h2, h3 {
    font-weight: 300;
  }
  h2 {
    font-size: 1.2rem;
  }
  h3 {
    font-size: 1rem;
  }
</style>

<main>
  <div>
    <Illustration {phone} />
    <h1>{name}</h1>
    <h2>{title}</h2>
    <h3>{phone}</h3>
  </div>
</main>
