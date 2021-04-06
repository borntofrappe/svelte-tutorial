<script context="module">
	export async function load({ page, fetch }) {
		const { id } = page.params;

		// const res = await fetch(`/demos.json?id=${id}`);
		const res = await fetch(`/demos/${id}.json`);
		if (res.status === 200) {
			const { demo } = await res.json();
			return {
				props: {
					...demo
				}
			};
		} else {
			return {
				status: 404,
				error: new Error('Demo not found')
			};
		}
	}
</script>

<script>
	export let title;
	export let details;
	export let href;
</script>

<div>
	<h1>{title}</h1>
	{@html details}
	<a target="_blank" {href}>Live demo</a>
</div>

<style>
	div > :global(* + *) {
		margin-top: 0.5rem;
	}

	h1 {
		font-size: 2.5rem;
	}

	a {
		display: inline-block;
		font-size: 1.5rem;
	}

	a::after {
		content: ' →';
	}
</style>
