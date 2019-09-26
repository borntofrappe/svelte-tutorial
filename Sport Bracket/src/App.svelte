<script>
	// components behind the application
	import Header from './Header.svelte';
	import Bracket from './Bracket.svelte';

	// starting from a hard-coded array of names
	const teams = [
		'Turtles',
		'Hummingbirds',
		'Dolphins',
		'Lambs',
		'Lions',
		'Giraffes',
		'Wolves',
		'Pellicans'
	];

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

<main class="bracket">
	<Bracket {teams} />
</main>