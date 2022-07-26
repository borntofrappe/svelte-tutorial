<script>
  export let progress;
  export let matches;
  export let total;
  export let moves;
</script>

<section class="datum">
  <progress value={progress} />
  <p>
    Pairs matched
    <span><span class="large">{matches}</span>/{total}</span>
  </p>
</section>

<section class="datum">
  <p>
    Total moves
    <span class="large">{moves}</span>
  </p>
</section>

<style>
  section {
    padding: 0.5rem 0.8rem;
    background: hsl(0, 0%, 100%);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  section > progress {
    width: 100%;
    accent-color: hsl(201, 79%, 46%);
  }

  section > p {
    margin-top: auto;
  }

  p > span {
    display: block;
    font-weight: 700;
    font-size: 1.2rem;
  }

  span.large {
    font-size: 1.5rem;
  }
</style>
