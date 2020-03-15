# [Icon Maker](https://svelte.dev/repl/44a0394acb4f408cb0115958c0fd76f6)

The goal of this project is rather straightforward, but filled with potential: starting from the SVG syntax behind a vector icon, draw the shape with the Canvas API and [the Path2D interface](https://developer.mozilla.org/en-US/docs/Web/API/Path2D), and allow to download the asset as a `.png` file.

Bonus points: allow to download the icon at any size, and any color.

## Icon

In **icon.svg** you find the syntax that is replicated in the project. It'd be mighty interesting to actually read through the document tree to create the necessary fill and strokes, but as a starting point, the idea is to take this syntax:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100" width="42" height="42">
  <g stroke-width="8" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="currentColor">
    <path d="M 0 -15 c 5 -30 45 -30 45 0 q 0 25 -45 55 q -45 -30 -45 -55 c 0 -30 40 -30 45 0" />
  </g>
</svg>
```

And creating the same shape with the Canvas API.
