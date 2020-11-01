<script>
  export let digit;
</script>

<label>
  <span class="visually-hidden">2 to the power of {digit}</span>
  <input type="checkbox" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-22.5 -37.5 45 52" width="1rem" height="1rem">
    <g>
      <circle fill="hsl(45, 90%, 55%)" stroke="hsl(0, 0%, 70%)" stroke-width="1" cy="-15" r="15" />
      <path fill="none" stroke="hsl(0, 0%, 100%)" stroke-width="0.5" d="M -2 0 v -12 a 3 3 0 0 0 -6 0 3 3 0 0 0 3 3 h 9 a 3 3 0 0 0 3 -3 3 3 0 0 0 -6 0 v 12" />
    </g>
    <g fill="hsl(0, 0%, 70%)" stroke="hsl(0, 0%, 60%)" stroke-width="1">
      <circle cy="9" r="5" />
      <rect x="-7" width="14" height="5" rx="2.5" />
      <rect x="-7" width="14" y="5" height="5" rx="2.5" />
    </g>
  </svg>
</label>

<style>
  label {
    display: inline-flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
  }

  label > * + * {
    margin-bottom: 0.75rem;
  }

  label svg {
    width: 7rem;
    height: 7rem;
    filter: grayscale(1);
  }

  label input:checked + svg {
    filter: grayscale(0);
  }
</style>