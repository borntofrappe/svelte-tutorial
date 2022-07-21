<script>
  // https://github.com/sveltejs/kit/graphs/contributors
  import { setContext } from 'svelte';
  import Contributions from './Contributions.svelte';
  import Contributors from './Contributors.svelte';
  import { timeParse } from 'd3-time-format';

  setContext('timeParse', timeParse('%Y-%m-%d'));
</script>

<div>
  <Contributions />
  <Contributors />
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    padding: 0;
    color: hsl(0, 0%, 20%);
  }

  :global(.visually-hidden:not(:focus):not(:active)) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
  }

  div {
    max-width: 700px;
    width: 95vw;
    padding: 0 1rem;
    margin: 1rem auto;
  }

  div > :global(* + *) {
    margin-top: 1rem;
  }
</style>
