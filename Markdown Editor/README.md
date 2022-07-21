# [Markdown Editor](https://codepen.io/borntofrappe/full/VwwyGzR)

## How to Run

```bash
npm install
npm run dev
```

## Notes

### res

In the `res` folder you find the vector graphics developed for the projects. I tried to contain each graphic in a viewBox of `100` by `100`, and to use `currentColor` instead of hard coded values. This allows to change the color of the element, or the parent node, and have the stroke or fill adjust accordingly. There are two color values in `preview.svg`, but these are included to describe the area hidden by the mask; they do not affect the actual color of the icon.

### UI

Beside the SVG assets, the `res` folder houses the markup and stylesheet files for the hypothetical document.

### Script

Currently, the application takes care of the parsing between markup and markdown, as well as a first attempt at sanitizing user input between components. For this last functionality, the project incorporates `DOMPurify.js`.

On top of these core features, a couple of buttons allow to append a value, a block of code or the syntax of a link.
