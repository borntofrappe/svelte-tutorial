<script>
    import { createEventDispatcher } from 'svelte';
    import Arrow from './Arrow.svelte';
    const dispatch = createEventDispatcher();

    function handleDispatch(control) {
        dispatch('control', control);
    }

    export let isPlaying;
    export let isReady;
</script>

{#if !isPlaying}
    <button id="play" on:click="{() => handleDispatch('play')}" aria-label="Play the infinite maze">
        <Arrow rotation={90} />
    </button>
{:else if isReady}
    <button id="up" on:click="{() => handleDispatch('up')}" aria-label="Move the square up">
        <Arrow />
    </button>
    <button id="left" on:click="{() => handleDispatch('left')}" aria-label="Move the square left">
        <Arrow rotation={270}/>
    </button>
    <button id="right" on:click="{() => handleDispatch('right')}" aria-label="Move the square right">
        <Arrow rotation={90}/>
    </button>
    <button id="down" on:click="{() => handleDispatch('down')}" aria-label="Move the square down">
        <Arrow rotation={180}/>
    </button>
{/if}
