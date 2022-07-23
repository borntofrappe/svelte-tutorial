# Delayed Countdown

A component to count down an arbitrary number of seconds after an arbitrary delay.

Inspired by pokemon smile and the counter illustrating how long to brush one's own teeth, the component creates a nice playground for Svelte transitions, event forwarding and possibly a store.

## Transitions

For the countdown the idea is to animate the introduction of each number to have the digit scaled up and rotated right and left a couple of times. It is possible to implement the animation in CSS, see `jiggleCSS`, but on `-webkit` browsers the text becomes blurry. This explains why I ultimately replicated the transition with JavaScript, see `jiggleJS`.

## dispatch

When the countdown comes to a close dispatch a custom `end` event. The idea is to use this event to remove the countdown and begin the timer.

In this manner you can react to the component reaching its end in the parent's scope.

```svelte
<CountdownTimer on:end={handleEnd} />
```

## Readable store

You can set an interval in the `.svelte` component, but also isolate the functionality into a store — see `stores.js`.

One approach is to export a function which returns a readable store.

```js
export const createTimer = (time) => {
  const timer = readable(time, function start(set) {
    const date = new Date(new Date().getTime() + time * 1000);
    const interval = setInterval(() => {
      const time = Math.round((date.getTime() - new Date().getTime()) / 1000);
      set(time);

      if (time === 0) clearInterval(interval);
    }, 1000);

    return function stop() {
      clearInterval(interval);
    };
  });
  return timer;
};
```

With this setup it is enough to subscribe to the store to have the value automatically decremented.

```js
const time = createTimer(10);
$: console.log($time);
```

Setting `time` to `null`, or something different from the store returned by the function, allows to call the `stop` function, so to avoid a memory leak.
