<script>
  export let title;
  export let description;
  export let href;
</script>

<article>
  <h2>{title}</h2>
  <p>{description}</p>
  <a target="_blank" {href}>Check it out</a>
</article>

<style>
  article {
    padding: 1rem;
  }
  article > * + * {
    margin-top: 1rem;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    line-height: 1.5;
  }
  a {
    font-size: 1.2rem;
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
  a::after {
    content: ' →';
  }
</style>
