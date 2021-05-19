# Countdown App

## Notes

This project is inspired by a [this timer application](https://codepen.io/borntofrappe/pen/dwVZRQ) created with the React framework; the goal is to replicate the countdown functionality with Svelte and taking advantage of its innate features, like stores and component binding.

### [Subscribable Readable Store](https://svelte.dev/repl/ec02443fa5a8402aa9874d776d5174fd?version=3.38.2)

The application needs to count down to a point in time, and a [readable store](https://svelte.dev/tutorial/readable-stores) is here able to provide a date object at an interval, say every second, to accurately estimate the passing of time. The tutorial describes how to achieve the basic store functionality, but includes an auto subscription by using the dollar sign `$` operator.

```svelte
<h1>
  {formatter.format($time)}
</h1>
```

In the application, however, it is necessary to keep track of the time only at the press of a button. Furthermore, it is necessary to stop the interval at any given moment. In light of this, the demo shows how to achieve the feat by explicitly subscribing to the value of the store.

```svelte
const unsubscribe = time.subscribe(value => {
  time_value = value;
});
```

`unsubscribe` stores a reference to the function you'd ultimately call before destroying the component.

```svelte
onDestroy(() => {
  unsubscribe;
})
```

Here, however, the function is called when toggling the checkbox off. `unsubscribe` receives a reference to the unsubscribing function only as the checkbox is checked.

```svelte
$: if(checked) {
		unsubscribe = time.subscribe(value => {
			time_value = value;
		});
	}
```

The variable revers back to `null` in the opposite scenario, but only after calling the saved function.

```svelte
$: if(checked) {
		// ..
	} else if(unsubscribe) {
		unsubscribe();
		unsubscribe = null;
	}
```

Trivially, you can attest how the interval is running only with the checkbox checked by logging a message at every iteration.

```js
const interval = setInterval(() => {
  console.log('tick');
  set(new Date());
}, 1000);
```
