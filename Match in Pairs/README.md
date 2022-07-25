# Match in Pairs

Match cards in pairs, much similarly to the game proposed by Netlify as you wait for the deploy to finish.

## Flipped

Markup.

```html
<button class="flipped" data-value="🧡">
  <!-- front -->
  🃏
</button>
```

Style.

```css
button.flipped {
  transform: rotateY(180deg);
}

button::before {
  content: attr(data-value);
}
```

Quite interestingly, the button receives click events with the class of `.flipped`, but on Firefox and not on Chrome. Since it would be possible to only flip the card in one sense, and the script should handle a possible flip back, the issue does not create a huge problem.

## Flip

With `flipCard` flip a card, period.

Condition the action to a boolean, `checking`, which is immediately set to true as the flipping transition begins.

Set the boolean to true in `handleFlip`, consider the flipped card(s) and then, only after checking for a match, set the boolean back to its initial value.
