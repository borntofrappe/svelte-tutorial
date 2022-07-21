# [High-speed Trains](https://svelte.dev/repl/0b1c85f4e13a4c53bf3bf381eb59c7bf?version=3.43.0)

[lemonde.fr](https://www.lemonde.fr/les-decodeurs/article/2021/09/17/quarante-ans-de-tgv-comment-les-grandes-villes-se-sont-rapprochees-de-paris_6095031_4355770.html) recently republished one of the visualizations the newspaper created back for [a 2017 article](https://www.lemonde.fr/les-decodeurs/visuel/2017/07/01/comment-le-tgv-a-retreci-la-france_5154203_4355770.html). The goal of this project is to replicate the visual, which sees a rather intriguing twist on a pie chart, to practice with Svelte and D3.

Data is collected straight from the source, the [National Company of French Railways](https://ressources.data.sncf.com/explore/dataset/meilleurs-temps-des-parcours-des-trains/table/?disjunctive.relations&dataChart=eyJxdWVyaWVzIjpbeyJjb25maWciOnsiZGF0YXNldCI6Im1laWxsZXVycy10ZW1wcy1kZXMtcGFyY291cnMtZGVzLXRyYWlucyIsIm9wdGlvbnMiOnsiZGlzanVuY3RpdmUucmVsYXRpb25zIjp0cnVlfX0sImNoYXJ0cyI6W3sidHlwZSI6ImNvbHVtbiIsImZ1bmMiOiJBVkciLCJ5QXhpcyI6IjE5ODJfMCIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6IiM2NmMyYTUifV0sInhBeGlzIjoicmVsYXRpb25zIiwibWF4cG9pbnRzIjo1MCwic29ydCI6IiJ9XSwidGltZXNjYWxlIjoiIn0%3D).

## Slots

[The tutorial](https://svelte.dev/tutorial/slots) introduces slots to add child elements to components. In the project, the feature is used to customize the main message and description preceding the column charts, leaning specifically on _named_ slots.

Considering the main message, the content is wrapped in a `<h2>` element and a `<slot>` with a specific `name` attribute.

```svelte
<h2>
    <slot name="heading">
        <span>Column chart main message</span>
    </slot>
</h2>
```

The content is then specified in `App.svelte` adding a `slot` attribute.

```svelte
<span slot="heading">
    Paris-Bordeaux by train...
</span>
```

## Input binding

The `<input />` element uses the first and last year as the boundaries of the range. The value is bound to a separate variable, `year`.

```svelte
<script>
    let year = years[0];
</script>

<input type="range" bind:value={year}>
```

Following Svelte two-way binding, this is enough to have the value of the variable reflect the state of the input. Change one and the other follows.

## Reactive declarations

The `$:` syntax allows to assign a value to a variable and have it bound to another variable. In the project, the feature is used to have `dataYear` inherently connected to the year value.

```svelte
let year = years[0];

$: dataYear = data.map(({ connection, times }) => ({
    connection,
    time: times.find((d) => d.year === year).time,
  }));
```

The year is technically used to have the array describe an object for each connection, with the time matching the selected feature. Past the idea of the project, however, the reactive declaration makes it possible to have `dataYear` "in sync" with the year value. Change `year` and a new array will consider the new time frame.

Notably. the feature is repeated to have the arcs making up the slices up-to-date with the dataset, with `dataYear`.

```svelte
$: arcs = pieGenerator(dataYear);
```
