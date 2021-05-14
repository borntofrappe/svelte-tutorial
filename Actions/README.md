# Actions

Svelte explains [actions](https://svelte.dev/tutorial/actions) as _element-level lifecycle functions_, and introduces the concept with two demos: a pannable, draggable box and a button reacting to a long press. Here I try to understand the actions with additional projects.

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
