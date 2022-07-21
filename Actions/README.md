# Actions

Svelte explains [actions](https://svelte.dev/tutorial/actions) as _element-level lifecycle functions_, and introduces the concept with two demos: a pannable, draggable box and a button reacting to a long press. Here I try to understand the actions with additional projects.

_Please note:_ there's plenty of room for improvement, from the style of the features to how the logic fits with the larger web environment. Consider for instance what happens when JavaScript is not enabled, especially in the demo lazy loading the images, or again how screen readers examine the content hidden from sight, especially in the tooltip demo.

## [Append](https://svelte.dev/repl/a716e80bc6e04442a461aa906a0ccb15?version=3.38.2)

This is a trivial example, but helps to introduce actions and the `:use` directive. The goal is to append a string when the user hovers on a specific HTML element.

```svelte
<h1 use:append={'!!!'}>
	Append
</h1>
```

`append` is defined as a function with two arguments: `node` and `params`. In this instance `node` refers to the `<h1>` element, but more broadly it refers to any element leaning on the `:use` directive; `params` refers instead to the `!!!` string.

```js
export function append(node, params) {}
```

As the cursor enters into the area described by the node, the idea is to append a `<span>` element with the desired string.

```js
function handleMouseEnter() {
  const child = document.createElement('span');
  child.textContent = params;
  node.appendChild(child);
}

node.addEventListenser('mouseenter', handleMouseEnter);
```

The function also sets up a listener for the opposing event.

```js
function handleMouseEnter() {
  node.addEventListener('mouseleave', handleMouseLeave);
}
```

As the mouse leaves the same area, the `<span>` element is finally removed.

```js
function handleMouseLeave() {
  node.removeChild(node.querySelector('span'));
  node.removeEventListener('mouseleave', handleMouseLeave);
}
```

Take note of how event are added and removed as necessary. The function also returns an object with a `destroy` function, which is invoked as the element is destroyed.

```js
return {
  destroy() {
    node.removeEventListener('mouseenter', handleMouseEnter);
  },
};
```

This last instruction is necessary to avoid potential memory leaks.

## [Lazy Load Images](https://svelte.dev/repl/e81a037c763a4556a8b08d4302f84b7c?version=3.38.2)

Following [this insightful article on CSS Tricks](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/), `lazy` and `lazyAll` functions lean on the intersection observer API to target `<img />` elements. When the images are in the viewport, the idea is to use the value stored in the `data-src` attribute for the `src` attribute, which triggers the loading of the visual.

It is possible to consider the `data-src` attribute in at least two ways:

1. with `node.getAttribute()`

   ```js
   node.getAttribute('data-src');
   ```

2. with `node.dataset`

   ```js
   node.dataset.src;
   ```

It is also possible to set the `src` attribute in at least two ways:

1. with `node.setAttribute()`

   ```js
   node.setAttribute('src', dataSrc);
   ```

2. directly with `node.src`

   ```js
   node.src = dataSrc;
   ```

The difference between `lazy` and `lazyAll` is straightforward: the first function assumes the `:use` directive is included on individual images; the second function considers instead a container element, like a `<div>` to target all the nested images.

In both instances `params` is used to customize the intersection observer API.

```js
const observer = new IntersectionObserver(observation, params);
```

Try changing `threshold` or `rootMargin` to confirm how the images are lazily loaded on scroll.

## [Tooltip](https://svelte.dev/repl/a4682e449f0a4478aa4a24a804d9fe7c?version=3.38.2)

Building on the foundations provided by the `Append` example, the `use:tooltip` directive allows to show additional information when hovering or focusing on specific elements. After a few iterations, I've settled on a rather intriguing solution where the action shows the input string above the icon of a magnifying glass. The icon itself is added with a pseudo element at the end of the element designated to have a tooltip.

As mentioned, the demo contemplates both mouse and keyboard input. To consider keyboard navigation, the selected elements are attributed a `tabindex` attribute, which makes them selectable.

```js
node.setAttribute('tabindex', 0);
```

The instruction is included at the very beginning of the tooltip function, and sets up the feature similarly to the `.tooltip` class.

```js
node.classList.add('tooltip');
```

It is through this class that the node sets the `position` to `relative`, to absolute position the information from the node, and then includes the cited icon.

```css
:global(.tooltip) {
  position: relative;
}

:global(.tooltip::after) {
  content: url('data:image/svg+xml,%3Csvg ... %3C/svg%3E');
}
```

## [Selection](https://svelte.dev/repl/cae85a6878114dd1a88d9fabd9f61742?version=3.38.2)

Based on the [selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection), the action allows to select the content of a series of elements to share a particular string of text on Twitter. The API is experimental, so that it is immediately necessary to check if the feature is supported.

```js
export function selection(node, params) {
  if (!getSelection()) return;
}
```

In this instance the function is terminated prematurely and nothing happens. Past this check, the selection is checked following the `mouseup` event, on the node itself, but also the window. The listeners are set following the `mousedown` event, this time solely on the node.

```js
function handleMousedown() {
  node.addEventListener('mouseup', handleMouseup);
  window.addEventListener('mouseup', handleMouseup);
}
```

`handleMouseup` extracts the text from the selected container, and there's a bit of logic to make sure `text` considers the entire string from start to end. This is complicated by the fact that the selection API provides a `startContainer` and `endContainer`.

```js
const { startContainer, endContainer } = getSelection().getRangeAt(0);
```

The containers might not be the same, as the elements benefiting from the action might nest additional HTML elements. This means extracting the text is not as simple as considering `startOffset` and `endOffset`.

```js
const { startOffset, endOffset } = getSelection().getRangeAt(0);
```

When the selection spans over multiple elements `startOffset` describes the beginning of `startContainer`, while `endOffset` the end of `endContainer`. If there are containers in between, it is necessary to consider the entirety of their content.

Once `text` is extracted, and trimmed, it is finally included in the `href` attribute of an anchor link element, which is then appended to the `<body />`.

```js
const child = document.createElement('a');
child.setAttribute('href', `https://twitter.com/intent/tweet?text=${text}`);
```

The element itself is absolute positioned where the `mousedown` was first registered.

```js
let x, y;
function handleMousedown({ pageX, pageY }) {
  x = pageX;
  y = pageY;
}

function handleMouseup() {
  // ...
  child.style.left = `${x}px`;
  child.style.top = `${y}px`;
}
```

This works as a rough estimate, but creates issues when the window is resized. To work around to this complication the anchor link is removed also when the window recorsd the `resize` event.
