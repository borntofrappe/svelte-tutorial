<script>
	export let title;
	export let description;
	export let id;
</script>

<article>
	<h2>{title}</h2>
	<p>{description}</p>
	<a sveltekit:prefetch href="demos/{id}">Check out more</a>
</article>

<style>
	article {
		padding: 1rem;
	}

	article > * + * {
		margin-top: 0.5rem;
	}

	h2 {
		font-size: 2rem;
	}

	p {
		line-height: 1.5;
	}

	a {
		font-size: 1.2rem;
		display: inline-block;
	}

	a::after {
		content: ' →';
	}
</style>
