<script>
  import Editor from './Editor.svelte';
  import Preview from './Preview.svelte';
  import { getInitialValue } from './utils.js';

  // initialize a variable through the value obtained from local storage or from the fallback string
  let markdown = getInitialValue();

  // boolean toggling between the two components
  let showPreview = false;

  // when receiving the edit event update the boolean to show the editor component
  function handleEdit() {
    showPreview = false;
  }
  // when receiving the preview event update the markdown and the boolean to show the preview component
  function handlePreview(e) {
    // sanitize the string with DOMpurify
    markdown = DOMPurify.sanitize(e.detail);
    showPreview = true;
  }
</script>

<div class="markdown-editor">
  {#if showPreview}
    <Preview markup={marked(markdown)} on:edit={handleEdit} />
  {:else}
    <Editor {markdown} on:preview={handlePreview} />
  {/if}
</div>
