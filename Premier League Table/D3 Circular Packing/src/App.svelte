<script>
  import Packing from './Packing.svelte';
  import { range } from 'd3-array';

  const data = range(10).map((_, i) => ({
    name: `team-${i}`,
    value: 1 + i * Math.floor(Math.random() * 10),
  }));
</script>

<Packing {data} />
