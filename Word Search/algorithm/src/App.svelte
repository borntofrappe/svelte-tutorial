<script>
  import { shuffle } from "./utils.js";

  let puzzle;

  const letters = ["a", "z"];
  const charCodes = letters.map((d) => d.charCodeAt());
  charCodes[2] = charCodes[1] - charCodes[0] + 1;

  const getRandomLetter = () =>
    String.fromCharCode(
      charCodes[0] + Math.floor(Math.random() * charCodes[2])
    );

  const words = ["mazes", "word", "search", "puzzle", "games", "program"];

  const combinations = words
    .map(({ length }) => length)
    .reduce((acc, curr) => (acc[curr] ? acc : { ...acc, [curr]: [] }), {});

  const size = Math.max(...Object.keys(combinations)) + 1;

  const positions = Array(size ** 2)
    .fill()
    .map((d, i) => [Math.floor(i / size), i % size]);

  const directions = {
    up: [-1, 0],
    right: [0, 1],
    down: [1, 0],
    left: [0, -1],
    upright: [-1, 1],
    downright: [1, 1],
    downleft: [1, -1],
    upleft: [-1, -1],
  };

  Object.keys(combinations)
    .map((d) => parseInt(d, 10))
    .forEach((length) => {
      combinations[length] = Object.entries(directions)
        .map(([direction, offsets]) => {
          const [dr, dc] = offsets;
          return positions
            .filter(([r, c]) => {
              const fr = r + dr * length;
              const fc = c + dc * length;
              return fr >= 0 && fr <= size && fc >= 0 && fc <= size;
            })
            .map((d) => [direction, d]);
        })
        .reduce((acc, curr) => [...acc, ...curr], []);
    });

  const word = words.pop();

  const stack = [
    {
      grid: Array(size ** 2),
      word,
      combinations: shuffle(combinations[word.length]),
    },
  ];

  const tryWord = (grid, word, combination) => {
    const copy = [...grid];
    const [direction, position] = combination;
    const [r, c] = position;
    const [dr, dc] = directions[direction];

    const letters = word.split("");
    for (let i = 0; i < letters.length; i += 1) {
      const letter = letters[i];
      const index = (r + dr * i) * size + (c + dc * i);
      if (!copy[index] || copy[index] === letter) {
        copy[index] = letter;
      } else {
        return false;
      }
    }

    return copy;
  };

  while (true) {
    const current = stack[stack.length - 1];
    if (!current) throw new Error("Configuration not possible");

    const combination = current.combinations.pop();
    if (!combination) {
      words.push(current.word);
      stack.pop();
    } else {
      const grid = tryWord(current.grid, current.word, combination);
      if (grid) {
        const word = words.pop();
        if (word) {
          stack.push({
            grid,
            word,
            combinations: shuffle(combinations[word.length]),
          });
        } else {
          puzzle = grid.map((d, i) => {
            const letter = d || getRandomLetter();

            return {
              letter: letter.toUpperCase(),
              c: i % size,
              r: Math.floor(i / size),
            };
          });
          break;
        }
      }
    }
  }
</script>

<svg viewBox="-0.5 -0.5 {size} {size}">
  <g text-anchor="middle" dominant-baseline="middle" font-size="0.5">
    {#each puzzle as { letter, c, r }}
      <g transform="translate({c} {r})">
        <text>{letter}</text>
      </g>
    {/each}
  </g>
</svg>

<style>
  svg {
    outline: 1px solid;
  }
</style>
