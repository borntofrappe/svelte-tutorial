<script>
  export let disabled = false;
</script>

<button {disabled}>
  Shift Bit >>
</button>

<style>
  button {
    letter-spacing: 1px;
    box-shadow: 0 0 0 2px currentColor;
    border: none;
    font-family: inherit;
    color: inherit;
    background: none;
    padding: 0.75rem 0.75rem;
    border-radius: 5px;
    font-size: 1rem;
    transition: box-shadow 0.2s ease-in-out;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    box-shadow: 0 0 0 3px;
  }

  button:not(:disabled):focus {
    outline: none;
    box-shadow: 0 0 0 3px, 0 0 0 6px hsl(0, 0%, 15%), 0 0 0 9px;
  }
</style>