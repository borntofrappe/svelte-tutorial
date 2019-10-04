<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	let value;
	let data = [];
	const regexWord = /\w+/g;
	
	function handleSubmit() {
		if(value) {
			data = value
				.match(regexWord)
				.map(word => word.toLowerCase())
				.reduce((acc, curr) => {
					const index = acc.findIndex(({word}) => word === curr);
					if(index === -1) {
						return [...acc, {
							word: curr,
							frequency: 1,
						}];
					}
					acc[index].frequency += 1;
					return acc;
				}, [])
				.sort((a, b) => b.frequency - a.frequency);
			} else {
				data = []
			}
		dispatch('update', data);
	}
				

	
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value />
	<button>
		Count
	</button>
</form>