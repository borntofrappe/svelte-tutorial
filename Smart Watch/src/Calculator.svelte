<script>
    import { ninePadded } from "./utils.js";

    let operation;

    let current = "123456";
    $: display = ninePadded(current);

    const buttons = [
        {
            href: 0,
            area: "zero"
        },
        {
            href: 1,
            area: "one"
        },
        {
            href: 2,
            area: "two"
        },
        {
            href: 3,
            area: "three"
        },
        {
            href: 4,
            area: "four"
        },
        {
            href: 5,
            area: "five"
        },
        {
            href: 6,
            area: "six"
        },
        {
            href: 7,
            area: "seven"
        },
        {
            href: 8,
            area: "eight"
        },
        {
            href: 9,
            area: "nine"
        },
        {
            href: ".",
            area: "decimal"
        },
        {
            href: "+",
            area: "addition"
        },
        {
            href: "-",
            area: "subtraction"
        },
        {
            href: "*",
            area: "multiplication"
        },
        {
            href: "/",
            area: "division"
        },
        {
            href: "=",
            area: "equal"
        },
        {
            href: "clear",
            area: "clear"
        }
    ];
</script>
<style>
    svg {
        display: block;
        width: 95%;
        height: auto;
        margin: 0.5rem auto;
    }
    section {
        margin: 0 auto;
        width: 95%;
        display: grid;
        grid-gap: 14px 4px;
        grid-template-areas: "seven eight nine clear clear" "four five six addition subtraction" "one two three multiplication division" "zero zero decimal equal equal";
    }
    button {
        width: 100%;
        height: 26px;
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
        height: 60%;
        width: auto;
    }
    button:before {
        position: absolute;
        content: "";
        top: 100%;
        left: -2px;
        width: 100%;
        height: 6px;
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
        height: 6px;
        background: hsl(0, 0%, 0%);
        opacity: 0.3;
        z-index: -5;
    }
    button:active {
        transform: translateY(6px);
    }
    button:active:before {
        transform: translateY(-6px);
    }
    button:active:after {
        transform: scaleY(0);
    }
</style>

<!-- in the svg fabricating the display define the path elements used throughout the component -->
<svg viewBox="0 0 450 80" width="450" height="80">
    <defs>
        <!-- numbers -->
        <path id="0" d="M 10 5 h 20 v 30 h -20 z"></path>
        <path id="1" d="M 20 5 h 5 v 30 m -5 0 h 10"></path>
        <path id="2" d="M 10 5 h 20 v 15 h -20 v 15 h 20"></path>
        <path id="3" d="M 10 5 h 20 v 30 h -20 m 0 -15 h 20"></path>
        <path id="4" d="M 10 5 v 15 h 20 m -5 -15 v 30"></path>
        <path id="5" d="M 30 5 h -20 v 15 h 20 v 15 h -20"></path>
        <path id="6" d="M 30 5 h -20 v 30 h 20 v -15 h -20"></path>
        <path id="7" d="M 10 5 h 20 v 30"></path>
        <path id="8" d="M 10 5 h 20 v 30 h -20 z m 0 15 h 20"></path>
        <path id="9" d="M 30 35 v -30 h -20 v 15 h 20"></path>
        <!-- operations -->
        <path id="+" d="M 5 20 h 30 m -15 -15 v 30"></path>
        <path id="-" d="M 5 20 h 30"></path>
        <path id="*" d="M 7 7 l 26 26 m 0 -26 l -26 26"></path>
        <path id="/" d="M 5 20 h 30 m -15 -15 v 0 m 0 30 v 0"></path>
        <path id="=" d="M 5 12 h 30 m -30 16 h 30"></path>
        <path id="." d="M 10 35 h 0"></path>
        <path id="clear" d="M 32 12 v -7 h -24 v 30 h 24 v -7"></path>
        <!-- graphic shown before the total and substituted by one of the operators -->
        <path id="asterisk" d="M 7 7 l 26 26 m 0 -26 l -26 26 m 13 1 v -28 m -14 14 h 28"></path>
        <!-- graphic shown as an error message (division by 0 or number greater than the allotted length) -->
        <path id="question" d="M 8 15 v -10 h 24 v 15 h -12 v 5 m 0 10 v 0"></path>
        <!-- graphic shown if the input number is less than 9 digits long -->
        <use id="placeholder" opacity="0.35" href="#8"></use>
    </defs>

    <g fill="none" stroke="currentColor" stroke-width="16">
        <rect x="8" y="-5" width="434" height="90"></rect>
    </g>
    <g transform="translate(15 20)">
        <g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="square" stroke-linejoin="square">
            <g transform="translate(10 0)">
                {#if operation}
                <use href="#{operation}"></use>
                {:else}
                <use href="#asterisk"></use>
                {/if}
            </g>
            <!-- include the characters of the display variable at intervals of 39 and starting at 60 -->
            {#each display as character, index}
            <g transform="translate({60 + 39 * index} 0)">
                {#if character !== ' '}
                <use href="#{character}"></use>
                {:else}
                <use href="#placeholder"></use>
                {/if}
            </g>
            {/each}
        </g>
    </g>
</svg>

<section>
    {#each buttons as {href, area}}
    <button aria-label="{area}" style="grid-area: {area};">
        <svg viewBox="0 0 40 40" width="40" height="40">
            <g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="square" stroke-linejoin="square">
                <use href="#{href}"></use>
            </g>
        </svg>
    </button>
    {/each}
</section>
