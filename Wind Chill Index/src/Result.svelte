<script>
    // describe the variables received from the parent component
    export let isMetric;
    export let temperature;
    export let speed;
    export let index;
</script>
<style>
    dl {
        text-align: right;
        background: hsl(210, 25%, 25%);
        box-shadow: 0 1px 10px -5px hsla(220, 20%, 2%, 0.2);
        padding: 1.5rem 3rem;
        font-weight: 700;
        text-align: center;
    }
    dt {
        font-size: 5.5rem;
        color: hsl(210, 25%, 85%);
    }
    dt:nth-of-type(n + 2) {
        margin-top: 1rem;
        font-size: 2.25rem;
    }
    dd {
        margin-left: 0.75rem;
        color: hsl(210, 25%, 0%);
        font-size: 1.5rem;
        text-transform: uppercase;
    }
    @supports (display: grid) {
        dl {
            display: grid;
            grid-gap: 1.25rem 0.5rem;
            justify-items: center;
            grid-template-areas: "wci wci-unit" "temperature speed" "temperature-unit speed-unit";
        }
        dt:nth-of-type(1) {
            grid-area: wci;
        }
        dd:nth-of-type(1) {
            grid-area: wci-unit;
            align-self: end;
        }
        dt:nth-of-type(2) {
            grid-area: temperature;
        }
        dd:nth-of-type(2) {
            grid-area: temperature-unit;
        }
        dt:nth-of-type(3) {
            grid-area: speed;
        }
        dd:nth-of-type(3) {
            grid-area: speed-unit;
        }
    }
</style>
<!-- include the values in a wrapping container -->
<dl>
    <dt>{index}</dt>
    <dd>WCI</dd>

    <dt>{temperature}</dt>
    <dd>{isMetric ? 'c°' : 'f°'}</dd>

    <dt>{speed}</dt>
    <dd>{isMetric ? 'km/h' : 'mph'}</dd>
</dl>
