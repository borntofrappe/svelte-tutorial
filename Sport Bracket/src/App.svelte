<script>
	// components behind the application
	import Header from './Header.svelte';
	import Bracket from './Bracket.svelte';

	// store describing the teams
	import { names } from './stores.js';

	// based on the array of names, create an array of objects for the bracket
	// this to provide an identifier as to distinguish the elements in the {#each} block
	$: bracket = $names.map(name => ({
		name,
		id: Math.random()
	}));
</script>

<style>
	:global(*) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	:global(body) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	:global(body > * + *) {
		margin-top: 1rem;
	}

	.bracket {
		max-width: 1000px;
		width: 100%;
		display: flex;
	}
</style>

<Header title="Who's going to win?"/>

<!-- to display the names side by side, wrap the bracket component in a container styled as a flex row -->
<main class="bracket">
	<Bracket {bracket} />
</main>

