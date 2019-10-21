<script>
    import Controls from './Controls.svelte';
    import { createMaze } from './utils.js';
    import { tweened } from 'svelte/motion';
    import { sineInOut } from 'svelte/easing';

    let isPlaying = false;
    let isReady = false;

    // size of the cell, horizontal and vertical
	const h = 100;
	const v = 100;

	// size of the stroke
	const stroke = 10;
    const columns = 5;
    const rows = 5;
    const maze = createMaze(columns, rows);
    console.log(maze)

    // include an svg element with one group for each cell
	// in this group include one <use> element per gate, identifying the border
	// ! the viewBox is incremented by the stroke to avoid cropping (this is paired with the translation of the first group element)
	const width = columns * h;
	const height = rows * v;

    let x = tweened(columns / 2 - 0.5);
    let y = tweened(rows / 2 - 0.5);
    let vX = tweened(0);
    let vY = tweened(0);
    let vWidth = tweened(width + stroke);
    let vHeight = tweened(height + stroke);

    function go() {
        isReady = true;
        vX.set(0);
        vY.set(0);
        vWidth.set(width + stroke);
        vHeight.set(height + stroke);
    }
    function getReady() {
        const rX = Math.floor(Math.random() * columns);
        const rY = Math.floor(Math.random() * rows);
        x.set(rX, {
            duration: 0,
        });
        y.set(rY, {
            duration: 0,
        });
        vX.set((rX * h) + stroke, {
            duration: 0,
        });
        vY.set((rY * v) + stroke, {
            duration: 0,
        });
        setTimeout(() => {
            go();
        }, 1000);
    }

    function play() {
        isPlaying = true;
        vX.set(($x * h) + stroke);
        vY.set(($y * v) + stroke);
        vWidth.set(h - stroke);
        vHeight.set(v - stroke);

        setTimeout(() => {
            getReady();
        }, 1000);
    }

    function moveSquare(direction) {
        x.set($x + 1);

    }

    function handleControl(e) {
        const control = e.detail;
        switch(control) {
            case 'play':
                play();
                break;
            case 'up':
            case 'left':
            case 'right':
            case 'down':
                moveSquare(control);
                break;
        }
    }
</script>

<style>
    .game {
        width: 75vw;
        max-width: 500px;
        color: hsl(0, 0%, 0%);
        position: relative;
    }
    svg {
        display: block;
        width: 100%;
        height: auto;
    }
</style>



<div class="game">
    <svg
        viewBox="{$vX} {$vY} {$vWidth} {$vHeight}"
        {width}
        {height}>
        <defs>
            <path id="north" d="M 0 0 h {h}"></path>
            <path id="east" d="M {h} 0 v {v}"></path>
            <path id="south" d="M 0 {v} h {h}"></path>
            <path id="west" d="M 0 0 v {v}"></path>
            <rect id="square" x="0" y="0" width="{h - stroke}" height="{v -
    stroke}"></rect>
        </defs>
        <g
            stroke="currentColor"
            stroke-width={stroke}
            stroke-linejoin="square"
            stroke-linecap="square"
            fill="none">
            <g transform="translate({stroke / 2} {stroke / 2})">
                {#if isReady}
                    <rect x="0" y="0" {width} {height} fill="hsl(0, 0%, 100%)"></rect>
                    {#each maze as { column, row, gates }}
                        <g transform="translate({column * h} {row * v})">
                            {#each Object.entries(gates) as [href, isGated]}
                            {#if isGated}
                            <use href="#{href}"></use>
                            {/if}
                            {/each}
                        </g>
                    {/each}
                {/if}
            </g>
        </g>

        <g stroke="none" fill="currentColor">
            <g transform="translate({stroke} {stroke})">
                <g transform="translate({$x * h} {$y * v})">
                    <use href="#square"></use>
                </g>
            </g>
        </g>
    </svg>
    <Controls {isPlaying} {isReady} on:control={handleControl}/>
</div>
