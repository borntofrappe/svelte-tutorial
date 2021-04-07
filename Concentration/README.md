# [Concentration](https://codepen.io/borntofrappe/full/yLLVNME)

## How to Run

```bash
npm install
npm run dev
```

## Notes

In the `res` folder you find the design for the individual card. I though it best to separate this design since it gave me a chance to experiment with 3D transform properties, not to mention the SVG background used for the back of the card.

It is important to note that I used the `perspective` value in the `transform` property and not the `perspective` property, to have the rotation occur with relation to the individual card. In other words, and for the individual card, the following property-value pairs are visually equivalent.

```css
.deck {
  perspective: 500px;
}

.card {
  transform-style: preserve-3d;
  transform: rotateY(50deg);
}
```

```css
.card {
  transform-style: preserve-3d;
  transform: perspective(500px) rotateY(50deg);
}
```

When more card are added however, the second option allows to have the perspective relative to each separate card. The first option would provide a perspective point for the wrapping container, and every card would be rotated relative to it. For more information check out [this introduction to 3D transform properties](https://3dtransforms.desandro.com).

Another important note is relative to the **markup** for the individual card:

```html
<article class="card">
  <div class="face front">
    <h1>5<span style="color: red;">♦</span></h1>
  </div>
  <div class="face back"></div>
  <button aria-label="Flip card"></button>
</article>
```

Each face is wrapped in a `div` container, but is also accompanied by a `button` element. The idea is to use the button to react to click and key press events. Listening for a click on the article without a button would be a very inaccessible solution.

[This REPL](https://svelte.dev/repl/303d234a3467456bafad81e5d72c6f5b) shows the concept without the matching functionality.
