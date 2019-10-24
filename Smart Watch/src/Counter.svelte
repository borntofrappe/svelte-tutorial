<script>
    let count = 0;
    $: digits = count.toString();
</script>

<style>
    svg {
        display: block;
        width: 100%;
        height: auto;
    }

    button {
        margin: 0 auto;
        width: 64px;
        height: 58px;
        background: none;
        border: none;
        border: 2px solid hsl(0, 0%, 0%);
        border-bottom: none;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;
    }
    button svg {
        display: block;
        height: 80%;
        width: auto;
    }
    button:before {
        position: absolute;
        content: "";
        top: 100%;
        left: -2px;
        width: 100%;
        height: 8px;
        border: 2px solid hsl(0, 0%, 0%);
        border-top: none;
        z-index: -5;
    }
    button:after {
        position: absolute;
        content: "";
        top: 100%;
        left: 0%;
        width: 100%;
        height: 8px;
        background: hsl(0, 0%, 0%);
        opacity: 0.3;
        z-index: -5;
    }
    button:active {
        transform: translateY(8px);
    }
    button:active:before {
        transform: translateY(-8px);
    }
    button:active:after {
        transform: scaleY(0);
    }
</style>
<svg viewBox="0 0 100 60">
    <defs>
        <path id="0" d="M -6 -15 h 12 v 30 h -12 z"></path>
        <path id="1" d="M -2 -15 h 5 v 30 m -5 0 h 8"></path>
        <path id="2" d="M -6 -15 h 12 v 15 h -12 v 15 h 12"></path>
        <path id="3" d="M -6 -15 h 12 v 30 h -12 m 0 -15 h 12"></path>
        <path id="4" d="M -6 -15 v 15 h 12 m -3 -15 v 30"></path>
        <!-- :p -->
        <g id="5"><use href="#2" transform="scale(-1 1)"></use></g>
        <path id="6" d="M 6 -15 h -12 v 30 h 12 v -15 h -12"></path>
        <path id="7" d="M -6 -15 h 12 v 30"></path>
        <path id="8" d="M -6 -15 h 12 v 30 h -12 z m 0 15 h 12"></path>
        <path id="9" d="M 6 15 v -30 h -12 v 15 h 12"></path>
        <path id="add" d="M -40 0 h 80 m -40 -40 v 80"></path>
    </defs>
    <g transform="translate(0 30)">
        <g fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="square">
            <g stroke-width="3" opacity="0.5">
                <path d="M 27 -14 h 46 l 5 5 v 18 l -5 5 h -46 l -5 -5 v -18 z"></path>
            </g>
            <g stroke-width="5">
                {#each digits as letter, index}
                <g transform="translate({68 - (digits.length - 1) * 12 + index * 12} 0) scale(0.5)">
                    <use href="#{letter}"></use>
                </g>
                {/each}
            </g>
        </g>
    </g>
</svg>
<button aria-label="Increment counter" on:click="{() => count = Math.min(count + 1, 9999)}">
    <svg viewBox="0 0 100 100" width="35" height="35">
        <g transform="translate(50 50)">
            <g fill="none" stroke="currentColor" stroke-width="20">
                <use href="#add"></use>
            </g>
        </g>
    </svg>
</button>
