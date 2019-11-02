<script>
    import Editor from "./Editor.svelte";
    import Preview from "./Preview.svelte";
    import { getInitialValue } from "./utils.js";

    let markdown = getInitialValue();
    let showPreview = true;

    function handleEdit() {
		showPreview = false;
    }

	function handlePreview(e) {
		markdown = e.detail;
        showPreview = true;
    }

</script>

<div class="markdown-editor">
    {#if showPreview}
    <!-- when receiving the edit event update the boolean to show the editor component -->
    <Preview markup={marked(markdown)} on:edit={handleEdit}/> {:else}
    <!-- when receiving the preview event update the markdown and the boolean to show the preview component -->
    <Editor {markdown} on:preview={handlePreview} /> {/if}
</div>
