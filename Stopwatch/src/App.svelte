<script>
	import StopWatch from './StopWatch.svelte';
	import Laps from './Laps.svelte';
	import Controls from './Controls.svelte';
</script>

<style>
	:global(*) {
			box-sizing: border-box;
			padding: 0;
			margin: 0;
	}
	
	:global(body) {
		 background: hsl(0, 0%, 95%);
    color: hsl(0, 0%, 20%);
    font-family: "Open Sans", sans-serif;
    /* center the .stopwatch container in the viewport */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
	}
	:global(.stopwatch) {
			display: flex;
			flex-direction: column;
	}
	:global(.stopwatch) > * + * {
			margin-top: 0.75rem;
	}
	
		/* for devices supporting css grid */
		@supports (display: grid) {
    /* for larger viewports */
    @media (min-width: 600px) {
        /* display the svg, ul and .controls in a grid

        |   svg  |  ul           |
        |   svg  |   .controls   |
        */
        :global(.stopwatch) {
            display: grid;
            grid-gap: 20px 50px;
            grid-template-columns: 300px 250px;
            grid-template-rows: 225px auto;
            grid-template-areas: "watch list" "watch controls";
            justify-content: space-between;
        }
        :global(.stopwatch) svg {
            grid-area: watch;
            align-self: center;
        }
        :global(.stopwatch) ul {
            grid-area: list;
        }
        :global(.stopwatch) .controls {
            grid-area: controls;
            align-self: center;
        }
        :global(.stopwatch) > * + * {
            margin-top: 0;
        }
    }
	}
</style>

<div class="stopwatch">
	<StopWatch />
	<Laps />
	<Controls />	
</div>
