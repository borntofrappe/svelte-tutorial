// toggle the class of .flip on the article element when the nested button is pressed
const button = document.querySelector('button');
function handleClick() {
  button.parentNode.classList.toggle('flip');
}

button.addEventListener('click', handleClick);
