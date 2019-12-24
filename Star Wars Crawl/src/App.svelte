<script>
	import Toggle from './Toggle.svelte';
	import Crawls from './Crawls.svelte';
	
	let showCrawls = false;
	let title = 'The Phantom Menace';
	let text = 'Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....';
</script>

<style>
	:global(body) {
		background: hsl(0, 0%, 0%);
	}
	div {
		display: flex;
		flex-direction: column;
		max-width: 400px;
		margin: 1rem auto;
		align-items: center;
	}
	div > * + * {
		margin-top: 1rem;
	}
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

<div>
	<Toggle on:toggle={(e) => showCrawls = e.detail} />
	{#if showCrawls}
	<Crawls {title} {text} />	
	{:else}
	<form on:submit|preventDefault>
		<input type="text" bind:value={title} />
		<textarea bind:value={text}></textarea>
	</form>	
	{/if}
	
</div>
