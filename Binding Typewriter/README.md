# Binding Typewriter

## Notes

The tutorial devoted to [custom JS transition](https://svelte.dev/tutorial/custom-js-transitions) introduces an animation where the text of different HTML elements is introduced letter by letter. The goal of this project is to consider the same animation in the context of two small demos, binding the state of `<input/>` element of type [`checkbox`](https://svelte.dev/repl/d6a041928cc14550bca2cb0eb25772ad?version=3.38.2) and [`radio`](https://svelte.dev/repl/e3b4a6f5d1db4e6eb7e71cd461fd5ff6?version=3.38.2).

### Typewriter

The HTML elements animated with the typewriter effect call a function following the `in` directive.

```svelte
<p in:typewriter>letter by letter</p>
```

The function receives as argument the node invoking the method and an optional object to change the parameters of the animation.

```js
function typewriter(node, { speed = 50 }) {}
```

In this instance `speed` refers to the number of milliseconds it takes to show one additional letter of the node. The tutorial is here more refined than the demos, and checks the validity of the node restricting the animation to HTML elements nesting only text. In the demos, and since the content of the elements is known ahead of time to be a string, I decided to focus on the animation only.

```js
function typewriter(node, { speed = 50 }) {
  const { textContent: text } = node;
  const { length } = text;

  const duration = speed * length;
  return {
    duration,
    tick: (t) => {
      const i = ~~(length * t);
      node.textContent = text.slice(0, i);
    },
  };
}
```

The function considers the text of the input element, and through the `tick` function shows the string with an increasing number of characters. `t` is an argument which grows in the `[0, 1]` range, while the double tilde operator `~~` works to floor the value of `length * t`.

```js
const i = ~~(length * t);
const i = Math.floor(length * t);
```

### Checkbox

As the input of type `checkbox` is checked, and as the bound variable is toggled to `true`, the idea is to assign to `talk` one of the strings stored in the `talks` array.

```js
$: talk = checked && talks[Math.floor(Math.random() * talks.length)];
```

The reactive declaration and the double ampersand `&&` operator mean that `talk` stores either a string or a falsy value. This allows the paragraph element to animate the text as the `if` statement is executed.

```svelte
{#if talk}
  <p in:typewriter>
    {talk}
  </p>
{/if}
```

This works, but the demo includes a slightly more complex structure, where the string and the associated animation are included through a `<span>` element. This is to have an additional `<span>` element provide a solid background and border for the entire string, before the string can actually be typed. The border would otherwise grow with the text, letter by letter.

### Radio

As explained in the [tutorial](https://svelte.dev/tutorial/group-inputs), group inputs are bound to the same variable.

```svelte
<script>
  let option;
</script>

<input type="radio" bind:group={option} value="if">
<input type="radio" bind:group={option} value="else">
```

`option` is then assigned the value of the `<input />` elements acording to user choice.

In the demo, `options` is an array of objects with a unique `id` and a string value. The string is picked from a set of hard-coded options, and on the basis of arbitrary probabilities.

```js
const vases = [
  { value: "What's this? The Herb?", odds: 0.25 },
  { value: "What's this? The Cloth?", odds: 0.1 },
  { value: "What's this? The STRseed?", odds: 0.05 },
  { value: "What's this? The DEFseed?", odds: 0.05 },
  { value: 'But nothing was found.', odds: 0.55 },
];
```

To pick an element relative to the probability `vases` is first modified to consider the cumulative odds. This is achieved with a `reduce` function incrementing the `odds` field with the value of the preceding item in the array. Once the odds are cumulative, picking one of the values is a matter of computing a random value and finding the first item with odds greater than the random value.

```js
vases.find(({ odds }) => Math.random() < odds);
```

The radio buttons are then bound to the `id` element, to avoid having two elements with the same string value.

```svelte
<input
  type="radio"
  bind:group={option}
  value={id} />
```

This means `option` stores the `id` instead of the string.

In terms of the JS animation, the typewriter effect is included on a paragraph element, conditional to an option being picked.

```svelte
{#if option}
  <p in:typewriter>
  </p>
{/if}
```

This works, but only as the user selects the first input element. Past this choice, the text is updated without the animation. One possible way to animate every choice is to benefit from Svelte two-way binding, and setting `option` back to `null` before it has a chance to be updated. This is the purpose of the `handleFocus` function, called when registering the `focus` event.

```js
function handleFocus() {
  option = null;
}
```

Previously I considered the `blur` event, but the decision was short-lived as I realized that the option would be erased as the user would move away from the `<input />` elements.

Thanks to Svelte reactive declarations, it is also possible to update `options` to refer to an entirely different set of strings.

```js
function handleFocus() {
  option = null;
  options = getOptions();
}
```

Note that in this instance setting `option` to `null` is necessary, as the variable would otherwise refer to a unique `id` which no longer exist.
