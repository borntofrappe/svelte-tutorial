<script>
  // lifecycle to remove the interval and the subscription
  import { onDestroy } from 'svelte';
  // motion functions and easing function
  import { tweened, spring } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';

  // the idea is to have the first animation last up to 2 seconds
  const threshold = 2;
  // duration is updated as long as the button is pressed, up to threshold
  const duration = spring(0, {
    damping: 0.6,
    stiffness: 0.25,
  });

  // translation and rotation are set to take the value of duration and map it to the values specified in the SVG
  // translation being a value in the [0-15] range
  let translation;
  // rotation being a value in the [0-100] range
  let rotation;
  // as duration changes, update translation and duration
  const unsubscribe = duration.subscribe((d) => {
    translation = d * 7.5;
    rotation = d * 50;
  });

  // puck relates to the vertical translation of the puck
  // the ieda is to set the value to 2 and transition it to 0 as the mallet hits the tower
  let puck = tweened(2);
  // score relates to the vertical translation of the red bar
  // the idea is to set the value to 55 and transition it to 0 following the puck's own transition
  let score = tweened(55);

  // interval to update the duration at a constant rate
  let interval;

  // following the mousedown/keydown/touchstart event
  function handleCharge() {
    // reset the position of the puck and score
    puck.set(2, {
      duration: 150,
      delay: 0,
    });
    score.set(55, {
      duration: 150,
      delay: 0,
    });
    // at an interval update the duration
    interval = setInterval(() => {
      duration.update((d) => d + 0.01);
      // stop the interval as duration reaches the threshold
      if ($duration >= threshold) {
        duration.set(threshold);
        clearInterval(interval);
      }
    }, 10);
  }

  // following the mouseup/keyup/touchend event
  function handleRelease() {
    // set the puck to 0 following the mallet
    puck.set(0, {
      duration: 200,
      delay: 50,
    });
    // set the score up to 0 following the puck
    // map the difference between the threshold and duration to have the vertical translation relative to the "charge" of the mallet
    score.set(((threshold - $duration) / threshold) * 55, {
      duration: 1250,
      delay: 350,
      easing: expoOut,
    });
    // set duration to 0 to have the translation and rotation return the mallet to the original location
    $duration = 0;

    // clear the interval
    clearInterval(interval);
  }

  // clear the interval and remove the subscription as the component is destroyed
  onDestroy(() => {
    clearInterval(interval);
    unsubscribe();
  });
</script>

<!-- call the charge/release functions following the prescribed events
! for the keypress react only following the space bar **and** as long as the transition hasn't already begun
this because key events are cumulative and fire continuously as the key is held down
-->
<button
  on:mousedown={handleCharge}
  on:touchstart={handleCharge}
  on:keypress={(e) => {
    if (e.keyCode === 32 && $duration === 0) {
      handleCharge();
    }
  }}
  on:mouseup={handleRelease}
  on:touchend={handleRelease}
  on:keyup={handleRelease}
  aria-label="Strongman button"
  aria-describedby="description"
