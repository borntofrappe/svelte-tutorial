<script>
  import { mean } from "d3-array";
  import { interpolateCool } from "d3-scale-chromatic";
  import Donut from "./lib/Donut.svelte";

  const values = Array(10)
    .fill()
    .map((_) => Math.floor(Math.random() * 100));
  const value = Math.floor(Math.random() * 100);
  const average = mean(values);
  const color = interpolateCool(value / 100);

  // console.table(values)
</script>

<Donut />

<Donut {value} {average} {color} />
