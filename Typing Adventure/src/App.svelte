<script>
    import HomeScreen from './HomeScreen.svelte';
    import PlayScreen from './PlayScreen.svelte';

    let isPlaying = false;

</script>


{#if isPlaying}
    <PlayScreen />
{:else}
    <HomeScreen on:play={() => {isPlaying = true}} />
{/if}