# [Word Frequency](https://svelte.dev/repl/d047e6a494bc402a8897a25ae6c16725)

## DevNotes

-   the project was inspired by [this repo](https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Word-Frequency-App.md)

-   I first developed a rough version through the online repl. You can find it [here](https://svelte.dev/repl/d047e6a494bc402a8897a25ae6c16725)

-   this project promises to be a great way to introduce essential concepts behind the framework, or compiler, that is svelte. Consider making a screencast developing the application one step at a time.

## Steps

1. skeleton in App.svelte

    in here the application is developed with a basic form and a table in which the words are eventually displayed

1. components

    here the application is broken down in components. The form is given a dispatch method to have the data traverse back to the parent component. The data is then passed down to the table component

1. transition and animation

    here the list of items is animated not only with in and out transition, but with the animation directive

1. d3

    here the d3 library is incorporated to present a new component highlighting the most frequent words through visuals (bar plot, pie chart).
