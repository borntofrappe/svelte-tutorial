# [Fubuki](https://svelte.dev/repl/817f18a2321241bfbd08d265bc4101fc?version=3.48.0)

In a [Fubuki puzzle](http://www.thepuzzleclub.com/fubuki.php) you are provided with a grid and tasked to fill the columns and rows with unique numbers. Below each column, next to each row you are provided with the sum of the values contained in each section, so that the game is complete when the numbers add up together to the goal value.

The goal of this project is to create such addition tables with keyboard and touch interaction.

## utils

In `utils.js` create a `Puzzle` class with the logic of the addition table.

Based on the input size populate a grid with ascending number, arrange them in random order and compute the sum values.

For a size `3`, for instance, create `grid` with an array of numbers from 1 to 9, arrange them in a 3x3 data structrue and include the totals of each section. This means that ultimately `grid` as one more column and one more row with the final values.

```text
 6   3   1   10
 8   4   5   17
 9   7   2   18
23  14   8
```

To help implementing the game, and from the solution grid, create additional arrays to describe the totals and the numbers.

With `locks` create an array describing the index of the values included by default, as a hint. Include as many "locks" as the specified by the input variable `reveal`.

## Svelte

Once you create a puzzle the task is to populate a grid with the same numbers detailed in the instance of the `Puzzle` class, `nums`.

Svelte's reactive declarations help to compute the desired totals and to determine when the game ends, updating the interface only as needed.

```svelte
$: rows = nums.reduce(...)
$: columns = nums.reduce(...)
$: solved = nums.reduce(...)
```

It is also possible to batch the updates in a single declarative statement which runs whenever `nums` changes.

```svelte
let rows = []
let columns = []
let solved

$: if(nums) {
  rows = nums.reduce(...)
  columns = nums.reduce(...)
  solved = nums.reduce(...)
}
```
