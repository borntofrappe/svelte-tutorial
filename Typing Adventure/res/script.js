// array of possible values
const values = ['Apple', 'Orange', 'Grape', 'Peach', 'Banana', 'Cherry', 'Kiwi', 'Apricot', 'Guava', 'Jujube', 'Lemon', 'Kumquat', 'Mango', 'Melon', 'Codepen'];
// utility function returning a random value from an input array
const randomValue = arr => arr[Math.floor(Math.random() * arr.length)];

// select a random value from the array
// ! let as it is later changed to play a new round
let value = randomValue(values);

// app container
const app = document.querySelector('.app');

// alphabet array
// create an array containing all the letters from capital A to capital Z
// in a rather convoluted way, include all ASCI codes between the two specified values
const indexA = 'A'.charCodeAt(0);
const indexZ = 'Z'.charCodeAt(0);

const alphabet = [];
for (let i = indexA; i <= indexZ; i += 1) {
  alphabet.push(String.fromCharCode(i));
}

/* make use of a counter variable to keep track of the correct letter being typed
the idea is to highlight one letter at a time, one span at a time, through said counter
and have it revert back to 0 when a letter is typed incorrectly or the round is over
*/
let counter = 0;


// function highlighting the button (as a result to a key event in the keyboard, to replicate the animation of the :active pseudo selector)
// receiving as input the specified button and applying a class which triggers the animation
function highlightButton(button) {
  button.classList.add('active');

  // as the animation comes to a close remove the class and the event listener on the selected button
  button.addEventListener('animationend', () => {
    button.classList.remove('active');
    button.removeEventListener('animationend', highlightButton);
  });
}


/* function called in response to the onclick event on one of the buttons
   function called also following a key press

  receiving as input the letter being clicked through the buttons /typed through the keyboard
*/
function handleLetter(letter) {
  // find all span elements in the heading
  const spans = document.querySelectorAll('.app__heading span');
  // if the letter matches the letter at the specified index
  // animate the span to show the correct typing an increment the counter variable
  // ! always uppercase
  // ! starting at 0
  if (letter === value[counter].toUpperCase()) {
    spans[counter].style.animation = 'showRight 0.3s ease-out forwards';
    counter += 1;
  } else {
    // else animate all span elements to show the incorrect typing and have the counter revert back to 0
    spans.forEach((span) => {
      span.style.animation = `showWrong 0.5s ${Math.random() / 50}s ease-out`;
    });
    counter = 0;
    // add a heading detailing the occurrence in the selected container
    document.querySelector('div.app__result').innerHTML = `
        <h2 class="app__result">Try again 🤞</h2>
    `;
  }
  // if counter matches the length of the string value, then the game is won
  if (counter === value.length) {
    document.querySelector('div.app__result').innerHTML = `
        <h2 class="app__result">🎉Congrats🎉</h2>
    `;

    // after notifying the user set value to refer to a new random value and call the function to play a new round
    const timeoutID = setTimeout(() => {
      value = randomValue(values);
      startTyping(value);
      // revert counter back to 0
      counter = 0;
      clearTimeout(timeoutID);
    }, 1500);
  }
}

/* function called in response to the keypress event on the window
retrieve the letter, match it against one of the existing buttons
if any, highlight said button and pass the letter to the evaluating function
*/
function handleKeypress(e) {
  const { key } = e;
  const letter = key.toUpperCase();

  const button = document.querySelector(`button[data-letter='${letter}']`);
  if (button) {
    highlightButton(button);
    handleLetter(letter);
  }
}
// listen for a keypress event on the window, at which point call the respective function
window.addEventListener('keypress', handleKeypress);


// function allowing to start a typing round
// immediately called with a random value and later called again as a value is correctly typed
// receiving as input the string to be typed
function startTyping(string) {
  // create an array of uppercase characters out of the string
  const arr = string.toUpperCase().split('');

  /* populate the HTML of the application with the selected structure
  - a heading in which to highlight each letter within a span
  - a container nesting one button for each letter of the alphabet
  - a container in which to show the result

  ! each button makes use of a function which allows to consider the respective letter
  */
  app.innerHTML = `
  <h1 class="app__heading">${arr.map(item => `<span>${item}</span>`).join('')}</h1>
  <div class="app__keyboard">
    ${alphabet.map(letter => `<button onclick="handleLetter('${letter}')" data-letter=${letter}>${letter}</button>`).join('')}
  </div>
  <div class="app__result"></div>
  `;
}

// immediately call the function for  a random string string
startTyping(value);
