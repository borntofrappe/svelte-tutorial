<script>
    import Controls from './Controls.svelte';
    let isPlaying = false;


    // size of the cell, horizontal and vertical
	const h = 100;
	const v = 100;

	// size of the stroke
	const stroke = 10;
    const columns = 5;
    const rows = 5;

    // include an svg element with one group for each cell
	// in this group include one <use> element per gate, identifying the border
	// ! the viewBox is incremented by the stroke to avoid cropping (this is paired with the translation of the first group element)
	const width = columns * h;
	const height = rows * v;

    let x = 0;
    let y = 0;

    function moveSquare(direction) {

    }

    function handleControl(e) {
        const control = e.detail;
        switch(control) {
            case 'play':
                isPlaying = true;
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
        background: hsl(0, 0%, 100%);
        position: relative;
    }
    svg {
        display: block;
        width: 100%;
        height: auto;
    }
</style>



<div class="game">
    <Controls {isPlaying} on:control={handleControl}/>
    <svg
        viewBox="0 0 {width} {height}"
        {width}
        {height}>

    </svg>
    <!-- <Maze /> -->
</div>
