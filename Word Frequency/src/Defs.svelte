<!-- ùù icons used throughout the project, in the corner of each meaningful container -->
<svg style="display: none;" viewBox="0 0 100 100" width="40" height="40">
  <!-- ! each symbol has its own viewbox
    moreover, each symbol uses a variation of the blue chosen for the application
    -->
  <symbol id="keyboard" viewBox="0 0 100 60">
    <rect
      x="0"
      y="0"
      width="100"
      height="60"
      rx="5"
      fill="hsl(210, 90%, 75%)"
    />
    <g id="keys">
      <rect
        id="key"
        x="14"
        y="10"
        width="12"
        height="10"
        rx="2"
        fill="hsl(210, 90%, 60%)"
      />
      <use href="#key" transform="translate(20 0)" />
      <use href="#key" transform="translate(40 0)" />
      <use href="#key" transform="translate(60 0)" />
    </g>
    <use href="#keys" transform="translate(0 15)" />
    <use href="#keys" transform="translate(0 30)" />
    <rect
      transform="translate(34 30)"
      x="0"
      y="10"
      width="32"
      height="10"
      rx="2"
      fill="hsl(210, 90%, 60%)"
    />
  </symbol>
  <symbol id="table" viewBox="0 0 90 100">
    <rect
      x="0"
      y="0"
      width="90"
      height="100"
      rx="5"
      fill="hsl(210, 90%, 75%)"
    />
    <rect
      id="row"
      x="15"
      y="19.5"
      width="60"
      height="6"
      fill="hsl(210, 90%, 60%)"
    />
    <use id="tone" href="#row" transform="translate(0 20)" opacity="0.7" />
    <!-- apparently it is possible to use another <use> element -->
    <use href="#row" transform="translate(0 40)" />
    <use href="#tone" transform="translate(0 40)" />
  </symbol>

  <symbol id="chart" viewBox="0 0 100 100">
    <rect
      x="0"
      y="0"
      width="100"
      height="100"
      rx="5"
      fill="hsl(210, 90%, 75%)"
    />
    <g fill="hsl(210, 90%, 60%)">
      <rect x="20" y="15" width="60" height="12" rx="2" />
      <rect x="20" y="41.5" width="30" height="12" rx="2" />
      <rect x="20" y="68" width="20" height="12" rx="2" />
      <circle cx="66" cy="66" r="14" />
    </g>
  </symbol>
</svg>
