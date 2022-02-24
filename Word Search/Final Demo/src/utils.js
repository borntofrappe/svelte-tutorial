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

const getRandomLetter = (a = "a", z = "z") => {
  const start = a.charCodeAt();
  const end = z.charCodeAt() + 1;

  return String.fromCharCode(Math.floor(Math.random() * (end - start)) + start);
};

export class Grid {
  constructor({ rows = 7, columns = 7 } = {}) {
    this.rows = rows;
    this.columns = columns;

    this.directions = Object.values({
      up: [-1, 0],
      right: [0, 1],
      down: [1, 0],
      left: [0, -1],
      upright: [-1, 1],
      downright: [1, 1],
      downleft: [1, -1],
      upleft: [-1, -1],
    });

    this.positions = Array(rows * columns)
      .fill()
      .map((_, i) => i);

    this.grid = Array(rows * columns).fill();
  }

  get array() {
    const { columns } = this;
    return this.grid.reduce((acc, curr, i) => {
      if (i % columns === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(curr);
      return acc;
    }, []);
  }

  get string() {
    const { columns } = this;
    return this.grid.reduce(
      (acc, curr, i) => `${acc}${curr}${(i + 1) % columns === 0 ? "\n" : ""}`,
      ""
    );
  }

  tryWord(grid, word, position, direction) {
    const { rows, columns } = this;

    const row = Math.floor(position / columns);
    const column = position % columns;

    const [rd, cd] = direction;

    const re = row + rd * (word.length - 1);
    const ce = column + cd * (word.length - 1);

    if (re < 0 || re >= rows || ce < 0 || ce >= columns) {
      return false;
    }

    const copy = [...grid];

    for (let i = 0; i < word.length; i += 1) {
      const letter = word[i];
      const rc = row + rd * i;
      const cc = column + cd * i;

      const index = rc * columns + cc;

      if (copy[index] !== undefined && copy[index] !== letter) {
        return false;
      }

      copy[index] = letter;
    }

    return copy;
  }

  fill({ words = ["word", "search"], range = ["a", "z"] } = {}) {
    const { rows, columns, directions, positions } = this;

    const stack = [
      {
        grid: Array(rows * columns).fill(),
        word: words.pop(),
        directions: shuffle(directions),
        positions: shuffle(positions),
      },
    ];

    while (true) {
      const current = stack[stack.length - 1];
      if (!current) {
        throw new Error(
          `Cannot place the words ${words
            .map((word) => `'${word}'`)
            .join(", ")} in a grid of ${rows} rows and ${columns} columns.`
        );
      }

      let direction = current.directions.pop();

      if (!direction) {
        current.positions.pop();
        current.directions = shuffle(directions);
        direction = current.directions.pop();
      }

      const position = current.positions[current.positions.length - 1];

      if (!position) {
        words.unshift(current.word);
        stack.pop();
      } else {
        const grid = this.tryWord(
          current.grid,
          current.word,
          position,
          direction
        );
        if (grid) {
          if (words.length > 0) {
            stack.push({
              grid,
              word: words.pop(),
              directions: shuffle(directions),
              positions: shuffle(positions),
            });
          } else {
            return (this.grid = grid.map(
              (letter) => letter || getRandomLetter(...range)
            ));
          }
        }
      }
    }
  }
}