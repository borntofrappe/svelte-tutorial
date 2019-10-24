<script></script>

<style>
    div {
        display: flex;
        align-items: center;
        filter: drop-shadow(0 0 0.65rem hsl(0, 0%, 80%));
        height: 18rem;
    }

    section {
        width: 18rem;
        height: 100%;
        padding: 2rem;
        background: hsl(0, 0%, 95%);
        background: linear-gradient(to right, transparent 25%, hsl(0, 0%, 5%) 25%, hsl(0, 0%, 5%) 75%, transparent 75%), hsl(0, 0%, 100%);
    }

    main {
        width: 100%;
        height: 100%;
        background: hsl(120, 30%, 58%);
        border: 0.25rem solid hsl(0, 0%, 5%);
        position: relative;
    }
    main:before,
    main:after {
        content: "";
        position: absolute;
        left: 0%;
        width: 100%;
        height: 50%;
        background: hsl(0, 0%, 5%);
        transform: scaleY(0);
    }
    main:before {
        top: 0%;
        transform-origin: 50% 0%;
    }
    main:after {
        bottom: 0%;
        transform-origin: 50% 100%;
    }

    nav {
        width: 5rem;
        height: 100%;
        padding: 3rem 2rem;
        padding-left: 0rem;
        background: hsl(0, 0%, 100%);
        border-radius: 0 5rem 5rem 0;
        /* display the buttons in a column */
        display: flex;
        flex-direction: column;
    }
    nav button {
        background: hsl(360, 85%, 65%);
        border: 0.25rem solid hsl(0, 0%, 5%);
        flex-grow: 1;
    }
    nav button:active {
        filter: brightness(95%);
    }
    nav button:first-of-type {
        border-top-right-radius: 2rem;
        border-bottom: none;
    }
    nav button:last-of-type {
        border-bottom-right-radius: 2rem;
    }
</style>

<div>
    <section>
        <main>
            <!-- include the gadget(s) here -->
        </main>
    </section>
    <nav>
        <button aria-label="Previous Gadget"></button>
        <button arial-label="Next Gadget"></button>
    </nav>
</div>
