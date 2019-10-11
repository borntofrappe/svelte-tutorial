# [Wind Chill Index](https://codepen.io/borntofrappe/full/WNNrrJg)

## Goal

Compute the wind chill index on the basis of the input temperature and speed. Differentiate the result according to the chosen unit of measure.

## Notes

### Functionality

The project begun with the repl before moving locally to work with rollup and in vscode. At first I developed the application to leverage a _reactive declaration_, and have the index continuously updated as the value for the input elements are updated. You can find this first version [in this repl](https://svelte.dev/repl/4d60816973b04ca5aaf6e35088a1c951). In the end I chose to rewrite the project to include a submit event and compute the value only as the form is submitted. You can find this fundamentally different approach [in this repl](https://svelte.dev/repl/4f87e0117de9489d8f76977549e62573)

### Design

In the **res** folder you find the icons drawn for the input elements of type number. They are meant to be transitioned as the respective elements are focused on. You also find the markup and stylesheet describing the UI for the application.
