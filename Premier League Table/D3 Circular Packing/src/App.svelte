<script>
	import Packing from './Packing.svelte';
	
	import { range } from 'd3-array';
	
	const data = range(6).map((_, i) => ({
		name: `team-${i}`,
		points: 1 + i * Math.floor(Math.random() * 10)
	}))
</script>

<Packing {data} />
 