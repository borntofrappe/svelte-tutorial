# Typing Adventure UI

A few notes on the design behind the two screen developed for the final application.

## Home Screen

The page describing the home screen should introduce the application and most importantly feature a button leading to the actual application, where the visitor can type a string of characters to match against a given input. I decided to use [Splitting.js](https://splitting.js.org/) to enhance the page, by animating both the title and the button, but before describing the animation, I took the time and develop the layout sans JavaScript. Sans Splitting.js would be more accurate, as the application ultimately relies on JavaScript to function.

### Markup

A section describing a heading and a button. Almost trivial.

```html
<section>
  <h1>Typing<br />Adventure</h1>
  <button>Play</button>
</section>
```

Instead of adding a `data-splitting` attribute on the section, as detailed in the [basic usage section](https://splitting.js.org/guide.html), I decided to delegate the splitting to the script. More on this later.

### Stylesheet

By default, the idea is to style the button akin to the space bar in a keyboard.

```js
section button {
    font-family: inherit;
    background: hsl(0, 0%, 100%);
    border: 2px solid hsl(0, 0%, 90%);
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
    color: hsl(0, 0%, 20%);
    box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
}
```

As the text is split however, and possibly, the property value pairs are moved to the nested span elements describing four different keys in the actual letters.

```css
section.splitting button {
  background: none;
  border: none;
  padding: initial;
  box-shadow: initial;
}
section.splitting button .char {
  background: hsl(0, 0%, 100%);
  border: 2px solid hsl(0, 0%, 90%);
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  color: hsl(0, 0%, 20%);
  box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
}
```

There's a bit more code to style the span elements, and ultimately animate every character of the section element, but the idea is to always specify these values, which rely on the text being split, in the selector detailing the `.splitting` class.

### Script

It is finally here that the styles specified for the container with a class of `.splitting` are introduced, assuming the library Splitting.js is available on the `window` object.

```js
if (window.Splitting) {
  const target = document.querySelector('section');
  Splitting({ target });
}
```

This allows to already split the text described both in the heading and the button element. A few more lines of code are however included to add a `data-key` attribute to each span element created by the library. This is what is ultimately picked up by the pseudo selector of the characters in the buttons. Just an added bonus.

```js
  Splitting({ target }).forEach(({ chars }) => {
    chars.forEach(char => {
      char.setAttribute(
        'data-key',
        char.getAttribute('data-char').charCodeAt(0)
      );
    });
  });
}
```

```css
section.splitting button .char:after {
  content: attr(data-key);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.75rem;
  margin: 0.1rem;
}
```

### Accessibility

Inspired by [this post](https://css-irl.info/how-to-accessibly-split-text/) I included an attribute of `data-label` on the heading and button, and I specified an `aria-hidden` attribute on each span element describing the individual words to hide them from assistive technologies.

## Play Screen

From the home screen, the play screen takes stock of the properties describing the layout and the style of the individual buttons. The idea is to here show the input string, provided here in the form of a hard-coded `<h2>` element, atop a container describing a keyboard. The goal of the application was to initially register input in the form of key events only, but I believe the addition of a keyboard for touch interfaces allows to create a more well-rounded interface.

In the stylesheet, the CSS animation is retained for the heading, while the style described for the individual `<span>` elements reverts back to the `<button>` elements, now included in the `.keyboard` container.

The script is thusly updated to focus the use of Splitting JS on the heading only, while a couple more lines of JavaScript are specified to include the visual detailing the actual keyboard.

```js
// add a button for each character in the qwerty string describing the keyboard
const keyboard = document.querySelector('.keyboard');
const keys = 'qwertyuiopasdfghjklzxcvbnm';
keyboard.innerHTML = [...keys]
  .map((char) => `<button>${char}</button>`)
  .join('');
```

Ultimately, it is necessary to consider a `click` event, but since the project is mostly devoted to the appearance of the play screen, these three lines suffice to detail the keyboard.
