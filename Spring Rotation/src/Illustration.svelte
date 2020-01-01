<script>
  import { telephoneCheck } from "./utils.js";

  export let phone;
</script>

<style>
  svg {
    padding: 1rem;
    display: block;
    width: 100%;
    height: auto;
  }
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 65" width="110" height="65">
  {#if telephoneCheck(phone)}
  <rect id="line--half" x="55" width="55" height="5" fill="currentColor" />
  <use href="#line--half" y="10" />
  <use href="#line--half" y="20" />
  <use href="#line--half" y="30" />
  <rect id="line" y="40" width="110" height="5" fill="currentColor" />
  <use href="#line" y="10" />
  <use href="#line" y="20" />
  <g id="stars">
    <path id="star" transform="translate(10 10)" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" d="M 0 -5 L 3.25 5 -5 -1.25 5 -1.25 -3.25 5z" />
    <use href="#star" x="17.5" />
    <use href="#star" x="35" />
  </g>
  <use href="#stars" y="20" />
  <use href="#star" x="26.25" y="10" />
  <use href="#star" x="8.75" y="10" />
  {:else}
  <path id="corner" d="M 1 1 h 12 v 2 a 10 10 0 0 0 -10 10 h -2 z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <use href="#corner" transform="translate(110 0) rotate(90)" />
  <use href="#corner" transform="translate(0 65) rotate(-90)" />
  <use href="#corner" transform="translate(110 65) rotate(-180)" />
  <g>
    <g transform="translate(37.5 20)">
      <circle r="12" fill="currentColor" />
      <path d="M -17 32.5 v -5 c 8 -7 26 -7 34 0 v 5 z" fill="currentColor" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <g transform="translate(82.5 12.5)">
      <path d="M 0 0 a 22 22 0 0 0 0 40 l 5 -6 -3 -4 h -6 a 16 16 0 0 1 0 -20 h 6 l 3 -4 -5 -6" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </g>
  {/if}
</svg>
