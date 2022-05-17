<header>
  <div class="visually-hidden">
    <h1>Stopwatch</h1>
    <p>Track time, mark laps.</p>
  </div>
  <svg viewBox="-50 -50 100 100" width="48" height="48">
    <defs>
      <circle id="stopwatch-circle" r="32" />
      <mask id="stopwatch-mask-circle">
        <use href="#stopwatch-circle" fill="white" />
        <g fill="none" stroke="black" stroke-width="8" stroke-linecap="round">
          <path d="M 0 -3 v -10" />
        </g>
      </mask>
    </defs>
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="8"
      stroke-linecap="round"
    >
      <path d="M -7 -38 h 14" />
    </g>
    <use
      href="#stopwatch-circle"
      fill="currentColor"
      mask="url(#stopwatch-mask-circle)"
    />
  </svg>
</header>
