<script>
	import HomeScreen from './HomeScreen.svelte';
	import PlayScreen from './PlayScreen.svelte';

	// use a boolean to move from the home screen to the play screen
	let isPlaying = false;
</script>


{#if !isPlaying}
	<HomeScreen on:play={() => {isPlaying = true}} />
{:else}
	<PlayScreen />
{/if}