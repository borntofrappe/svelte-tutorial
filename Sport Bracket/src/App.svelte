<script>
	// components behind the application
	import Header from './Header.svelte';

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
</style>

<Header title="Who's going to win?"/>

