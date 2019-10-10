# [Wind Chill Index](https://svelte.dev/repl/4f87e0117de9489d8f76977549e62573)

## Goal

Compute the wind chill index on the basis of the input temperature and speed. Differentiate the result according to the chosen unit of measure.

## Notes

The project begun with the repl before moving locally to work with rollup and in vscode. [Here](https://svelte.dev/repl/4d60816973b04ca5aaf6e35088a1c951) you find a first version using reactive declarations to continuously compute the index on the values included in the input elements. In the end I chose to rewrite the project to include a submit event and compute the value only as the form is submitted.