>
  <span hidden id="description"
    >Press the button to raise the hammer. Release it to check your feat of
    strength.</span
  >
  <svg viewBox="0 0 100 100" width="400" height="400">
    <defs>
      <!-- rectangle used for the bar and re-used in the clip -->
      <rect x="-3.25" y="0" width="6.5" height="55" rx="3.25" id="line" />
      <clipPath id="clip">
        <use href="#line" stroke-linecap="square" />
      </clipPath>
    </defs>
    <!-- tower -->
    <g transform="translate(25 90)">
      <path
        fill="hsl(0, 0%, 98%)"
        stroke="hsl(205, 21%, 70%)"
        stroke-width="2.5"
        d="M -12 0 v -70 a 12 12 0 0 1 24 0 v 70"
      />
      <g transform="translate(0 -70)">
        <use href="#line" fill="hsl(182, 82%, 62%)" />
        <g clip-path="url(#clip)">
          <!-- translate to the following
									transform="translate(0 0)"
									to completely show the red bar
							-->
          <g class="score" transform="translate(0 {$score})">
            <use href="#line" fill="hsl(358, 100%, 67%)" />
          </g>
        </g>
        <circle cx="0" cy="55" r="5" fill="hsl(358, 100%, 67%)" />
      </g>

      <rect x="-13.25" y="0" width="26.5" height="2" fill="hsl(0, 0%, 98%)" />
      <rect x="-13.25" y="0" width="2.5" height="2" fill="hsl(248, 51%, 18%)" />
      <rect x="10.75" y="0" width="2.5" height="2" fill="hsl(248, 51%, 18%)" />
      <rect x="-1.5" y="0" width="3" height="2" fill="hsl(248, 51%, 18%)" />
      <!-- translate to the following
							transform="translate(0 0)"
							to have the puck pushed down
					-->
      <g class="puck" transform="translate(0 -{$puck})">
        <rect
          x="-5.5"
          y="0"
          width="11"
          height="2.5"
          fill="hsl(358, 100%, 67%)"
        />
      </g>
      <g transform="translate(0 2)">
        <rect x="-18" y="0" width="36" height="3" fill="hsl(205, 21%, 70%)" />
      </g>

      <g transform="translate(0 5)">
        <rect
          x="-22"
          y="1.75"
          width="44"
          height="1.75"
          rx="0.75"
          opacity="0.3"
          fill="hsl(248, 51%, 18%)"
        />
        <rect x="-20" y="0" width="40" height="2.5" fill="hsl(248, 51%, 18%)" />
      </g>
    </g>

    <!-- hammer
					draw the hammer starting from the top of the puck
					translate and rotate the group to then distance the graphic
			-->
    <g transform="translate(25 86)">
      <!--
							! change the transform origin to have the translation/rotation occur from the center right (the bottom of the handle)
					-->
      <g opacity="1" transform="translate(36 -11.5)">
        <!-- translate and rotate to the following values
									transform="translate(15 0) rotate(100)"
									to have the hammer fully charged up
							-->
        <g
          class="hammer"
          transform="translate({translation} {-translation /
            3}) rotate({rotation})"
        >
          <g transform="translate(-36 11.5)">
            <rect
              x="8"
              y="-10.75"
              width="28"
              height="2.5"
              fill="hsl(0, 0%, 98%)"
            />
            <!-- increase the opacity of the shadow for the focus state (to provide an alternative to the outline) -->
            <rect
              class="handle"
              opacity="0.7"
              x="8"
              y="-10.75"
              width="4"
              height="2.5"
              fill="hsl(248, 51%, 18%)"
            />
            <!-- increase the opacity of the handle (always for the focus state) -->
            <rect
              class="handle"
              opacity="0.5"
              x="26"
              y="-10.75"
              width="10"
              height="2.5"
              fill="hsl(358, 100%, 67%)"
            />
            <rect
              id="stripe-red"
              x="-7.5"
              y="0"
              width="15"
              height="2.5"
              fill="hsl(358, 100%, 67%)"
            />
            <rect
              id="stripe-white"
              x="-9"
              y="-2.5"
              width="18"
              height="2.5"
              fill="hsl(0, 0%, 98%)"
            />
            <rect
              x="-8"
              y="-16.5"
              width="16"
              height="14"
              fill="hsl(248, 51%, 18%)"
            />
            <use href="#stripe-white" transform="translate(0 -16.5)" />
            <use href="#stripe-red" transform="translate(0 -21.5)" />
          </g>
        </g>
      </g>

      <!-- show the shadow by increasing its scale (always for the focus state) -->
      <g transform="translate(31 12)">
        <g transform="translate({translation * 1.2} 0)">
          <rect
            class="shadow"
            x="-6"
            y="-1.5"
            width="12"
            height="1.5"
            rx="1"
            opacity="0.6"
            transform="scale(0 0.8)"
            fill="hsl(248, 51%, 18%)"
          />
        </g>
      </g>
    </g>
  </svg>
</button>

<style>
  /* remove the default styles for the button */
  button {
    background: none;
    border: none;
    /* ! the outline is replaced by the graphics in the svg  */
    outline: none;
  }
  /* when the button is focused increase the opacity of the handle and show the shadow beneath the mallet */
  button svg .handle {
    transition: opacity 0.5s ease-in;
  }
  button:focus svg .handle {
    opacity: 1;
  }
  button svg .shadow {
    transition: transform 0.5s ease-in;
  }
  button:focus svg .shadow {
    transform: scale(1);
  }

  /* size the svg to occupy a sizeable portion of the viewport */
  svg {
    display: block;
    max-width: 450px;
    width: 90vw;
    height: auto;
  }
</style>
