# [Repeating Color Scheme](https://svelte.dev/repl/86b5830e793c482fa1ad074cbb281202?version=3.38.2)

## Notes

This project is inspired by a particular section of [github codespaces](https://github.com/features/codespaces) where a neat graphic illustrates the passage of time by moving between a light and dark color scheme. The visual is repeated with SVG syntax, and Svelte manages the transition by setting up an interval.

The demo includes one of the [special elements](https://svelte.dev/tutorial/svelte-head) to change the color of the entire page.

```svelte
<svelte:head>
  {#if isDark}
    <style>
      body {
        color: hsl(0, 0%, 20%);
        background: hsl(0, 0%, 10%);
      }
    </style>
  {/if}
</svelte:head>
```

Note that the `if` block needs to be nested in `svelte:head`. It's not possible to include the element conditionally.

```svelte
{#if isDark}
    <svelte:head/>
{/if}
<!--
<svelte:head> tags cannot be inside elements or blocks (81:0)
-->
```
