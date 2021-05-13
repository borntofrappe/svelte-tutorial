# [Github Contributions](https://svelte.dev/repl/756596b4f3af4f02bf23e572159f159c?version=3.38.2)

## Notes

Consider the way Github highlights the contributions to public repositories, for instance the contributions to [sveltekit](https://github.com/sveltejs/kit/graphs/contributors?from=2020-10-11&to=2021-05-11&type=c). The goal of this project is to replicate the visual with a series of area charts.

### Context

Svelte provides `setContext` and `getContext` function to rapidly share data between nested components. The idea is to use the setter function to store a value with a key.

```js
import { setContext } from 'svelte';

setContext('timeParse', timeParse('%Y-%m-%d'));
```

Any nested component has then access to the value through the getter method.

```js
import { getContext } from 'svelte';

const timeParse = getContext('timeParse');
```

In the project the feature allows to rely on the same parsing function in the `<Contributions />` and `<Contributors />` components.

### [Area Chart](https://svelte.dev/repl/bc91f9fa82c84ac1bc2d4f8d230bbc2c?version=3.38.2)

`<AreaChart />` is designed as a small component to plot the input data with a `<path />` element and a series of ticks. Take notice of the purpose of the `upperBound` variable:

- `yAccessor` is included to retrieve the value plotted on the y axis, and it is used to find the maximum value in the input dataset.

  ```js
  import { max } from 'd3-array';

  max(data, yAccessor);
  ```

  The value is included directly in the vertical scale and allows to describe the height of the curve

- when plotting multiple charts, it is helpful to have a consistent maximum value, so that it is possible to compare adjecent visualizations

- `upperBound` is passed to the component to replace the default valule

  ```js
  export let upperBound = max(data, yAccessor);
  ```

### [Custom Store](https://svelte.dev/repl/8cc4c31e5594449d9a00fce3959c500f?version=3.38.2)

In a more elaborate demo, the project allows to swap between the available metrics, considering not only the number of commits, but additions and deletions. A store is here helpful to have the different components rely on the same metric.

```js
import { metric } from './stores.js';

// $metric // 'c'
```

Moreover, the construct is helpful to update the metric in one place, and have the change ripple to the benefiting components.

```js
metric.set('a'); // additions
```

Instead of using a basic writable store `stores.js` exports a custom store, but the logic is rather straightforward: allow to only set values through the `set` function, limit the values to those specified in a hard-coded array.

```js
const metrics = ['c', 'a', 'd'];
```

The biggest hurdle is finally considering which variable needs to be updated. Here you find the variables which depend, rely on the value kept in the store, like `data` in the `<Contributions />` component. Use reactive declarations and statements to consider the different data.
