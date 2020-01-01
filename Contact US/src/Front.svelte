<script>
  // show the illustration above a form describing several fields
  import Illustration from "./Illustration.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name;
  export let title;
  export let phone;

  // as the name, title and phone are updated, dispatch an event to have the values update in the parent element
  $: dispatch("update", {
    name,
    title,
    phone
  });
</script>

<form on:submit|preventDefault>
  <Illustration {phone} />
  <label>
    Name
    <input maxlength="20" type="text" id="name" name="name" bind:value="{name}" />
  </label>
  <label>
    Title
    <input maxlength="20" type="text" id="title" name="title" bind:value="{title}" />
  </label>
  <label>
    US Phone
    <input maxlength="20" type="text" id="phone" name="phone" bind:value="{phone}" />
  </label>
</form>
