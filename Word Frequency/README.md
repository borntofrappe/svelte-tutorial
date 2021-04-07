# [Word Frequency](https://codepen.io/borntofrappe/full/QWWWqQM)

## How to Run

```bash
npm install
npm run dev
```

## Notes

In the `res` folder you find an markup file and a stylesheet illustrating the UI of the project. Ultimately, I replaced the lollipop chart with a pie chart, but regardless, Svelte uses the design as a starting point to add the functionality associated with the `<textarea>` element.

It is worth mentioning that the project highlights the absolute frequency of the words typed in the `<textarea>` element _or_ included through a call to an external API. At the time of writing, however, the external resource fails to load a sample due to a security restriction. A fallback string with a repetitive syntax is displayed instead. The string is also included if the user clicks the "Count words" button without words to count in the first place.
