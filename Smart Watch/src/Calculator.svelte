<script>
    // import the utility function adding empty spaces to make a string 9 characthers long
    import { ninePadded } from "./utils.js";

    // initialize variables to keep track of the input numbers, operation and total
    let operand1 = 0;
    let operand2 = 0;
    let total = 0;
    let operator;

    // variable describing the string included in the display through use elements
    let display = "";

    // regular expressions to differentiate a number or operator
    const regexNumber = /\d/;
    const regexOperation = /[+\-*/]/;

    // integers
    function handleNumber(number) {
        // if total already describes a value (existing operation) reset the display
        if (total) {
            // move the total to the second operand
            operand2 = total;
            total = 0;
            display = "";
        }

        // append the input number to the string describing the display
        // ! limit the number of characters to the chosen 9 digits
        display = display.length < 9 ? `${display}${number}` : display;
        // update the operand to follow the numerical version of the display
        operand1 = parseFloat(display);
    }

    // operators
    function handleOperation(operation) {
        // if there isn't already an operator, store the first operand in the second one and update the operator
        if (!operator) {
            operand2 = operand1;
            operand1 = 0;
            operator = operation;
            display = "";
        } else {
            // compute the total and update the operation
            handleTotal();
            operator = operation;
        }
    }

    // decimal point
    // use the handleNumber function to update the display as long as a decimal point isn't already present
    function handleDecimal() {
        if (!display.includes(".")) {
            // edge case: if the display doesn't show any number, prepend 0 before the decimal point
            if (display) {
                handleNumber(".");
            } else {
                handleNumber("0.");
            }
        }
    }

    // function called for the chosen edge cases
    // show a series of question marks in the display
    function handleError() {
        display = "?".repeat(9);
        // reset the variables
        operator = null;
        operand1 = 0;
        operand2 = 0;
        total = 0;
    }

    // equal sign
    // according to the value of the operator and operands compute the total
    function handleTotal() {
        /* edge cases - division by zero: show a series of question marks */
        if (operator === "/" && operand1 === 0) {
            handleError();
        } else {
            // compute the total according to the operator
            switch (operator) {
                case "+":
                    total = operand2 + operand1;
                    break;
                case "-":
                    total = operand2 - operand1;
                    break;
                case "*":
                    total = operand2 * operand1;
                    break;
                case "/":
                    total = operand2 / operand1;
                    break;
                default:
                    total = operand1;
                    break;
            }

            /* edge cases - number greater than 999999999, or number smaller than -99999999 */
            if (total > 999999999 || total < -99999999) {
                handleError();
            } else {
                // reset the operator and the value of the second operand
                operator = null;
                operand1 = 0;
                // store the total in the second operand
                operand2 = total;
                // show the total in the display
                display = total.toString();
            }
        }
    }

    // clear
    // reset the variables to display the default state
    function handleClear() {
        display = "";
        operator = null;
        operand1 = 0;
        operand2 = 0;
        total = 0;
    }

    // function following a click event on the buttons in the .controls container
    // receiving as input the value of the button (an integer, operator or other sign)
    function handleClick(value) {
        // dispatch the appropriate functions to update the operand/operator/total variables
        if (regexNumber.test(value)) {
            handleNumber(value);
        } else if (regexOperation.test(value)) {
            handleOperation(value);
        } else {
            switch (value) {
                case ".":
                    handleDecimal();
                    break;
                case "=":
                    handleTotal();
                    break;
                case "clear":
                    handleClear();
                    break;
            }
        }
    }

    // array describing the buttons included in the section below the display
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
        <path id="?" d="M 8 15 v -10 h 24 v 15 h -12 v 5 m 0 10 v 0"></path>
        <!-- graphic shown if the input number is less than 9 digits long -->
        <use id="placeholder" opacity="0.35" href="#8"></use>
    </defs>

    <g fill="none" stroke="currentColor" stroke-width="16">
        <rect x="8" y="-5" width="434" height="90"></rect>
    </g>
    <g transform="translate(15 20)">
        <g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="square" stroke-linejoin="square">
            <g transform="translate(10 0)">
                {#if operator}
                <use href="#{operator}"></use>
                {:else}
                <use href="#asterisk"></use>
                {/if}
            </g>
            <!-- include the characters of the display variable at intervals of 39 and starting at 61 -->
            {#each ninePadded(display) as character, index}
            <g transform="translate({61 + 39 * index} 0)">
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
    <button aria-label="{area}" style="grid-area: {area};" on:click="{() => handleClick(href)}">
        <svg viewBox="0 0 40 40" width="40" height="40">
            <g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="square" stroke-linejoin="square">
                <use href="#{href}"></use>
            </g>
        </svg>
    </button>
    {/each}
</section>
