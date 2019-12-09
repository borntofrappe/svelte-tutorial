<script>
    import { data } from "./utils.js"
    import Header from './Header.svelte'
    import LineChart from './LineChart.svelte'
</script>

<Header />
<LineChart title="Search Results - 2018" data="{data[2018]}"/>
<LineChart title="Search Results - 2019" data="{data[2019]}"/>

