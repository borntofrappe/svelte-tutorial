<script>
	import Editor from './Editor.svelte';
	import { markdown } from './utils.js';
	import Preview from './Preview.svelte';
	import { markup } from './utils.js';

	let showPreview = true;
</script>

<style>
	div {
		max-width: 550px;
		width: 90vw;
		line-height: 2;
	}
	/* display the controls in a row, pushing the label describing the checkbox to the very right end */
	nav {
		display: flex;
		align-items: center;
	}
	nav label {
		margin-left: auto;
	}
	nav button {
		width: 45px;
		height: 45px;
		padding: 12px;
		background: none;
		color: inherit;
		border: none;
	}
	nav label {
		position: relative;
		width: 45px;
		height: 45px;
		padding: 12px;
	}
	nav label input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	nav button svg,
	nav label svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	nav button:hover {
		color: hsl(100, 90%, 30%);
	}
	nav button:focus {
		outline-color: hsl(100, 90%, 30%);
	}
</style>

<div>
	<nav>
		{#if !showPreview}
			<button title="Add code block" aria-label="Add code block">
				<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
					<g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
						<path id="bracket--left" d="M 30 18 l -30 27 30 27" />
						<use href="#bracket--left" transform="translate(90 0) scale(-1 1)" />
					</g>
				</svg>
			</button>
			<button title="Add link" aria-label="Add link">
				<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
					<g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
						<path id="curve--left" d="M 35 25 h -10 a 20 20 0 0 0 0 40 h 10" />
						<use href="#curve--left" transform="translate(90 0) scale(-1 1)"/>
						<path d="M 30 45 h 30" />
					</g>
				</svg>
			</button>
			<button title="Download markdown" aria-label="Download markdown">
				<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
					<g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
						<path d="M 45 0 v 60 l -22 -22 m 22 22 l 22 -22" />
						<path d="M 0 60 v 20 a 10 10 0 0 0 10 10 h 70 a 10 10 0 0 0 10 -10 v -20" />
					</g>
				</svg>
			</button>
		{/if}
		<label>
			<input title="Edit markdown" aria-label="Edit markdown" type="checkbox" bind:checked={showPreview}>
			{#if showPreview}
			<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
				<g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="none">
					<path d="M 73 0 l 17 17 -45 45 -17 0 0 -17 45 -45" />
					<path d="M 35 10 h -25 a 10 10 0 0 0 -10 10 v 60 a 10 10 0 0 0 10 10 h 60 a 10 10 0 0 0 10 -10 v -25" />

				</g>
			</svg>
			{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
				<defs>
					<mask id="mask--circle" maskUnits="userSpaceOnUse">
						<rect x="0" y="0" width="100" height="100" fill="white"/>
						<circle cx="50" cy="50" r="24" fill="black"/>
					</mask>
				</defs>
				<g mask="url(#mask--circle)">
					<g transform="translate(5 5)" stroke-width="10" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" fill="currentColor">
						<path d="M 0 45 c 25 -40 65 -40 90 0 -25 40 -65 40 -90 0" />
					</g>
				</g>
				<g transform="translate(50 50)">
					<circle cx="0" cy="0" r="14" fill="currentColor" />
				</g>
			</svg>
			{/if}
		</label>
	</nav>
	{#if showPreview}
		<Preview {markup} />
	{:else}
		<Editor value={markdown} />
	{/if}
</div>
