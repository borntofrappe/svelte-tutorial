const shuffle = (array) => {
  const a = [...array];
  let counter = a.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = a[counter];

    a[counter] = a[index];
    a[index] = temp;
  }

  return a;
};

export class Puzzle {
  constructor({
    words = ["mazes", "word", "search", "puzzle", "games", "program"],
    range = ["a", "z"],
  } = {}) {
    const pWords = [...words];

    const charCodes = range.map((d) => d.charCodeAt());
    charCodes[2] = charCodes[1] - charCodes[0] + 1;

    const combinations = pWords
      .map(({ length }) => length)
      .reduce((acc, curr) => (acc[curr] ? acc : { ...acc, [curr]: [] }), {});

    const dimensions = Math.max(...Object.keys(combinations)) + 1;

    const positions = Array(dimensions ** 2)
      .fill()
      .map((_, i) => [Math.floor(i / dimensions), i % dimensions]);

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
                return (
                  fr >= 0 && fr <= dimensions && fc >= 0 && fc <= dimensions
                );
              })
              .map((d) => [direction, d]);
          })
          .reduce((acc, curr) => [...acc, ...curr], []);
      });

    const word = pWords.pop();

    const stack = [
      {
        grid: Array(dimensions ** 2),
        word,
        combinations: shuffle(combinations[word.length]),
      },
    ];

    while (true) {
      const current = stack[stack.length - 1];
      if (!current) throw new Error("Configuration not possible");

      const combination = current.combinations.pop();
      if (!combination) {
        pWords.push(current.word);
        stack.pop();
      } else {
        const grid = this.tryWord(
          current.grid,
          current.word,
          dimensions,
          directions,
          combination
        );
        if (grid) {
          const word = pWords.pop();
          if (word) {
            stack.push({
              grid,
              word,
              combinations: shuffle(combinations[word.length]),
            });
          } else {
            this.letters = grid.map(
              (d, i) => d || this.getRandomCharacter(charCodes)
            );
            break;
          }
        }
      }
    }
  }

  getRandomCharacter(charCodes) {
    return String.fromCharCode(
      charCodes[0] + Math.floor(Math.random() * charCodes[2])
    );
  }

  tryWord(grid, word, dimensions, directions, combination) {
    const copy = [...grid];
    const [direction, position] = combination;
    const [r, c] = position;
    const [dr, dc] = directions[direction];

    const letters = word.split("");
    for (let i = 0; i < letters.length; i += 1) {
      const letter = letters[i];
      const index = (r + dr * i) * dimensions + (c + dc * i);
      if (!copy[index] || copy[index] === letter) {
        copy[index] = letter;
      } else {
        return false;
      }
    }
    return copy;
  }
}
