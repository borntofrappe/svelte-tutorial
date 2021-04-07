<script>
  // import the function creating the deck and the components describing the application
  import { stackDeck } from './utils.js';
  import Card from './Card.svelte';
  import Victory from './Victory.svelte';

  // build a deck of an arbitrary number of cards
  const cards = 16;
  let deck = stackDeck(cards);

  // variable describing a victory
  let victory;

  // function following a flip event from the card component
  function handleFlip(e) {
    // retrieve the card from the detail property
    const selection = e.detail;
    // retrieve the index of the selected card
    // ! it is necessary to mutate the deck array to have the component update
    const index = deck.findIndex(({ id }) => id === selection.id);
    // flip the card
    deck[index].isFlipped = !deck[index].isFlipped;

    // filter the cards which are face up and not already paired
    const flipped = deck.filter(
      ({ isFlipped, isPaired }) => !isFlipped && !isPaired
    );

    // if there are already two cards (on top of the one being flipped), flip every card on its back
    if (flipped.length > 2) {
      deck.forEach((card) => {
        // ! exclude the current card
        if (card.id !== selection.id) {
          card.isFlipped = true;
        }
      });
    } else if (flipped.length === 2) {
      // if there are two face-up && unpaired cards, compare their values
      const [cardA, cardB] = flipped;
      const indexA = deck.findIndex(({ id }) => id === cardA.id);
      const indexB = deck.findIndex(({ id }) => id === cardB.id);
      // if the values match toggle isPaired to true
      if (cardA.value === cardB.value) {
        deck[indexA].isPaired = true;
        deck[indexB].isPaired = true;
      }
    }

    // a victory is summarised by every card being paired
    victory = deck.every((card) => card.isPaired);
  }

  // function following a reset event from the victory component
  // hide the victory component by resetting victory to a falsy value
  // re-stack the deck with a new set of cards
  function handleReset() {
    victory = null;
    deck = stackDeck(cards);
  }
</script>

<!-- show the victory component conditional to the matching variable being truthy -->
{#if victory}
  <Victory on:reset={handleReset} />
{/if}

<!-- include a card component for each item of the deck array -->
<main>
  {#each deck as card (card.id)}
    <Card on:flip={handleFlip} {card} />
  {/each}
</main>

<style>
  /* display the cards in a grid */
  main {
    margin: 1rem auto;
    width: 90vw;
    max-width: 700px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 140px);
    grid-auto-rows: max-content;
    grid-gap: 1rem;
    justify-content: center;
  }
</style>
