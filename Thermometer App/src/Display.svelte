<script>
	import { tweened } from 'svelte/motion';

    export let value;
    export let min;
    export let max;

    const arc = d3.arc()
        .innerRadius(46)
        .outerRadius(46)
        .startAngle(-Math.PI + Math.PI / 4)
        .endAngle(Math.PI - Math.PI / 4);

    const scaleRotation = d3.scaleLinear().domain([min, max]).range([-Math.PI + Math.PI / 4, Math.PI - Math.PI / 4]);
    let rotation = tweened(scaleRotation(value) * 180 / Math.PI);
    
    $: scaleRotation.domain([min, max]);
    $: if(value || min || max) {
        rotation.set(scaleRotation(value) * 180 / Math.PI);
    }


    $: console.log(arc());
</script>

<svg viewBox="-50 -50 100 100" width="200" height="200">
    <circle r="28" fill="none" stroke="currentColor" stroke-width="6" />
    <g transform="rotate({$rotation})">
        <path d="M -5 -28 a 6 6 0 0 1 5 -5 6 6 0 0 1 5 5" fill="currentColor" stroke="currentColor" stroke-width="5" />
    </g>
    <text transform="translate(-30 48)" text-anchor="middle" font-size="10">{min}</text>
    
    <text text-anchor="middle" dominant-baseline="middle" font-size="14">{value} C</text>
    
    <text transform="translate(30 48)" text-anchor="middle" font-size="10">{max}</text>

    <path d="{arc()}" fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round" />
</svg>

<style>
    svg {
        display: block;
    }
</style>