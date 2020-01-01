<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name;
  export let title;
  export let phone;

  $: dispatch("phone", phone);

  function handleSubmit() {
    dispatch("submit", {
      name,
      title,
      phone
    });
  }
</script>

<style>
  form {
    position: relative;
  }
  form > * + * {
    margin-top: 1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: hsl(0, 0%, 80%);
    line-height: 2;
  }
  input {
    width: 100%;
    border: none;
    font-family: inherit;
    color: inherit;
    padding: 0.25rem 0.75rem;
    background: hsl(0, 0%, 25%);
    outline: none;
    font-size: 1rem;
  }
  input:focus {
    background: hsl(0, 0%, 15%);
  }
  input::selection {
    background: hsl(0, 0%, 25%);
  }

  button {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 50%);
    color: hsl(0, 0%, 100%);
    background: none;
    border: 1px solid currentColor;
    padding: 0.5rem 1rem;
    letter-spacing: 2px;
    font-family: inherit;
    text-transform: uppercase;
    font-weight: 300;
  }
</style>

<form on:submit|preventDefault="{handleSubmit}">
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

  <button>
    Submit
  </button>
</form>
