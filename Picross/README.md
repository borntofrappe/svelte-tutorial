# [Picross](https://codepen.io/borntofrappe/full/yLLPBMr)

## How to Run

```bash
npm install
npm run dev
```

## Notes

This project is based on a previous experiment with the table element, in which I used JavaScript to plot a series of levels through columns, rows and cells of SVG elements. You can find the experiment [live here on codepen](https://codepen.io/borntofrappe/full/MWgEbPz).

### res

In the `res` folder you find the building blocks behind the application:

- in the `UI` folders you find the markup and stylesheet developed for the three stages of the application.

- in the `Table Data` folder you find the JavaScript code which builds a table from a starting level, using array methods like `map` and `reduce`.

- in the `SVG` folder you find the vector graphics used throughout the project.

## Levels

To comply with the logic described in the `Table Data` folder, each level is described through a string. Each character describes a cell in a 5x5 grid.

```js
const levels = [
  {
    name: 'Star',
    level: 'ooxooooxooxxxxxoxxxooxoxo',
  },
  {
    name: 'Mobile phone',
    level: 'xxxoxxoooxxoxoxxoooxxooox',
  },
  {
    name: 'Heart',
    level: 'ooxooooooooooooxoooxxxoxx',
  },
  {
    name: 'Musical note',
    level: 'xxoooxxoxoxxoxooooxxoooxx',
  },
  {
    name: 'Moon',
    level: 'xxooxxxxoooxxoooooooxooox',
  },
];
```
