<script>
  import AreaChart from './AreaChart.svelte';
  export let name;
  export let src;
  export let href;
  export let position;
  export let commits;
  export let additions;
  export let deletions;
  export let weeks;

  export let max;
  const xAccessor = (d) => d.w;
  const yAccessor = (d) => d.c;
</script>

<article>
  <img width="60" height="60" {src} alt="Profile picture for {name}" />
  <h2><a {href} target="_blank">{name}</a></h2>
  <p class="position">
    <span class="visually-hidden">Contributor number</span>
    <span>#{position}</span>
  </p>
  <p class="history">
    <span>{commits} commits</span>
    <span class="additions">{additions} ++</span>
    <span class="deletions">{deletions} --</span>
  </p>

  <AreaChart data={weeks} {max} {xAccessor} {yAccessor} />
</article>

<style>
  article {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'picture name position' 'picture history history' 'viz viz viz';
    width: 350px;
  }

  img {
    grid-area: picture;
  }

  h2 {
    grid-area: name;
  }

  .position {
    grid-area: position;
  }

  .history {
    grid-area: history;
  }

  article > :global(svg) {
    grid-area: viz;
  }

  article {
    border-radius: 0.5rem;
    background: hsl(0, 0%, 100%);
    border: 0.1px solid hsl(0, 0%, 82%);
    box-shadow: 0 1px 5px -4px currentColor;
  }

  article > * {
    padding: 0.25rem 0.5rem;
  }

  img {
    box-sizing: initial;
    transform: scale(0.75);
    border-radius: 50%;
    justify-self: center;
    align-self: center;
    display: block;
  }

  h2 {
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 0.9rem;
  }

  .history > * + * {
    margin-left: 0.25rem;
  }

  .additions {
    color: hsl(120, 64%, 42%);
  }

  .deletions {
    color: hsl(0, 79%, 49%);
  }

  article > :global(svg) {
    border-top: 1px solid hsl(0, 0%, 82%);
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
    width: 100%;
    height: auto;
    display: block;
    padding: 0.25rem 0.5rem 0.75rem;
    background: hsl(0, 0%, 96%);
  }
</style>
