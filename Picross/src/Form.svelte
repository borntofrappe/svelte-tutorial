<script>
    // dispatch a change event when the input of type radio is modified
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // variable bound to the input(s) of type radio
    let tool = "Pencil";

    // it is possible to dispatch the event with a reactive declaration
    // as tool change, the function is fired
    $: dispatch("change", tool);

    // the same could be achieved with a handleChange function connected to the `change` event
    // ! just remember to add the directive on the form
    // function handleChange(e) {
    //     dispatch("change", tool);
    // }
</script>

<style>
    /* display the buttons in a column, at the top of the row */
    form {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-right: 2rem;
        margin-bottom: 2rem;
    }
    /* separate the buttons vertically */
    form > * + * {
        margin-top: 1rem;
    }
    /* include the labels as circles with a fixed width and height */
    label {
        width: 65px;
        height: 65px;
        padding: 1rem;
        border-radius: 50%;
        color: hsl(0, 0%, 5%);
        border: 4px solid currentColor;
        background: hsl(0, 0%, 100%);
        position: relative;
    }
    /* by default reduce the scale and opacity of the graphic nested in each label
    set the original values when the connected input of type radio is checked
    */
    label input + svg {
        opacity: 0.5;
        transform: scale(0.8);
        transition: all 0.25s ease-in-out;
    }
    label input:checked + svg {
        opacity: 1;
        transform: scale(1);
    }
    /* position the input of type radio on top of the svg graphic */
    label input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    label svg {
        display: block;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    /* for smaller viewports the table starts to be more brittle */
    @media (max-width: 550px) {
        /* display the controls in a row */
        form {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-evenly;
            align-items: center;
        }
        /* remove the space included between the controls */
        form > * + * {
            margin-top: 0;
        }
        label {
            width: 60px;
            height: 60px;
        }
    }
</style>

<form on:submit|preventDefault>
    <!-- input(s) of type radio using an svg graphic to describe the two modalities of the game -->
    <label aria-label="Select pencil" for="pencil">
        <!-- bind the input elements with the tool variable
        ! by default set the variable to consider the first input's value
        -->
        <input type="radio" name="tool" id="pencil" bind:group="{tool}" value="Pencil" />
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g stroke="none" fill="currentColor">
                <path d="M 0 100 h 30 l 70 -70 l -30 -30 l -70 70"></path>
            </g>
        </svg>
    </label>

    <label aria-label="Select eraser" for="easer">
        <input type="radio" name="tool" id="erase" bind:group="{tool}" value="Eraser" />
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g stroke="none" fill="currentColor">
                <path d="M 0 0 h 20 l 30 30 l 30 -30 h 20 v 20 l -30 30 l 30 30 v 20 h -20 l -30 -30 l -30 30 h -20 v -20 l 30 -30 l -30 -30"></path>
            </g>
        </svg>
    </label>
</form>
