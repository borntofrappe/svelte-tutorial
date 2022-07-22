# Countdown Timer

A component to count down a certain number of seconds and with a certain delay.

Inspired by pokemon smile and the counter illustrating how long to brush one's own teeth, the component creates a nice playground for Svelte transitions, event forwarding and possibly a custom store.

## Transitions

For the countdown the idea is to animate the introduction of each number to have the digit scaled up and rotated right and left a couple of times. It is possible to implement the animation in CSS, see `jiggleCSS`, but on `-webkit` browsers the text becomes blurry. This explains why I ultimately replicated the transition with JavaScript, see `jiggleJS`.

## dispatch

When the countdown comes to a close dispatch a custom `end` event. The idea is to use this event to remove the countdown and begin the timer.

When the timer comes to a close dispatch the same event, but instead of accomplishing something foward the event up to the parent scope.

```svelte
<Timer on:end />
```

In this manner you can react to the countdown timer ending its functionality, directly in the component using `CountdownTimer.svelte`.

```svelte
<CountdownTimer on:end={handleEnd} />
```
