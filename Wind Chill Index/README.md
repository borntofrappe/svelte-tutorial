# [Wind Chill Index](https://codepen.io/borntofrappe/full/WNNrrJg)

## How to Run

```bash
npm install
npm run dev
```

## Notes

### Functionality

The project begun with the repl before moving locally to work with rollup and in vscode. At first I developed the application to leverage a _reactive declaration_, and have the index continuously updated as the value for the input elements are updated. You can find this first version [in this repl](https://svelte.dev/repl/4d60816973b04ca5aaf6e35088a1c951). In the end I chose to rewrite the project to include a submit event and compute the value only as the form is submitted. You can find this fundamentally different approach [in this repl](https://svelte.dev/repl/4f87e0117de9489d8f76977549e62573)

### Design

In the `res` I developed the UI of the application in two stints:

- `First UI` describes a basic layout with HTML elements

- `Final UI` incorporates the Zdog library to create a pseudo-3d graphic

The `.svg` icons are actually created for the first UI, with the idea of updating their appearance as the `<input>` elements of type `number` receive focus. That being said, the syntax for `anemometer.svg` is repurposed in the Zdog graphic. The graphic has been developed developed [in this project](https://github.com/borntofrappe/Front-End-Practice/tree/master/Zdog%20Chicken), and is highlighted [in this pen](https://codepen.io/borntofrappe/details/Baajmzy) for good measure.
