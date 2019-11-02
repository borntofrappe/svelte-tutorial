<script>
    import Editor from "./Editor.svelte";
    import Preview from "./Preview.svelte";

    import { markdown } from "./utils.js";

    let value = markdown;

    let showPreview = true;

    function handleEdit() {
		showPreview = false;
    }

	function handlePreview(e) {
		value = e.detail;
		showPreview = true;
	}
</script>

<style>
    /* cap the width of the wrapping container */
    div {
        max-width: 550px;
        width: 90vw;
        line-height: 2;
    }
</style>

<div>
    {#if showPreview}
    <!-- when receiving the edit event update the boolean to show the editor component -->
    <Preview markup={marked(value)} on:edit={handleEdit} }/> {:else}
    <!-- when receiving the preview event update the markdown and the boolean to show the preview component -->
    <Editor markdown={value} on:preview={handlePreview} /> {/if}
</div>
