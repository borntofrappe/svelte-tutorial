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
  constructor({ size = 3, reveal = 0 }) {
    this.size = size;

    const grid = shuffle(
      Array(size ** 2)
        .fill()
        .map((_, i) => i + 1)
    ).reduce((acc, curr, i) => {
      if (i % size === 0) acc.push([]);

      acc[acc.length - 1].push(curr);

      if (acc[acc.length - 1].length % size === 0) {
        acc[acc.length - 1].push(
          acc[acc.length - 1].reduce((a, c) => a + c, 0)
        );
        if (acc.length === size) {
          acc.push(
            Array(size)
              .fill()
              .map((_, j) => {
                return Array(size)
                  .fill()
                  .map((_, z) => acc[z][j])
                  .reduce((a, c) => a + c, 0);
              })
          );
        }
      }

      return acc;
    }, []);

    this.grid = grid;

    const nums = grid.slice(0, size).map((d) => d.slice(0, size));
    const columns = [...grid[size]];
    const rows = grid.reduce(
      (acc, curr) =>
        curr.length === size + 1 ? [...acc, curr[curr.length - 1]] : [...acc],
      []
    );

    this.nums = nums;
    this.columns = columns;
    this.rows = rows;

    this.locks =
      reveal > 0
        ? shuffle(
            Array(size ** 2)
              .fill()
              .map((_, i) => i)
          ).slice(0, reveal)
        : [];
  }
}
