# [Seasonal Cheese](https://svelte.dev/repl/138eb5cbb131409c8d09845567b1f1ec?version=3.44.1)

## Inspiration and data

[Le Monde](https://www.lemonde.fr/les-decodeurs/article/2018/08/02/manger-du-reblochon-l-ete-du-mont-d-or-l-hiver-quelle-saisonnalite-pour-les-fromages_5338688_4355770.html) recently updated an article discussing how some cheeses are best sampled in specific months of the year. With this project I intend to replicate the component at the bottom of the article illustrating the topic with two `<select>` element and reactive declarations.

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

  The solution is quite neat and found in the source code of the mentioned article.

- with `.slice()` consider a reduced number of cheeses

In this manner, and leveraging Svelte reactive declarations, changing the month leads to a different index which in turn leads to a different array.

The values are then displayed in an unordered list, each with a `<li>` element.

_Please note:_ the markup is modified to have the list items wrap around a `<button>` element, useful to select a specific cheese for the next section.

## Cheeses

The second part of the application focuses on a specific cheese to highlight its name, origin, certification and type of milk.

```svelte
<p>
	Alternatively, pick a cheese:
	<select>
		{#each data as {name}}
			<option>{name}</option>
		{/each}
	</select>
</p>
```

The setup is similar to that for the month, and the binding happens again on the parent `<select>` element.

```svelte
<select bind:value={selectedCheese}>
```

The value is picked at random from the dataset.

```svelte
let selectedName = data[Math.floor(Math.random() * data.length)].name;
```

From the previous section, then, the value is updated as the reader selects one of the cheeses listed for the month. To this end, the markup is modified to have the list items nest button elements.

```svelte
<li>
  <button>
    {name}
  </button>
</li>
```

The button updates the selected name directly, illustrating svelte two-way binding.

```svelte
<button on:click={() => { selectedName = name; }}>
```

With an additional reactive declaration it is possible to find the cheese with a matching name and illustrate the selection with more details.

```svelte
$: selectedCheese = data.find(({name}) => name === selectedName);
```

At first I marked-up the information in `App.svelte`, but ultimately decided to pass the information to a dedicated component, `Cheese.svelte`. In this manner the project illustrates how it is possible to spread the object properties.

```svelte
<Cheese {...selectedCheese} />
```

The component can then refer to the fields specifically instead of `selectedCheese.name`, `.country` and so forth.

_Please note:_ below the details for the selected cheese the project includes a small visualization with an `<svg>` element. To position rectangles side by side I opted to rely on the d3 library and specifically the function `.scaleBand()` from the `d3-scale` module.
