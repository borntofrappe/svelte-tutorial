<script>
  // initialize a variable to keep track of the counter
  let count = 0;
  // reactive variable representing the string version of the counter
  // the idea is to use each character of the string to include a <use> element with the matching number
  $: digits = count.toString();
</script>

<svg viewBox="0 0 100 60">
  <defs>
    <path id="0" d="M -6 -15 h 12 v 30 h -12 z" />
    <path id="1" d="M -2 -15 h 5 v 30 m -5 0 h 8" />
    <path id="2" d="M -6 -15 h 12 v 15 h -12 v 15 h 12" />
    <path id="3" d="M -6 -15 h 12 v 30 h -12 m 0 -15 h 12" />
    <path id="4" d="M -6 -15 v 15 h 12 m -3 -15 v 30" />
    <!-- :p -->
    <g id="5"><use href="#2" transform="scale(-1 1)" /></g>
    <path id="6" d="M 6 -15 h -12 v 30 h 12 v -15 h -12" />
    <path id="7" d="M -6 -15 h 12 v 30" />
    <path id="8" d="M -6 -15 h 12 v 30 h -12 z m 0 15 h 12" />
    <path id="9" d="M 6 15 v -30 h -12 v 15 h 12" />
    <path id="add" d="M -40 0 h 80 m -40 -40 v 80" />
  </defs>
  <g transform="translate(0 30)">
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="square"
      stroke-linejoin="square"
    >
      <g stroke-width="3" opacity="0.5">
        <path d="M 27 -14 h 46 l 5 5 v 18 l -5 5 h -46 l -5 -5 v -18 z" />
      </g>
      <g stroke-width="5">
        <!-- use each character of the digits string to create a <use> element with the matching number
                ! be sure to display the numbers right to left, and at the following intervals
                32 44 56 68
                -->
        {#each digits as letter, index}
          <g
            transform="translate({68 -
              (digits.length - 1) * 12 +
              index * 12} 0) scale(0.5)"
          >
            <use href="#{letter}" />
          </g>
        {/each}
      </g>
    </g>
  </g>
</svg>
<!-- increase the counter variable up to four digits -->
<button
  aria-label="Increment counter"
  on:click={() => (count = Math.min(count + 1, 9999))}
>
  <svg viewBox="0 0 100 100" width="35" height="35">
    <g transform="translate(50 50)">
      <g fill="none" stroke="currentColor" stroke-width="20">
        <use href="#add" />
      </g>
    </g>
  </svg>
</button>

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
    content: '';
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
    content: '';
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
