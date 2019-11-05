import Tweet from './Tweet.svelte';

// hypothetical values for the tweet
const props = {
  name: 'Pas',
  handle: 'paslepoulet',
  /* specify the date instance with a string of arguments
  up to seven arguments
   year month (0-11) day hours minutes seconds milliseconds
  */
  date: '2019 10 5 18 47 20',
  message: 'Creating a reusable component for hopefully my soon-to-be blog. With a readable store to update the timestamp!',
};


const tweet = new Tweet({
	target: document.body,
	props
});

export default tweet;