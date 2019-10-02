# [Stopwatch](https://svelte.dev/repl/591aff801e1d47498afdc2738fea4485)

## Goal

Create an application allowing to track the passing of time and the lapse between laps.

## Notes

-   this project doesn't use degit, but relies instead on the folder provided by the [online REPL](https://svelte.dev/repl/)

-   the design is inspired by the stopwatch application pre-installed on my mobile;

-   the goal is to create a pull request to a popular repository, showcasing a functioning stopwatch app.

-   in the **res** folder you find the design of the application, broken up in two smaller projects. **Stopwatch SVG** describes the SVG and its eventual animation, while **Stopwatch UI** describes the layout and styles for the overall application.

-   at the [following url](https://svelte.dev/repl/4e47e8ba30a8499faaaef85c452804a1) you find a basic idea as to how the passing of time is retrieved from a readable store. Given the intricacies behind the readable function, and the fact that the project needs to track / stop tracking the value of the store more than once, I decided to devote an entire project to the start/pause/stop feature. I included the main files `App.svelte` and `stores.js` in the **res** folder as well, to provide a local frame of reference.
