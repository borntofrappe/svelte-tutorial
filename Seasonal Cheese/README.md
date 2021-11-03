## Inspiration and data

[lemonde](https://www.lemonde.fr/les-decodeurs/article/2018/08/02/manger-du-reblochon-l-ete-du-mont-d-or-l-hiver-quelle-saisonnalite-pour-les-fromages_5338688_4355770.html) recently updated an article discussing how some cheeses are best sampled in specific months of the year. With this project I intend to replicate the component at the bottom of the article illustrating the topic with two `<select>` element.

Data is retrieved from [the page source](view-source:https://www.lemonde.fr/les-decodeurs/article/2018/08/02/manger-du-reblochon-l-ete-du-mont-d-or-l-hiver-quelle-saisonnalite-pour-les-fromages_5338688_4355770.html) and slightly modified to use english labels and focus on a smaller set of values.

## Months

The first part of the component highlights the cheeses according to the selected month.

Start from a series of hard-coded values.

```js
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
```

With an `#each` block iterate through the values to include an `<option>` element for each option.

```svelte
<select>
  {#each months as month}
    <option>{month}</option>
  {/each}
</select>
```

Bind a variable to the parent `<select>` element to refer to a specific month. This could be a hard-coded value, but also the current month.

```svelte
<script>
  let selectedMonth = months[new Date().getMonth()];
</script>

<select bind:value={selectedMonth}>
</select>
```

With a reactive declaration then consider the cheeses available in the prescribed month.

```svelte
$: selectedMonthCheeses = data
		.filter(({ beginning, end }) => {})
```

Note that the JavaScript index starts at 0, while the dataset describes months in the `[1, 12]` range.

Also note that in the final application the dataset is refined with two additional methods:

- with `.sort()` modify the order of the elements at random

  ```js
  data.sort(() => 0.5 - Math.random());
  ```

  The solution is quite neat and found in the source code of the article

- with `.slice()` consider a reduced number of cheeses

In this manner, and leveraging Svelte reactive declarations, changing the month leads to a different index which in turn leads to a different array.

The values are then displayed in an unordered list, each with a `<li>` element.

_Please note:_ the markup is modified to have the list items wrap around a `<button>` element, useful to select a specific cheese for the next section.

## Cheeses

The second part of the application focuses on a specific cheese to highlight its name, origin, certification and type of milk.

## Additional remarks

- at least at the time of writing and with my current setup downloading the zip file from the REPL results in the data being modified with respect with accents and special characters. Copy-paste the data from `data.js` to fix the missing glyphs `�`
