/* globals Splitting */
// if splitting is available target the section and split the text within the heading and the button
if (window.Splitting) {
  const target = document.querySelector('section');
  // add an aria label to each direct child element
  const { children } = target;
  [...children].forEach(child =>
    child.setAttribute('aria-label', child.textContent)
  );
  Splitting({ target }).forEach(({ words, chars }) => {
    // remove the span elements describing the words from assistive technologies
    words.forEach(word => {
      word.setAttribute('aria-hidden', 'true');
    });
    // to each character add a data-key attribute describing the keycode connected to the actual letter
    // this value is picked up by the pseudo element for the button (it is currently unnecessary for the heading)
    chars.forEach(char => {
      char.setAttribute(
        'data-key',
        char.getAttribute('data-char').charCodeAt(0)
      );
    });
  });
}
