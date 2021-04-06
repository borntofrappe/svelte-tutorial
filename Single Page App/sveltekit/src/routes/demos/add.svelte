<script>
	import { goto } from '$app/navigation';

	let title;
	let description;
	let details;
	let href;

	async function handleSubmit() {
		if (title && description && details && href) {
			fetch('/demos.json', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, description, details, href })
			});

			const res = await fetch('/demos.json');
			const { demos } = await res.json();
			const { id } = demos[demos.length - 1];
			goto(`/demos/${id}`);
		}
	}
</script>

<svelte:head>
	<title>Add demo</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
	<h2>New demo</h2>
	<label>
		<span>Title</span>
		<input type="text" bind:value={title} required />
	</label>

	<label>
		<span>Description</span>

		<textarea bind:value={description} required />
	</label>

	<label>
		<span>Link</span>
		<input type="text" bind:value={href} required />
	</label>

	<label>
		<span>Details</span>
		<textarea bind:value={details} required />
	</label>

	<button>Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 90vw;
		max-width: 50em;
		margin: 0 auto;
	}

	form > * + * {
		margin-top: 2.5rem;
	}

	label {
		position: relative;
	}

	label span {
		position: absolute;
		font-weight: 300;
		bottom: 100%;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem 0.75rem;
		font-family: inherit;
		font-size: 1rem;
		color: inherit;
		border: none;
		background: hsl(0, 0%, 94%);
	}

	textarea {
		resize: none;
		min-height: 50px;
	}

	button {
		align-self: center;
		font-family: inherit;
		font-size: 1rem;
		color: hsl(0, 0%, 97%);
		background: hsl(0, 0%, 12%);
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
	}
</style>
