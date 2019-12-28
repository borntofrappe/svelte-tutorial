const inputs  = document.querySelectorAll('input[type="range"]');
function handleInput() {
  const {name, value} = this;
  console.dir(this);
  const property = `--${name}`;
  const propertyValue = name === 'rotation' ? `${value}deg` : `${value}%`;
  this.nextElementSibling.textContent = propertyValue;
  document.body.style.setProperty(property, propertyValue)
}
inputs.forEach(input => input.addEventListener('input', handleInput))