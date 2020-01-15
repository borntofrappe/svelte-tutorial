<script>
  let num1 = 0;
  let num2 = 0;
  let operator = "+";
</script>

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    font-size: 2rem;
  }
</style>

<input type="number" bind:value="{num1}" />
<select bind:value="{operator}">
  <option value="+">+</option>
  <option value="-">-</option>
</select>
<input type="number" bind:value="{num2}" />

<p>
  {num1} {operator} {num2} = {operator === '+' ? num1 + num2 : num1 - num2}
</p>
