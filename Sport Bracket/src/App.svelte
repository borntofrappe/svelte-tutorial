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


<Header title="Who's going to win?"/>
<Bracket {teams} />