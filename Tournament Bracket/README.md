# [Tournament Bracket](https://svelte.dev/repl/4941cafa6eee409d947716816190222f)

This project is inspired by `<svelte:self>` component, which allows to call a component from the component itself.

## How to Run

```bash
npm install
npm run dev
```

## Notes

The idea is to have a component describe a list of teams and then call itself with a smaller and smaller list of names. When the component receives an array of multiple items, it includes an unordered list. When the component receives an array of length one, it then renders a heading with the eventual winner.

It is worth mentioning that the project also showcases the concept of stores to keep track of the array of names. A custom store is implemented with a subscribe and shuffle function, helpful to update the order of the array directly from the store.
