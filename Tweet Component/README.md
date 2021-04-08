# [Tweet Component](https://svelte.dev/repl/2fd524fb5c7f427891269b4d0928ac15?version=3.12.1)

## How to Run

```bash
npm install
npm run dev
```

## Notes

This project begun as an exploration of the React framework, and is based on [this design](https://codepen.io/borntofrappe/pen/gOOvbQp).

### main.js

The component is initialized in `main.js`, passing the data through the `props` property.

```js
const props = {
  name: 'Pas',
  handle: 'paslepoulet',
  date: '2019 10 5 12 22 0',
  message:
    'Creating a reusable component for a hypothetical blog. With a readable store to update the timestamp!',
};

const tweet = new Tweet({
  target: document.body,
  props,
});
```

A few notes on the `props` object, or more generally on the properties picked up by the tweet component:

- `name`, `handle` and `message` refer to string values;

- `time` refers to a series of arguments describing an instance of the date object. Following [this insightful article](https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/#article-header-id-1) from [Zell Liew](https://twitter.com/zellwk), creating a date with arguments is preferred to using a string, as it provides a more accurate representation of the desired date. To use arguments, the date specifies a series of space separated integers, which are then included separately in the instance of the date object.

  ```js
  const date = new Date(...time.split(' '));
  ```

### Icon.js

Before diving in the main component, `Icon.js` describes the structure repeated throughout the project as to include icons. The idea is to have a component receiving at least a reference to a vector graphic and iclude this graphic through the `use` element.

`display: block` is the only property specified in the component to avoid the unnerving spacing otherwise displayed around the `<svg>` element.

### Tweet.js

The component is responsible for the actual markup of the tweet. Inspired by the structure of the original design, it uses a series of headings to describe the information in a clear hierarchy:

- name;

- handle;

- date;

- message.

A series of icons is introduced to be purely a decoration below the actual message, and taking advantage of the `Icon` component. Please note that the avatar is not included through the same component. This is because the purpose of the vector graphic is inherently different (it relates more to a picture than an icon). It also makes it easier to position the graphic in the `.tweet` container: as the `<style>` block is scoped to the component, the `<svg>` element would be disconnected by the layout described by the grid.

Beyond the icons, most of the logic introduced by the component relates to the timestamp. The idea is to have the `<time>` element describe two values:

- an instance of the date object depicting the date of the tweet. This value is included in the `dateTime` attribute;

- the delay between the same instance and the moment in which the page is visited.

With regards to the delay, the value is displayed in a matter of hours, minutes, or seconds, setting up an interval to update this reference with the passage of time. What's more, the delay is substituted by the original instance if the value exceeds the 23 hours mark; in this occurrence the element displays a formatted version of the date in which the message is sent.

### Update

In the previous version, I included the readable store with an auto subscription. This has the advantage of using the time value directly through the dollar sign syntax, `$time`, and allows Svelte take care of the subscription/ un-subscription. This works, but has the potential of being inefficient.

Let me explain briefly: the value displayed in the `<time>` element depends on the lapse between the current instance of the date object and the date described by the tweet:

- if less than a day, show the number of hours, or minutes, or seconds, between the two values.

- if more or exactly a day, show a date using the internationalization API.

It is only in the first instance that the subscription is required. Here we want to update the timestamp according to the passing of time. When the day threshold is reached however, the subscription is no longer necessary. Here the date will never change. It is likely that the application doesn't run in performance issues, especially considering how the UI will never be updated, but I decided to take care of this issue by using an explicit subscription.

```js
let lapse;

const unsubscribe = time.subscribe((now) => {
  lapse = now - dateTime;
});
```

By explicitly using the value from the readable store, it is possible to have a reference to the `unsubscribe` method. This method is then used when the lapse reaches the day threshold, using a reactive declaration.

```js
$: {
  if (lapse >= day) {
    unsubscribe();
    // show date
  } else {
    // show the number of hours, or minutes, or seconds
  }
}
```

Finally, and to prevent memory leaks, the method is also used in the lifecycle method `onDestroy`.
