# Countdown App

## Notes

The goal of this project is to replicate [a timer application](https://codepen.io/borntofrappe/pen/dwVZRQ) I first created with the React framework. In separate demos I created parts of the application.

### [Event Forwarding and Component Binding](https://svelte.dev/repl/48eec86cb34e438eaab62ebbcea53f97?version=3.38.2)

The demo includes a keypad similar to that one introduced in the tutorial devoted to [component binding](https://svelte.dev/tutorial/component-bindings). The section explaining [event forwarding](https://svelte.dev/tutorial/dom-event-forwarding) is also relevant, as it provides the syntax to forward the `submit` event from the nested component.

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
