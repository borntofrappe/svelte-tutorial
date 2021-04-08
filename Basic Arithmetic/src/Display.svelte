<script>
  export let digits;
</script>

<p>
  {#each digits as digit, index (digit.id)}
    <span style="animation-delay: {0.05 * index}s;">{digit.value}</span>
  {/each}
</p>

<style>
  p {
    padding: 0.5rem 0;
    align-self: flex-end;
    font-size: 2.5rem;
    overflow: hidden;
  }
  p span {
    display: inline-block;
    position: relative;
    animation: scrollIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.5) both;
  }
  span::selection {
    background: hsla(0, 0%, 90%, 0.2);
  }
  @keyframes scrollIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }
</style>
