<script context="module">
  export async function preload(page) {
    const { id } = page.params;

    const res = await this.fetch(`demos/${id}.json`);
    if (res.status === 200) {
      const demo = await res.json();
      return {
        ...demo,
      };
    } else if (res.status === 404) {
      const { error } = await res.json();
      this.error(404, error);
    }
  }
</script>

<script>
  export let title;
  export let details;
  export let href;
</script>

<div>
  <h1>{title}</h1>
  {@html details}
  <a target="_blank" {href}>Live demo</a>
</div>

<style>
  div > :global(* + *) {
    margin-top: 0.5rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  a {
    display: inline-block;
    font-size: 1.5rem;
  }

  a::after {
    content: ' →';
  }
</style>
