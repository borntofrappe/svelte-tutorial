<script>
    import { createEventDispatcher } from 'svelte';
    import Arrow from './Arrow.svelte';
    const dispatch = createEventDispatcher();

    function handleDispatch(control) {
        dispatch('control', control);
    }

    export let isPlaying;
</script>

<style>
    button {
        width: 4rem;
        height: 4rem;
        border: none;
        background: none;
        position: absolute;
        color: inherit;
        z-index: 5;
    }
    #play {
        width: 5.5rem;
        height: 5.5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: hsl(0, 0%, 100%);
    }
    #up {
        top: 0%;
        left: 50%;
        transform: translate(-50%, -100%);
    }
    #down {
        bottom: 0%;
        left: 50%;
        transform: translate(-50%, 100%);
    }
    #right {
        top: 50%;
        right: 0%;
        transform: translate(100%, -50%);
    }
    #left {
        top: 50%;
        left: 0%;
        transform: translate(-100%, -50%);
    }

    @media (max-width: 600px) {
        button {
            width: 2.5rem;
            height: 2.5rem;
        }
        #play {
            width: 3rem;
            height: 3rem;
        }
    }
</style>

{#if !isPlaying}
    <button id="play" on:click="{() => handleDispatch('play')}" aria-label="Play the infinite maze">
        <Arrow rotation={90} />
    </button>
{:else}
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
