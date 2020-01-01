<script>
  import Illustration from "./Illustration.svelte";
  import Form from "./Form.svelte";
  import Card from "./Card.svelte";

	let contact = {
		name: 'George Cartwright',
		title: 'Hen Supervisor',
		phone: '1 (134) 756 4258',
		isValid: true
	}

	let isSubmitted = false;

	function handleUpdate(e) {
		const { name, title, phone, isValid } = e.detail;
		contact = {
			name,
			title,
			phone,
			isValid
		}
	};

</script>

<style>
	div {
		width: 300px;
		perspective: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	div > * + * {
		margin-top: 1.5rem;
	}

	button {
		display: block;
    color: hsl(0, 0%, 100%);
    background: none;
    border: 1px solid currentColor;
    padding: 0.5rem 1rem;
    letter-spacing: 2px;
    font-family: inherit;
    text-transform: uppercase;
  }
</style>

<div>
	{#if isSubmitted}
		<Card {...contact} />
	{:else}
		<Form
			on:update="{handleUpdate}"
			{...contact} />
	{/if}

	<button on:click="{() => isSubmitted = !isSubmitted}">
		{isSubmitted ? 'Edit' : 'Submit'}
	</button>
</div>


