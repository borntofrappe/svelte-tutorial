# [Bit Shifting](https://svelte.dev/repl/a3bd24b328ce4f318b7b045381faf6a4)

This project begun as a way to replicate [a demo](https://github.com/borntofrappe/code/tree/master/Bit%20Shifting) introduced in the [borntofrappe/code](https://github.com/borntofrappe/code) repository, to illustrate a binary counter and how the bitwise operator `>>`.

The demo is here improved to shift operands in both directions, to the right `>>` and to the left `<<`, and works to highlight two particular features of Svelte:

- [reactive declarations](https://svelte.dev/tutorial/reactive-declarations)

- [group bindings](https://svelte.dev/tutorial/group-inputs)

## Counting

The idea is to include multiple checkboxes with a value describing the decimal value for the matching binary.

- initialize an array detailing the different values: `128`, `64`, `32` and so forth until `2`, `1`.

  ```js
  const operands = Array(8)
    .fill()
    .map((d, i, { length }) => 2 ** (length - (i + 1)));
  ```

- add as many checkboxes as there are numbers with an [`each` block](https://svelte.dev/tutorial/each-blocks)

  ```js
  {#each operands as operand}
    <input type="checkbox" value={operand} />
  {/each}
  ```

  _Please note_: the markup is more complex, since the checkbox is accompanied by an helpful label and SVG syntax describing a lightbulb. In the snippet, however, the focus is on how the numbers are used.

With this setup, there exist eight checkboxes, each with the decimal value describing the binary operand. To collect the selected values, all that is necessary is to use a [group binding](https://svelte.dev/tutorial/group-inputs).

```js
{#each operands as operand}
  <input type="checkbox" bind:group={digits} value={operand} />
{/each}
```

The tutorial explains group bindings with an array of strings, but here the logic is the same, only with number values.

`digits` is initialized with an empty array.

```js
let digits = [];
```

As a checkbox is toggled, however, the array is updated with the matching value. Select the last checkbox, for instance, and the array is populated with the value `1`. The penultimate, and the array receives `2` as well.

_Please note_: you can attest the change in the array by displaying its contents in the console, and using a [reactive statement](https://svelte.dev/tutorial/reactive-statements).

```js
// select 128, 64
$: console.log(digits); // [128, 64]
```

This is already enough to produce the decimal number. All that is necessary is to compute the sum of the numbers in the array.

```js
$: number = digits.reduce((acc, curr) => acc + curr, 0);
```

To sum up:

- as a checkbox is toggled, `digits` is updated to consider the selected values

- as `digits` is updated, `number` is computed to consider the sum of the digits. The `console.log` statement is also run, but that bears less impact on the demo.

## Shifting

Shifting the operands to the left or to the right is made possible thanks to the fact that the binding goes both ways. This is first described at the end of the tutorial explaining [text inputs](https://svelte.dev/tutorial/text-inputs).

In the context of the demo:

- as the state of the checkbox changes, `digits` is updated to consider the selected values

- as `digits` is modified, the checkboxes are updated to consider the existing digits

With this in mind, shifting the operands is a matter of considering the existing digits, and the chosen direction.

### Right

Shifting operands to the right means that the number is effectively halved. `128` shifts to be `64`, `32` shifts to be `16` until finally, `1` shifts to `0`.

In the project I use a `reduce` function to modify the array with this logic, but the concept is perhaps better explained with a `map` and `filter` function:

- loop through the array and halve the existing numbers, rounding the values down to the nearest integer

  ```js
  digits.map((digit) => Math.floor(digit / 2));
  ```

- filter out the number `0`

  ```js
  digits.map((digit) => Math.floor(digit / 2)).filter((digit) => digit !== 0);
  ```

As `digits` is modified to consider the new halved digits, only the matching checkboxes are selected, and `number` is re-computed to consider the new total.

### Left

Shifting operands to the left is essentially the opposite operation to shifting operands to the right. Instead of halving numbers, the idea is to here double the contents of the `digits` array.

```js
digits.map((digit) => digit * 2);
```

Instead of filtering out the number `0`, then, filter out the digit exceeding the first column.

```js
digits
  .map((digit) => digit * 2)
  .filter((digit) => digit !== 2 ** operands.length);
```

_Please note_: in the `reduce` function I consider `operands.length - 1`, since the number is considered _before_ it is doubled.

### Button(s)

The `disabled` attribute of the button(s) allows to display yet another reactive variable. This time, the idea is to compute a boolean returning `true` if the array is empty.

```js
$: disabled = digits.length === 0;
```

This is to allow the shifting operation only when possible. Only when there are numbers to be doubled/halved.
