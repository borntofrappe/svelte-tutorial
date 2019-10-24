<script>
    import { onDestroy } from "svelte";

    let now = new Date();
    $: hours = now.getHours();
    $: minutes = now.getMinutes();

    let interval = setInterval(() => {
        now = new Date();
    }, 1000);

    onDestroy(() => {
        clearInterval(interval);
    });
</script>
<style>
    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>

<svg viewBox="0 0 100 100">
    <defs>
        <rect id="square" x="-2.5" y="-2.5" width="5" height="5"></rect>
    </defs>
    <g transform="translate(50 50)">
        <g fill="currentColor" stroke="none">
            <g id="dial-main">
                <use transform="rotate(0) translate(0 -40)" href="#square"></use>
                <use transform="rotate(90) translate(0 -40)" href="#square"></use>
            </g>
            <use href="#dial-main" transform="scale(-1 -1)"></use>

            <g id="dial-support" opacity="0.5">
                <use transform="rotate(30) translate(0 -40) rotate(-30)" href="#square"></use>
                <use transform="rotate(60) translate(0 -40) rotate(-60)" href="#square"></use>
                <use transform="rotate(120) translate(0 -40) rotate(-120)" href="#square"></use>
                <use transform="rotate(150) translate(0 -40) rotate(-150)" href="#square"></use>
            </g>
            <use href="#dial-support" transform="scale(-1 1)"></use>
        </g>

        <g fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="4">
            <g transform="rotate({hours * 15})">
                <path opacity="0.5" d="M 0 0 v -15" stroke-width="4"></path>
            </g>
            <g transform="rotate({minutes * 6})">
                <path d="M 0 0 v -30" stroke-width="2.5"></path>
            </g>
        </g>
    </g>
</svg>
