<script>
  import Calculator from './Calculator.svelte';
  import Display from './Display.svelte';
  import { randomInt } from './utils.js';

  // components of the basic operation
  let num1 = randomInt();
  let operator = '+';
  let num2 = randomInt();

  // result considering the operator
  $: result = operator === '+' ? num1 + num2 : num1 - num2;
  // array describing the individual digits from the result
  // ! add a unique id so to give each digit a different key (for the animation)
  $: digits = result
    .toString()
    .split('')
    .map((value) => ({
      value,
      id: Math.random(),
    }));

  // following the update event from the calculator update the operation with the passed values
  function handleUpdate({ detail }) {
    num1 = detail.num1;
    operator = detail.operator;
    num2 = detail.num2;
  }
</script>

<div>
  <Calculator on:update={handleUpdate} {num1} {num2} {operator} />
  <Display {digits} />
</div>

<style>
  div {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
