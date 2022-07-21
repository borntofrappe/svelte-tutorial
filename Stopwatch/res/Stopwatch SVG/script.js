// ! this is purely to show how the dial would look with actual text, and could certainly be improved
// the time should also dictate the rotation of the dials

// select the text element and update its value with the current number of minutes:seconds:tens of seconds
const text = document.querySelector('text');
const beginning = new Date();

setInterval(() => {
  const now = new Date();
  const lapse = new Date(now.getTime() - beginning.getTime());

  const milliseconds = lapse.getMilliseconds();
  const tens = Math.floor(milliseconds / 100);
  const seconds = lapse.getSeconds();
  const minutes = lapse.getMinutes();

  text.innerHTML = `${zeroPadded(minutes)}:${zeroPadded(seconds)}.${tens}`;
}, 10);

const zeroPadded = time => (parseInt(time, 10) >= 10 ? time : `0${time}`);
