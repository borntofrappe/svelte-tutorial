# [Slider Quiz](https://svelte.dev/repl/0551729fa2584f1d8be155261ffb1743?version=3.49.0)

[An article on Ouest-France](https://www.ouest-france.fr/meteo/secheresse/secheresse-agriculture-industrie-piscines-lave-vaisselle-qu-est-ce-qui-consomme-de-l-eau-e068f872-171d-11ed-aab2-44eac6f1bc7c) proposes a quiz where you are asked to estimate a number and then reveal the answer with the press of a button. The goal of the project is to replicate the intriguing interaction with Svelte and SVG syntax — SVG for the custom slider.

## Slider

The component tries to replicate the functionality of an input element of type `range`. It is not the ideal solution in terms of accessibility, but essential to the interaction of the entire project, as the `<svg>` will eventually transition from the slider to highlight the answer of the quiz.

`Slider.svelte` translates a `<circle />` element horizontally listening to mouse events. The component binds two elements — the parent `<svg>` and the `<g>` element wrapping around the rectangle registering mouse events — to accurately compute the coordinate in the `[0, 1]` range.

Past the mouse interaction, the `<g>` element tentatively listens to keyboard input in the form of the `keydown` event. The goal is to have the user focus on the group — see the `tabindex` attribute set to zero — and update the value with the left and right arrow key.

Ultimately the project includes the functionality of the slider in `Quiz.svelte`, but `Slider.svelte` works as a proof of concept. Furthermore, it allows to show how a svelte reactive statement is enough to report the value of the slider up to the parent scope.

```svelte
$: dispatch("change", { value });
```

## Transitions

The `<svg>` incorporates two visuals, one for the interactive slider and one comparing the value of the slider against the answer of the quiz. To transition between the two the component includes Svelte's own `scale` and `fade` transitions, staggering the elements as follows:

- scaler the circle making up the interaction of the slider

- scale the circle describing the user's guess, the value of the slider

- fade the text accompanying the value, with the value prefaced by a fitting label

- scale the circle describing the quiz's answer

- fade the text accompanying the answer

The markup is modified to separate the elements which scale from those which fade.

Following this chain the component also fades the paragraph element which follows the `<svg>`.

In the script I set up two objects to try and organize the transitions' durations and delays, but the solution is far from ideal.

## Quiz

`Slider.svelte` is satisfied with a value in the `[0, 1]` range, and maps the number to the position of the circle considering the width chosen for the interaction — 200.

In `Quiz.svelte`, however, the component receives a value in a custom range — refer to `min`, `max` and `value`. In light of this you need to immediately map the values to obtain the horizontal coordinates. For the answer and for the initial value.

After the initial mapping:

- following mouse interaction map the number in the `[0, 1]` range to update the value _and_ the coordinate

- following keyboard interaction update the value and _then_, on the basis of the new value, update the coordinate
