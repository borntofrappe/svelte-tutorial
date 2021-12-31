# [Guess When](https://svelte.dev/repl/a972aa8a38494ac093c835586aa6e867?version=3.44.3)

## Preface

The concept is inspired by a recent article on [lemondefr](https://www.lemonde.fr/les-decodeurs/article/2021/12/29/covid-19-confinements-et-perception-du-temps-saurez-vous-dater-ces-evenements-qui-ont-marque-nos-vies-depuis-2020_6107625_4355770.html) asking readers to guess when several events took place. Instead of events I chose to focus on video games published by Nintendo in the calendar year of 2021.

The games were selected from a list of highlights [on the Nintendo website](https://www.nintendo.com/games/2021-game-highlights/).

In `App.svelte` the idea is to create an array of unique indexes and set up multiple components describing the associated games.

In `GameReveal.svelte` the idea is to rely on D3 to create the interactive visualization. In terms of SVG syntax the visualization is quite simple, with rectangle, path and text elements. The complexity comes from mouse, or rather pointer, interaction, but Svelte allows to implement the desired logic quite succinctly. `date` and `selectedDate` are enough to show a date on hover and then highlight the chosen timestamp alongside the correct value.

_Please note:_ the demo focuses on the visualization and interaction more than the overall style.

_Please note:_ a more refined project could sum up the gaps for each individual game and provide feedback as every guess is collected.
