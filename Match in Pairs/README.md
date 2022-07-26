# [Match in Pairs](https://svelte.dev/repl/dd0fee137f1643d6b685c1aa57c28468?version=3.49.0)

Netlify offers a small game of [concentration](<https://en.wikipedia.org/wiki/Concentration_(card_game)>) while you wait for the build of your project to finish. The goal of this project is to recreate the basic experience.

> I am aware this repository houses a similar project, see 'Concentration', but I wanted to tackle the game with a different perspective and overall structure.

## Card flip

Far from being the only, or even most appropriate, solution, I managed to implement the card flip with a single `button` element.

Use a default emoji for the front face. Pass the value for the card in a `data-value` attribute.

```html
<button class="flipped" data-value="🧡">
  <!-- front -->
  🃏
</button>
```

Use the `::before` pseudo element to include the card value for the back of the face.

```css
button.flipped {
  transform: rotateY(180deg);
}

button::before {
  content: attr(data-value);
  transform: rotateY(180deg);
}
```

Repeating the approach illustrated in the [Intro to CSS transform](https://3dtransforms.desandro.com/card-flip), but with the pseudo element, use the `transform-style` and `backface-visibility` properties to emulate the card flip.

Quite interestingly, the button receives click events with the class of `.flipped`, but on Firefox and not on Chrome. Since in the game it should be possible to only flip the card in one sense, and the script should handle a possible flip back, the issue does not create a huge problem.

## Flip flipped

With `flipCard` flip a card, period.

With `handleFlip` set a boolean, controlling, variable to `true`. Use this boolean to prevent additional card flips.

With `handleFlipped` consider the flipped cards and then, only after checking for a match, set the boolean back to its initial value.

Since the card flip depends on a transition it is possible to associate the `handle*` functions to the `transitionstart` and `transitionend` events.
