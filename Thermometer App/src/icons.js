module.exports = {
    sun: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
        <rect id="sun--square" x="-35.35" y="-35.35" width="70.7" height="70.7" />
    </defs>
    <g transform="translate(50 50)">
        <use href="#sun--square" />
        <g transform="rotate(45)">
            <use href="#sun--square" />
        </g>
    </g>
</svg>`,
    moon: `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <circle id="moon--circle" r="45" />
      <mask id="moon--mask">
        <use href="#moon--circle" fill="hsl(0, 0%, 100%)" />
        <use
          transform="translate(35 -35)"
          href="#moon--circle"
          fill="hsl(0, 0%, 0%)"
        />
      </mask>
    </defs>
    <g transform="translate(50 50)">
      <g mask="url(#moon--mask)">
        <use href="#moon--circle" />
      </g>
    </g>
  </svg>`
};