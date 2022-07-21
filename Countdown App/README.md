# [Countdown App](https://svelte.dev/repl/a19df6f013434e01bb990349843af288?version=3.38.2)

## Notes

The goal of this project is to replicate [a timer application](https://codepen.io/borntofrappe/pen/dwVZRQ) I first created with the React framework. In separate demos I created parts of the application; this helps me focus on a few Svelte-specific features.

### [Event Forwarding and Component Binding](https://svelte.dev/repl/48eec86cb34e438eaab62ebbcea53f97?version=3.38.2)

The demo includes a keypad similar to that one introduced in the tutorial devoted to [component binding](https://svelte.dev/tutorial/component-bindings). The section explaining [event forwarding](https://svelte.dev/tutorial/dom-event-forwarding) is also relevant, as it illustrates how the `submit` event is forwarded from the nested component.

By binding `value`, the variable is kept up to date with the variable set up in the nested component.

```svelte
<Input
  bind:value
/>
```

By listening to the `submit` event, the component is able to forward the event set on the individual `<form>` element.

```svelte
<Input on:submit={() => {  /* do something */ }} />
```

With regards to the `<Input />` component, consider the following:

- `preventDefault` modifies the event to call `event.preventDefault()`

- the `<form>` element includes a multitude of buttons, but only one is assigned a type of `submit`. The other buttons are assigned a type of `button` to avoid submitting the form with every interaction

### [Count Down](https://svelte.dev/repl/66e605ed9a9746b9a020f06ccc2c3859?version=3.38.2), [Count Down Interact and Tween](https://svelte.dev/repl/b995e36a83644428a4e608f6721d6b94?version=3.38.2)

The demos illustrate how to set up and manage a timer:

- the first demo shows how to consider the number of hours, minutes and seconds from a few `<input>` elements, tally up the countdown and then count down to zero, all the while describing the remaining time in its different component

- the second project includes interactions in the form of a couple of buttons, plus a tween animation for an elementary progress bar. The features are considerable enough to deserve a dedicated demo, especially considering a few decisions with regards to the animation

In the second demo, yhe progress bar is animated toward one unit below the current count value. Without this precaution, and as the count reaches zero, the animation would take another second to come to a conclusion.

```js
$: offset.set(Math.max(count - 1, 0) / countdown);
```

When the timer is paused, the offset recedes to the value described by the counter. It would be possible to compute the exact value between the two tweens, but it would be against the functionality of the application, counting down from integer values.

```js
function handlePause() {
  offset.set(count / countdown, { duration: 150 });
}
```

When the timer is restarted, and before the interval has a chance to update the application, the offset moves to its eventual position.

```js
function handleStart() {
  offset.set(Math.max(count - 1, 0) / countdown);
}
```

When the timer is reset, the offset moves back to its original value. Moreover, the timer is restarted once the animation is completed. The `.set` function provides a promise which resolves when the tween ends, so that it is possible to nest the instructions in body of the function called with the `.then` method.

```js
offset.set(1).then(() => {
	// restart timer
}
```
