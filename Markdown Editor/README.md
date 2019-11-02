# Markdown Editor

## [Live Demo](https://codepen.io/borntofrappe/full/VwwyGzR)

## Goal

Create an online editor which allows to compose and preview markdown syntax.

## Notes

This project is meant to be something I might actually end up using to write notes and most prominently `README.md` files. I will try to use `marked.js` for the conversion between markdown and markup. In a future version I might remove the dependency and try to develop the features I need most on my own though.

## Assets

In the **res** folder you find the vector graphics developed for the projects. I tried to contain each graphic in a viewBox of `100` by `100`, and to use `currentColor` instead of hard coded values. This allows to change the color of the element, or the parent node, and have the stroke or fill adjust accordingly. There are two color values in `preview.svg`, but these are included to describe the area hidden by the mask; they do not affect the actual color of the icon.

## UI

Beside the SVG assets, which are now stored in a fittingly named **SVG Icons** folder, **res** describes also the markup and stylesheet files for the hypothetical document. I developed a hard-coded version of a `README.md` through markdown and markup, and was able to incorporate [prism.js](https://prismjs.com) to enable syntax highlighting (whether the library will be included in the final project or not is up to debate).

## Script

Currently, the application takes care of the parsing between markup and markdown, as well as a first attempt at sanitizing user input between components. For this last functionality, the project incorporates `DOMPurify.js`.

On top of these core features, a couple of buttons allow to append a value, a block of code or the syntax of a link.
