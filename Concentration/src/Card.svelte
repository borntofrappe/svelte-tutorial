<script>
    // the idea is to have the card component describe the card and allow for click/key presses through a button
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function flip() {
        dispatch("flip", card);
    }

    export let card;
</script>

<style>
    article {
        /* position relative to absolute position the nested elements */
        position: relative;
        padding: 2rem;
        border-radius: 20px;
        width: 140px;
        height: 165px;
        /* include a perspective value on the individual card to have the rotation around the y axis occur relative to the center of the article */
        transition: transform 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        transform: perspective(800px) rotateY(0deg);
        transform-style: preserve-3d;
    }
    /* when the class of flip is applied, rotate the card on its back */
    .flip {
        transform: perspective(800px) rotateY(180deg);
    }
    /* when the class of pair is applied, animate the card to momentarily shake */
    .paired {
        animation: pair 0.25s 1s ease-in-out 2 alternate;
    }
    @keyframes pair {
        25% {
            transform: rotateZ(-5deg);
        }
        75% {
            transform: rotateZ(5deg);
        }
    }
    /* absolute position the nested elements to cover the entire surface of the article */
    .face,
    button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }
    /* remove the default background and border from the button */
    button {
        background: none;
        border: none;
    }
    /* for each face, set a default border and background
	the background is updated individually for the two faces
	*/
    .face {
        /* backface to hide the content as the card gets flipped */
        backface-visibility: hidden;
        border: 0.75rem solid hsl(340, 70%, 50%);
        background: hsl(0, 0%, 100%);
        /* remove the pointer events to have the click event registered on the button */
        pointer-events: none;
    }
    /* include a repeating pattern for the back */
    .back {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200"><defs><path id="a" d="M0-50L50 0 0 50-50 0z" stroke="none"/><g id="b"><use href="%23a" fill="hsl(340, 70%, 50%)"/><use href="%23a" transform="scale(.8)" fill="hsl(345, 90%, 65%)"/><use href="%23a" transform="scale(.6)" fill="hsl(0, 90%, 60%)"/><use href="%23a" transform="scale(.4)" fill="hsl(30, 80%, 70%)"/><use href="%23a" transform="scale(.2)" fill="hsl(50, 95%, 80%)"/></g></defs><use href="%23b"/><use href="%23b" x="100"/><use href="%23b" x="100" y="100"/><use href="%23b" y="100"/><use href="%23b" x="50" y="50"/></svg>'),
            hsl(0, 0%, 100%);
        background-size: 25%;
        transform: rotateY(180deg);
    }
    /* include svelte's logo in the front of the card */
    .front {
        background: url('data:image/svg+xml;utf8,<svg opacity="0.1" xmlns="http://www.w3.org/2000/svg" width="480" height="440" viewBox="0 0 240 220" stroke="hsl(340, 70%, 50%)" stroke-width="20" stroke-linejoin="round" stroke-linecap="round" fill="none"><g transform="translate(120 110) rotate(-35)"><path id="a" d="M50-22.5h-60 25a45 45 0 010 90h-75a45 45 0 010-90"/><use transform="scale(-1)" href="%23a"/></g></svg>'),
            hsl(0, 0%, 100%);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: 50% 50%;
        /* center the heading in the card */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h1 {
        font-size: 2.5rem;
        font-weight: 900;
    }
</style>

<!-- markup
    article, wrapping container
    div, front
    div, back
    button

the button is stretched to cover the size of the entire article, so to react to a click event on the entire surface
-->
<!-- include the flip and paired classes considering the state of the individual card -->
<article class:flip="{card.isFlipped && !card.isPaired}" class:paired="{card.isPaired}">
    <div class="face front">
        <h1 style="color: {(card.value.includes('♥') || card.value.includes('♦')) ? 'hsl(0, 70%, 50%)' : 'hsl(0, 50%, 5%)'}">
            {card.value}
        </h1>
    </div>
    <div class="face back"></div>
    <!-- disable the button as the card is paired -->
    <button disabled="{card.isPaired}" aria-label="Flip card" on:click="{flip}"></button>
</article>
