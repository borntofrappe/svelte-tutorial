<script>
	export let card;
	let ref;
	function flip() {
		ref.classList.toggle('flip');
	}
</script>

<style>
	button {
		padding: 2rem;
		border: none;
		margin: 0;
		box-shadow: 0 1px 5px -2px hsla(0, 0%, 0%, 0.5);
		background: none;
		border-radius: 10px;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.75s ease-out;

	}
	.flip {
		transform: perspective(500px) rotateY(-180deg);
	}
	div {
		border-radius: inherit;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		backface-visibility: hidden;
		background: white;
	}
	.front {
		transform: rotateY(180deg);
	}
	.back {
		transform: rotateY(0deg);
	}
</style>

<button bind:this={ref} class="flip" on:click={flip}>
	<div class="front">
		
	</div>
	<div class="back">
		<h1 style="color: {(card.includes('e') || card.includes('f')) ? 'hsl(0, 70%, 50%)' : 'hsl(0, 50%, 5%)'}">
			{card}
		</h1>
	</div>
	
</button>