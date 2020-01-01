<script>
  import Illustration from "./Illustration.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name;
  export let title;
  export let phone;

  $: dispatch("update", {
    name,
    title,
    phone
  });
</script>

<style>
  form > * + * {
    margin-top: 1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.85rem;
    letter-spacing: 1px;
    color: hsl(0, 0%, 80%);
    line-height: 2;
  }
  input {
    width: 100%;
    border: none;
    font-family: inherit;
    color: inherit;
    padding: 0.5rem 0.75rem;
    background: hsl(0, 0%, 20%);
    outline: none;
    font-size: 1rem;
  }
  input:focus {
    background: hsl(0, 0%, 15%);
  }
  input::selection {
    background: hsl(0, 0%, 25%);
  }
</style>

<form on:submit|preventDefault>
  <label>
    Name
    <input type="text" id="name" name="name" bind:value="{name}" />
  </label>
  <label>
    Title
    <input type="text" id="title" name="title" bind:value="{title}" />
  </label>
  <label>
    US Phone
    <input type="text" id="phone" name="phone" bind:value="{phone}" />
  </label>
</form>
