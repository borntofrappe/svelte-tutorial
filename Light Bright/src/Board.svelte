<script>
	import Controls from './Controls.svelte';
	import { randomColor } from './utils.js';

	let board = Array(100).fill();
	let history = [];
	let color = randomColor();


	let isMouseDown = false;
	function colorTile(index) {
		board[index] = color;

		if(history.includes(index)) {
			const historyIndex = history.findIndex(i => i === index);
			history = [index, ...history.slice(0, historyIndex), ...history.slice(historyIndex + 1)];
		} else {
			history = [index, ...history];
		}
	}

	function removeTile(index) {
		board[index] = null;
		history = history.slice(1);
	}



	function removePrevious() {
		const previous = history[0];
		if(previous !== null) {
			board[previous] = null;
			history = history.slice(1);
		}
	}

	function clearBoard() {
		board = board.map((tile) => tile ? null : tile);
		history = [];
	}
</script>

<style>
	.board {
		margin-top: 0.75rem;
		display: grid;
		grid-template-columns: repeat(10, 50px);
		grid-auto-rows: 50px;
		grid-gap: 0.5rem;
	}
	.tile {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 50%;
		border: none;
	}
</style>

<svelte:body on:mouseleave={() => isMouseDown = false} />

<Controls disabled={history.length === 0} on:remove={removePrevious} on:clear={clearBoard}/>
<div
	class="board"
	on:mouseup={() => {
		color = randomColor();
		isMouseDown = false;
	}}>
	{#each board as tile, i}
		<button
						class="tile"
						on:mousedown|preventDefault={() => {
							colorTile(i);
							isMouseDown = true;
						}}
						on:dblclick={() => removeTile(i)}
						on:mouseenter={() => {
						if(isMouseDown)
							colorTile(i);
						}}
						style="background: {tile ? tile : 'hsl(0, 0%, 30%)'}">
		</button>
	{/each}
</div>