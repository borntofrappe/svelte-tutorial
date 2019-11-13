/* globals Splitting */
// if splitting is available target the heading split the text describing the string
const target = document.querySelector('h2');
if (window.Splitting) {
  // add an aria label on the target corresponding to its text value
  target.setAttribute('aria-label', target.textContent);

  Splitting({ target }).forEach(({ chars }) => {
    // remove the span elements describing the individual characters from assistive technologies
    chars.forEach(char => {
      char.setAttribute('aria-hidden', 'true');

      // as a proof of concept, color the individual characters with a green/red hue
      // ultimately this color is applied following user input
      const isCorrect = Math.random() > 0.5;
      char.style.color = isCorrect ? 'hsl(140, 90%, 40%)' : 'hsl(0, 90%, 45%)';
    });
  });
}

// add a button for each character in the qwerty string describing the keyboard
const keyboard = document.querySelector('.keyboard');
const keys = 'qwertyuiopasdfghjklzxcvbnm';
keyboard.innerHTML = [...keys].map(char => `<button>${char}</button>`).join('');
