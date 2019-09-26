<script>
	// components behind the application
	import Header from './Header.svelte';
	import Controls from './Controls.svelte';
	import Bracket from './Bracket.svelte';

	// store describing the teams and the shuffle function
	import { names } from './stores.js';
	// following the shuffle event shuffle the teams with the function provided on the store
	function handleShuffle() {
		names.shuffle();
	}

	// based on the array of names, create an array of objects for the bracket
	// this to provide an identifier as to distinguish the elements in the {#each} block
	$: bracket = $names.map(name => ({
		name,
		id: Math.random()
	}));
</script>

<style>
	.bracket {
		max-width: 800px;
		width: 100%;
		display: flex;
		background: #fff;
		padding: 0.75rem;
		border-radius: 5px;
		box-shadow: 0 5px 16px -5px hsla(0, 0%, 0%, 0.1);
	}
</style>

<Header title="Who's going to win?"/>

<Controls on:shuffle={handleShuffle}/>

<!-- to display the names side by side, wrap the bracket component in a container styled as a flex row -->
<main class="bracket">
	<Bracket {bracket} />
</main>

