import Tweet from './Tweet.svelte';

// hypothetical values for the tweet
const props = {
  name: 'Pas',
  handle: 'paslepoulet',
  /* specify the date instance with a string of arguments
  up to seven arguments
   year month (0-11) day hours minutes seconds milliseconds
  */
  date: '2021 3 8 10 17 52',
  message: 'Creating a reusable component for a hypothetical blog. With a readable store to update the timestamp!',
};


const tweet = new Tweet({
	target: document.body,
	props
});

export default tweet;