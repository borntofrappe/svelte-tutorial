<script>
	import { createEventDispatcher, } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { sineInOut as easing } from 'svelte/easing';
	
	const dispatch = createEventDispatcher();
	export let isFavorite;
	
	const scale = tweened(isFavorite ? 1 : 0, { duration: 400, easing });
	
	function handleInput(e) {
		isFavorite = !isFavorite;
		scale.set(isFavorite ? 1 : 0);
		dispatch('favorite', isFavorite);
	}
</script>

<style>
	label {
		position: relative;
	}
	
	label svg {
		width: 1.75rem;
		height: auto;
		display: block;
	}
	
	label input {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>

<label>
	<span class="visually-hidden">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
	<input type="checkbox" checked={isFavorite} on:input={handleInput} />
	<svg viewBox="-50 -50 100 100" width="1em" height="1em">
		<defs>
			<path id="heart" d="M 0 -10 a 20 20 0 0 1 40 0 q 0 25 -40 45 -40 -20 -40 -45 a 20 20 0 0 1 40 0" />
			<clipPath id="clip-heart">
				<use href="#heart"/>
			</clipPath>
		</defs>
		<g clip-path="url(#clip-heart)">
			<circle fill="currentColor" transform="scale({$scale})" r="50" />
		</g>
		<g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
			<use href="#heart"/>
		</g>
	</svg>
</label>