<script>
    import Bicycle from './Bicycle.svelte'
</script>
<style>
    header {
        line-height: 1.25;
        padding: 0.5rem 0;
        border-bottom: 1px solid hsl(0, 0%, 80%);
    }
    header > * + * {
        margin-top: 0.5rem;
    }
    h1 {
        font-size: 2.25rem;
    }
    h2 {
        font-weight: 400;
        font-size: 1rem;
    }
</style>
<header>
    <h1><Bicycle /> Tour de France <Bicycle /></h1>
    <h2>Highlighting relative searches for the cycling competition</h2>
</header>
