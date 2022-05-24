# Stopwatch Anew

I previously explored a stopwatch application [in a separate demo](https://svelte.dev/repl/591aff801e1d47498afdc2738fea4485?version=3.48.0).

The goal of this project is to create an additional stopwatch application to track the passing of time and optionally record the time lapsed in between successive laps.

## Design

In the `res` sub-folder you find the icons designed for the project.

In the same location you find a rudimentary `.html`, `.css` combination to outline the appearance of the final app.

## Development

### Custom stores

The components benefit from two custom stores: `stopwatch` and `laps`.

With `stopwatch` define three methods to start, pause and stop the timer. Use an interval to retrieve instances of date objects, computing the difference between the start and current date.

When pausing the timer clear the interval and store the existing value in a separate variable, so to potentially resume the timer.

With `laps` define two methods to add a lap to an array and clear the entire collection. Out of convenience store each lap as an object with the value of the current stopwatch; this decision makes it possible to rapidly obtain the values displayed in the UI, the total considering the stopwatch and the increment considering the counterpart from the previous lap.

Insert each lap at the beginning of the list to show the items in reverse order.

### Utils

In `utils.js` define a couple of helper functions to destructure the stopwatch in the time periods shown in the display and format the periods in a specific string: `00:00.00`.

### Precision

The application is meant to show the timer up to the tens of seconds. Since the code tracks time through date objects, precise up to the milliseconds, it is necessary to adjust the script in several instances.

Starting with the custom store set the value of the stopwatch dividing the number of milliseconds by ten, hence obtaining the tens of seconds.

```js
set(Math.floor((new Date() - startDate) / 10));
```

To resume the timer from a previous value `elapsed` stores the existing stopwatch. As this value is once again described in tens of seconds, it is after all an instance of the custom store, multiply the measure by ten when computing the start date.

```js
const startDate = new Date() - elapsed * 10;
```

In the functions defined in `utils.js` compute the different time periods, tens, seconds and minutes. Once again `stopwatch` describes the number of tens of seconds.

### Display

Use a reactive statement to consider the value of the stopwatch store and update three variables for the number of tens of seconds, seconds and minutes.

```svelte
$: {
  const time = getTime($stopwatch);
  t = time.t;
  s = time.s;
  m = time.m;
}
```

Use an additional reactive declaration to update the string displayed in the paragraph element.

```svelte
$: timer = formatTime({ t, s, m });
```

Past the informative display the component introduces a custom visual with an `<svg>` element. The idea is to here update the position of a circle with each passing second, while animating the size of the same visual as the previous second comes to an end.

### Transitions

Use Svelte built-in transition to introduce and remove different elements.

In `Controls.svelte` transition the movement between the first option, to start a timer, and the active timer. Use `fly` with a specific duration so to delay the new elements as the old ones are indeed removed.

Out of preference I chose not to transition the buttons shown when the timer is paused.

In `Laps.svelte` layer two transitions, `slide` and `fade`, to introduce a new lap. In the `each` block use the number of the lap as an identifier, so that the elements are indeed introduced in the desired order.

```svelte
{#each $laps as { number, increment, total } (number)}
```
