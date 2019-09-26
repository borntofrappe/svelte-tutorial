# [Sport Bracket](https://svelte.dev/repl/4941cafa6eee409d947716816190222f)

While going through [Svelte's tutorial](https://svelte.dev/tutorial), I was intrigued by the `<svelte:self>` component, which allows to call a component from the component itself. There is a lot of repetition here, but [the provided example](https://svelte.dev/tutorial/svelte-self) does a mighty good job at describing its use.

I wanted to practice with the concept and thougth that a sport bracket would be a suited use case. The idea is to have a component describe a list of teams and then call itself with a smaller and smaller list of names. Until the component receives an array of multiple items, it describes an unordered list. Upon finding the last item, it then renders a heading with the eventual winner.
