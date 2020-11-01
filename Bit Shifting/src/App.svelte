<script>
	import Digit from './Digit.svelte';
	import Number from './Number.svelte';
	import Button from './Button.svelte';

	const digits = Array(8).fill().map((d, i, {length}) => length - (i + 1));

	$: number = 0;
	$: disabled = true;
</script>

<form on:submit|preventDefault on:input={(e) => console.log(e)}>
	{#each digits as digit}
		<Digit {digit} />
	{/each}
</form>

<Number>{number}</Number>
<Button {disabled} />

<style>
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	:global(body > * + *) {
		margin-top: 1.25rem;
	}
	form {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>