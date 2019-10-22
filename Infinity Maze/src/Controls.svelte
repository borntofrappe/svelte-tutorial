<script>
    import Arrow from './Arrow.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';

    function scaleDown(node, { duration = 250}) {
        return {
            duration,
            css: t => {
                const eased = sineInOut(t);
                return `transform: scale(${eased});`;
            }
        };
    }


    function handleDispatch(control) {
        dispatch('control', control);
    }

    export let isPlaying;
    export let isReady;
</script>

{#if !isPlaying}
    <button out:scaleDown id="play" on:click="{() => handleDispatch('play')}" aria-label="Play the infinite maze">
        <Arrow rotation={90} />
    </button>
{:else if isReady}
    <button transition:fly="{{ delay: 150 }}" id="up" on:click="{() => handleDispatch('up')}" aria-label="Move the square up">
        <Arrow />
    </button>
    <button transition:fly="{{ delay: 150 }}" id="left" on:click="{() => handleDispatch('left')}" aria-label="Move the square left">
        <Arrow rotation={270}/>
    </button>
    <button transition:fly="{{ delay: 150 }}" id="right" on:click="{() => handleDispatch('right')}" aria-label="Move the square right">
        <Arrow rotation={90}/>
    </button>
    <button transition:fly="{{ delay: 150 }}" id="down" on:click="{() => handleDispatch('down')}" aria-label="Move the square down">
        <Arrow rotation={180}/>
    </button>
{/if}
