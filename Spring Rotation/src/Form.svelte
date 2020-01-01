<script>
  import Illustration from "./Illustration.svelte";
  import { createEventDispatcher } from "svelte";
  import { telephoneCheck } from "./utils.js";

  const dispatch = createEventDispatcher();

  export let name;
  export let title;
  export let phone;
  export let isValid;

  $: isValid = telephoneCheck(phone);
  $: dispatch("update", {
    name,
    title,
    phone,
    isValid,
  });
</script>

<style>
  form {
    background: hsl(220, 2%, 10%);
		color: hsl(30, 85%, 90%);
    padding: 1.5rem 2rem;
  }
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
	<Illustration {isValid} />

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
