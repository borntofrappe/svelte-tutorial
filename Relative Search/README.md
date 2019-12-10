# Relative Search

## Goal

Highlight the search results for the Tour de France through two simple, yet effective visualizations.

## Notes

In the **res** folder you find:

-   `bicycle.svg`, an SVG icon I created for the project.

-   `data.js`, the data describing the relative search for the topic "Tour de France".

## Data

The data as described in **`res/data.js`** is taken from Google Trends, starting [with the Tour de France topic](https://trends.google.com/trends/explore?q=%2Fm%2F07hn5) and tailoring the time range to the month of July, for the years 2018 and 2019.

Each data point is described as an object detailing the date and the actual value for the search result.

## TODO

-   [ ] replace axis with custom solution

    -   remove axes and ticks
    -   add text elements and path elements for a series of data points (for instance every fifth vertically, every other one horizontally)
    -   add grid lines only horizontally

-   [ ] add a tooltip with a text+circle+path element

-   [ ] add a rectangle with a gradient for the start and end area
