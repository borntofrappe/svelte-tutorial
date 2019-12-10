<script>
    import { data } from "./utils.js"
    import Header from './Header.svelte'
    import LineChart from './LineChart.svelte'
</script>

<div id="root">
    <Header />
    <LineChart title="106th Edition - 2019" data="{data[2019]}"/>
    <LineChart title="105th Edition - 2018" data="{data[2018]}"/>
</div>

