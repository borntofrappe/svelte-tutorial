<script>
	import Toggle from './Toggle.svelte';
	import Crawls from './Crawls.svelte';

	let checked = false;
	let title = 'The Phantom Menace';
	let text = 'Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....';
</script>

<style>
	:global(body) {
		background: url("data:image/svg+xml,%3Csvg opacity='0.2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3Ccircle id='circle' r='1' fill='hsl(0, 0%25, 100%25)' /%3E%3C/defs%3E%3Cuse href='%23circle' x='50' y='50' /%3E%3Cuse href='%23circle' x='150' y='50' /%3E%3Cuse href='%23circle' x='50' y='150' /%3E%3Cuse href='%23circle' x='150' y='150' /%3E%3Cuse href='%23circle' transform='translate(100 100) scale(2.5)' /%3E%3C/svg%3E"),
    hsl(0, 0%, 0%);
  background-size: 50px, 100%;
	}
	/* display the form + crawls in a horizontally centered column */
	div {
		display: flex;
		flex-direction: column;
		max-width: 420px;
		margin: 1rem auto;
		align-items: center;
	}
	div > * + * {
		margin-top: 1rem;
	}
	/* display the contents of the form in a column */
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	textarea {
		min-height: 300px;
		resize: none;
	}
</style>

<!-- display the toggle, and depending on its state show the animated crawls or the form allowing to change the input values -->
<div>
	<Toggle {checked} on:toggle={(e) => checked = e.detail} />
	{#if checked}
	<Crawls {title} {text} />
	{:else}
	<form on:submit|preventDefault>
		<input type="text" bind:value={title} />
		<textarea bind:value={text}></textarea>
	</form>
	{/if}
</div>
