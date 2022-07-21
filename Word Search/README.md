# Word Search

[Word search](https://en.wikipedia.org/wiki/Word_search) relates to a puzzle game where a words are hidden in a two-dimensional grid. The player is tasked to find the letters included in all possible directions.

The project is built in increments and dedicated subfolders:

- [display](https://svelte.dev/repl/47f98762434441d3b594acc0d074ca64?version=3.48.0) considers how to display letters in a `<canvas>` or `<svg>` element

- [pins](https://svelte.dev/repl/2799fa8eb4eb408c98d36625ac29802d?version=3.48.0) describes how to receive user input, again with both elements

- [algorithm](https://svelte.dev/repl/f80fc1193bc04f6f88aeb95ddb292963?version=3.48.0) introduces the algorithm

Using the demos as a stepping stone the final demo incorporates the algorithm in a `WordSearch` component and a `Puzzle` class. The goal is to ultimately initialize a working puzzle with the Svelte component.

```svelte
<WordSearch />
```

With dedicated props it is possible to customize the puzzle in the words included in the game, as well as the range of the characters included at random.

```svelte
<WordSearch
  words="{["apple", "orange", "lemon"]}"
  range="{["a", "r"]}"
 />
```

Based on the properties the component creates an instance of the `Puzzle` class.

```js
const puzzle = new Puzzle({ words, range });
```

In the constructor function the class implements the algorithm to ultimately set a `letters` property, describing the array of letters in which the words are interspersed.

```js
const puzzle = new Puzzle({ words, range });
console.log(puzzle.letters);
```

Based on the array the component then elaborates the logic connected to the interaction.
