<script>
  export let href;
  export let width = 25;
  export let height = 25;
</script>

<svg aria-hidden="true" viewBox="0 0 100 100" {width} {height}>
  <use href="#{href}" />
</svg>

<style>
  svg {
    display: block;
  }
</style>
