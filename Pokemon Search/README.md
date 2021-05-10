# [Pokemon Search](https://svelte.dev/repl/8593b0e8b60e4a78900ff4ff584a03a2?version=3.38.2)

## Notes

This project begun rather innocently to show how to process the data retrieved from an external API, and specifically the [PokeAPI](https://pokeapi.co). While it later evolved to consider a functional, if simplistic, search application, I want to focus here on the fetch request. Similarly to the `Await` demo, the information is included in an `await` block. It is however not possible to include the data directly in the DOM, as the information is retrieved in JSON format.

```svelte
<script>
  const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
</script>

<!-- would NOT work -->
{#await promise then value} {/await}
```

To fix this, the promise refers to an async function which processes the data before returning the necessary JavaScript object.

```js
async function fetchData(n = 1) {
  try {
  } catch (error) {}
}
const promise = fetchData();
```

In the `try` block the information received through the API is processed through the `.json` function and returned.

```js
const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
const data = await res.json();
return data;
```

In the `catch` block the script throws an error.

```js
throw new Error(error);
```

The error can be later picked up in the `await` block provided by Svelte.

```svelte
{#await promise then value}

{:catch error}

{/await}
```
