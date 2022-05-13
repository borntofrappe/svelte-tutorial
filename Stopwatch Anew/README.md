# Stopwatch Anew

I previously explored a stopwatch application [in a separate demo](https://svelte.dev/repl/591aff801e1d47498afdc2738fea4485?version=3.48.0).

The goal of this project is to create yet another stopwatch application inspired by a mobile application.

Once the project is concluded it might be interesting to review the differences in terms of implementation.

## res

In the `res` sub-folder you find the icons designed for the project.

## Custom store

In `stores.js` create a custom writable store with three main methods: `start`, `pause` and `stop`. Update the store with the time elapsed between the start date and the current date, retrieving the new value at an interval with a given frequency.

To resume the counter from the previous number of milliseconds — when pausing the stopwatch — keep track of the value in a dedicated variable.

## Timing

In the application the idea is to show the number of minutes followed by the number of seconds and tens of seconds. In the following format: `00:00.00`.

Define three variables to keep track of the number of milliseconds, seconds and minutes. Use a reactive statement to update the variables with the value retrieved from the custom store.

Use a reactive declaration to take each component and compose the desired string.
