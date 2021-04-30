# School Closures Maps

The project can be considered a continuation of [School Closures Choropleth Map](https://github.com/borntofrappe/learning-d3/tree/master/School%20Closures%20Choropleth%20Map), a project focused on plotting a map with `d3/d3-geo` and `topojson/topojson` and `topojson/world-atlas`.

A first visualization tries to replicate the cited choropleth map, to introduce how the mapping libraries are incorporated in Svelte. A second visualization includes the map in an interactive dashboard.

Similarly to the cited project, the data is retrieved from the [UNESCO website](https://en.unesco.org/covid19/educationresponse), and the source is modified to have a unique identifier matching that available from the topojson object necessary to draw the world.

## npm

The project relies on the `d3` and `topojson` libraries. With a production website it would be fitting to install only the necessary `d3-` modules, but to explore the library it is more convenient to include the full version.

```bash
npm install d3
npm install topojson
```

## rollup

To include data from a `.csv` file it is necessary to update the configuration behind the rollup bundler. Most practically, this means installing the `@rollup/plugin-dsv` plugin.

```bash
npm install @rollup/plugin-dsv --save-dev
```

In `rollup.config.js` then, the plugin is included in a `plugin` field.

```js
import dsv from '@rollup/plugin-dsv';
export default {
  plugins: [dsv()],
};
```

This is all that is necessary to then import the data in array format.

```js
import data from '../static/covid_impact_education.csv';
```

### warn

`rollup.config.js` is updated to skip the warning associated with the `d3` library. This is to avoid logging a warning associated with circular dependencies, [which are intentional](https://github.com/d3/d3-selection/issues/229#issuecomment-541355430).

```js
export default {
  //
  onwarn(warning, warn) {
    if (
      warning.code === 'CIRCULAR_DEPENDENCY' &&
      warning.importer.includes('d3')
    )
      return;
    warn(warning);
  },
};
```

## await

When retrieving the topojson object from `topojson/world-atlas` it is possible to take advantage of Svelte's `await` block.

```js
const promise = json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
```

```html
{#await promise then data}
<!-- draw countries -->
{/await}
```

In a more refined example, the block can be used to provide a default visual while the data is being retrieved, and even an error visual in case the promise fails.

```html
{#await promise}
<!-- loading visual -->
{:then data}
<!-- draw countries -->
{:catch error}
<!-- error visual -->
{/await}
```
