# Slider Quiz

Create a similar interaction to that proposed on [an article on Ouest-France](https://www.ouest-france.fr/meteo/secheresse/secheresse-agriculture-industrie-piscines-lave-vaisselle-qu-est-ce-qui-consomme-de-l-eau-e068f872-171d-11ed-aab2-44eac6f1bc7c).

## Slider

The component tries to replicate the functionality of an input element of type `range`. It is not the ideal solution in terms of accessibility, but essential to the interaction of the entire project, as the visual incorporates custom animations.

`Slider.svelte` shows a `<svg>` element with a circle translated horizontally and following mouse input. The component binds two elements — the parent `<svg>` and the `<g>` element wrapping around the rectangle registering mouse events — to accurately compute the coordinate in the `[0, 1]` range.

Past mouse interaction, the `<g>` element tentatively listen to keyboard input in the form of the `keydown` event. The goal is to have the visitor focus on the group — consider the `tabindex` attribute set to zero, and update the value with the left and right arrow key.

Ultimately the project includes the functionality of the slider in `Quiz.svelte`, but `Slider.svelte` works as a proof of concept. Furthermore, it allows to show how a svelte reactive statement is enough to report the value of the slider up to the parent scope.

```svelte
$: dispatch("change", { value });
```
