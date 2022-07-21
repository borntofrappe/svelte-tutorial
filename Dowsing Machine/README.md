# [Dowsing Machine](https://svelte.dev/repl/77a677bc6ecc466d86769369913fea7d?version=3.44.3)

## Preface

I first created the minigame with vanilla JavaScript. You can find a live demo [on CodePen](https://codepen.io/borntofrappe/full/qGeyqN).

## layout

The `layout` folder focuses on the structure and style of the component, trying to combine semantic markup with the desired design. The intent is to try and accommodate for touch and keyboard input, even if the demo is visual in nature.

## script

I am positive there is a better way to implement the selection of a patch of grass and the reveal of the hidden item, but here's how I recreated the feature:

- `isGuessing` and `isFound` are defined as two boolean, controlling variables

- following the `submit` event on the wrapping form `handleGuess` updates `isGuessing` to true. Note that the same function prevents any additional submission by checking the variable first

- `isGuessing` updates the class of the `<fieldset>` element, `guessing`

- the `.guessing` class makes it possible to animate the patch of grass to shake vertically

- following the `animationend` event on the same `<fieldset>` element `handleReveal` compares the selected patch of grass against the position of the item. This is where the logic of the simple game is implemented:

  1. if the two match reveal the item and show a congratulatory message. Svelte makes this rather straightforward as it is enough to update `isFound` and `currentMessage`

  2. if the are no more guesses left reveal the item and show an appropriate string

  3. otherwise highlight the distance with a ternary operator, differentiating the item as being one or more patches off

  In all cases switch `isGuessing` to `false` so that the `<form>` element is able to consider further interaction

The description is more convoluted than the implementation.

## Reactivity

Svelte surgical reactivity is highlighted in several places:

- update `currentMessage` and `guessesLeft` to change the text of the corresponding heading elements

- update `isGuessing`, beyond manging interaction, to add a class to the desired element

- update `isFound` to introduce the `<svg>` element describing the item. This is achieved through an `{#if} {/if}` block

- update `guesses` to change the opacity of the svg elements already revealed
