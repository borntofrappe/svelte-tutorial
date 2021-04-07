<script>
  import Arrow from './Arrow.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { fly } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';

  function scaleDown(node, { duration = 250 }) {
    return {
      duration,
      css: (t) => {
        const eased = sineInOut(t);
        return `transform: scale(${eased});`;
      },
    };
  }

  function handleDispatch(control) {
    dispatch('control', control);
  }

  export let isPlaying;
  export let isReady;
  export let gates = {
    north: false,
    east: false,
    south: false,
    west: false,
  };
</script>

{#if !isPlaying}
  <button
    out:scaleDown
    id="play"
    on:click={() => handleDispatch('play')}
    aria-label="Play the infinite maze"
  >
    <Arrow rotation={90} />
  </button>
{:else if isReady}
  <button
    disabled={gates.north}
    in:fly={{ delay: 150 }}
    out:fly={{ duration: 200 }}
    id="north"
    on:click={() => handleDispatch('north')}
    aria-label="Move the square up"
  >
    <Arrow />
  </button>
  <button
    disabled={gates.west}
    in:fly={{ delay: 150 }}
    out:fly={{ duration: 200 }}
    id="west"
    on:click={() => handleDispatch('west')}
    aria-label="Move the square left"
  >
    <Arrow rotation={270} />
  </button>
  <button
    disabled={gates.east}
    in:fly={{ delay: 150 }}
    out:fly={{ duration: 200 }}
    id="east"
    on:click={() => handleDispatch('east')}
    aria-label="Move the square right"
  >
    <Arrow rotation={90} />
  </button>
  <button
    disabled={gates.south}
    in:fly={{ delay: 150 }}
    out:fly={{ duration: 200 }}
    id="south"
    on:click={() => handleDispatch('south')}
    aria-label="Move the square down"
  >
    <Arrow rotation={180} />
  </button>
{/if}
