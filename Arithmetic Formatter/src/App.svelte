<script>
  import Form from './Form.svelte'
  import { randomInt } from "./utils.js"


  let num1 = randomInt()
  let operator = "+"
  let num2 = randomInt()

  $: result = operator === "+" ? num1 + num2 : num1 - num2
  $: digits = result.toString().split("").map((value) => ({
    value,
    id: Math.random(),
  }))

  function handleUpdate({detail}) {
    num1 = detail.num1
    operator = detail.operator
    num2 = detail.num2
  }
</script>

<style>
  div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  div > * + * {
    margin-top: 1rem;
  }
  p {
    align-self: flex-end;
    font-size: 3rem;
    overflow: hidden;
  }
  p span {
    display: inline-block;
    position: relative;
    animation: scrollIn 0.5s ease-in-out both;
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

<div>
  <Form on:update="{handleUpdate}" {num1} {num2} {operator} />
    <p>
      {#each digits as digit, index (digit.id)}
        <span style="animation-delay: {0.1 * index}s;">{digit.value}</span>
      {/each}
    </p>
</div>
