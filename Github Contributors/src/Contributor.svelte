<script>
  export let name;
  export let index;
  export let totals;
  export let commits;
</script>

<article>
  <svg class="picture" viewBox="0 0 100 100" width="1em" height="1em">
    <use href="#profile-pic" />
  </svg>
  <h2>{name}</h2>
  <p class="position">
    <span class="visually-hidden">Contributor number</span>
    <span>#{index}</span>
  </p>
  <p class="history">
    <span>{totals.commits} commits</span>
    <span class="addition">{totals.additions} ++</span>
    <span class="deletion">{totals.deletions} --</span>
  </p>
  <svg class="viz" viewBox="0 0 400 200" width="400" height="200" />
</article>

<style>
  article {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'picture name position' 'picture history history' 'viz viz viz';
  }

  .picture {
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

  .viz {
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

  .picture {
    justify-self: center;
    align-self: center;
    width: 52px;
    height: auto;
    display: block;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 300;
  }

  p {
    font-size: 0.9rem;
  }

  .history > * + * {
    margin-left: 0.25rem;
  }

  .addition {
    color: hsl(120, 64%, 42%);
  }

  .deletion {
    color: hsl(0, 79%, 49%);
  }

  .viz {
    border-top: 1px solid hsl(0, 0%, 82%);
    width: 100%;
    height: auto;
    display: block;
    padding: 0.25rem 0.5rem 0.75rem;
    background: hsl(0, 0%, 92%);
  }
</style>
