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
  form {
    color: hsl(30, 85%, 90%);
    background: hsl(220, 2%, 10%);
    padding: 1.5rem 2rem;
		backface-visibility: hidden;
  }
  form > * + * {
    margin-top: 1rem;
  }
  label {
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    letter-spacing: 1px;
    color: hsl(0, 0%, 100%);
    line-height: 2;
    font-weight: 300;
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
