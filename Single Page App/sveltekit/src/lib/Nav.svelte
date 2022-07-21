<script>
	import { page } from '$app/stores';
</script>

<nav>
	<a aria-current={$page.path === '/' ? 'page' : undefined} href="/">home</a>
	<a aria-current={$page.path === '/demos' ? 'page' : undefined} sveltekit:prefetch href="/demos"
		>demos</a
	>
	<a aria-current={$page.path === '/about' ? 'page' : undefined} href="/about">about</a>
</nav>

<style>
	nav {
		box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.1);
		font-weight: 300;
		padding: 0 1em;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	a {
		border-bottom: none;
		text-transform: capitalize;
		padding: 1em 0.5em;
		transition: color 0.2s ease-out;
	}

	a:hover {
		color: hsl(204, 100%, 63%);
	}

	[aria-current] {
		color: hsl(15, 100%, 50%);
	}
</style>
