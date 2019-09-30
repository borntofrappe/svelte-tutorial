<script>
    import SVG from './SVG.svelte';
    import Form from './Form.svelte';
    import List from './List.svelte';
</script>

<style>
    .app {
        max-width: 900px;
        width: 80vw;
        margin: 2rem auto;
    }
</style>

<div class="app">
    <SVG />
    <Form />
    <List />
</div>