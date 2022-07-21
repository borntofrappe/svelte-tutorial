# [Roman Clock](https://svelte.dev/repl/ce67640a4c034cfa8585f3555fff3f8d)

## Notes

The project is perhaps heavier on SVG syntax than Svelte's own logic, but it does showcase a few features of the compiler:

- readable store

- reactive variables

- the motion package

With regards to this last dependency, there's currently a bug when the number of minutes, or hours, switches back to 0. In this instance the rotation occurs from `360` degrees, backwards.
