<script>
  // split is passed as a string or an array of objects (as an object to have more control on the style of the individual span elements)
  export let split;

  // if the input is a string, build an array of objects out of every character
  $: if (typeof split === 'string') {
    split = split.split('').map((character) => ({
      id: Math.random(),
      value: character,
    }));
  }

  // variable differentiating the appearance of the span elements
  export let btn = false;
  export let delay = 0;
</script>

<!-- return one span element for each object
add two classes according to the values of
- btn, to have the span elements styled like a button
- correct, to have the span painted green
-->
{#each split as unit, i (unit.id)}
  {#if unit.value !== ' '}
    <span
      class:btn
      class:correct={unit.correct}
      aria-hidden="true"
      data-key={unit.value.charCodeAt(0)}
      style="animation-delay: {i * 0.04 + 0.15 + delay}s;'}"
    >
      {unit.value}
    </span>
  {:else}
    <br />
  {/if}
{/each}

<style>
  span {
    display: inline-block;
    animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }

  span.btn {
    background: hsl(0, 0%, 100%);
    border: 2px solid hsl(0, 0%, 90%);
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
    color: hsl(0, 0%, 20%);
    box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
    position: relative;
  }

  span.correct {
    color: hsl(125, 80%, 40%);
  }

  span.btn + span.btn {
    border-left: none;
  }

  span.btn:after {
    content: attr(data-key);
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.75rem;
    margin: 0.1rem;
  }

  span.btn:hover {
    background: hsl(0, 0%, 95%);
    box-shadow: initial;
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: initial;
      transform: initial;
    }
  }
</style>
