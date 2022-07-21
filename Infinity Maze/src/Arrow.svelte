<script>
  export let rotation = 0;
</script>

<svg aria-hidden="true" viewBox="0 0 100 100" width="50" height="50">
  <g transform="translate(50 50)">
    <g transform="rotate({rotation})">
      <g transform="translate(-50 -50)">
        <g fill="currentColor" stroke="currentColor">
          <path
            d="M 0 86 100 86 100 68 87.5 68 87.5 50 75 50 75 32 62.5 32 62.5 14 37.5 14 37.5 32 25 32 25 50 12.5 50 12.5 68 0 68 0 86"
          />
        </g>
      </g>
    </g>
  </g>
</svg>
