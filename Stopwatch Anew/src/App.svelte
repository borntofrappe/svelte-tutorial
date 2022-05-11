<script>
  import { stopwatch } from "./stores.js";
</script>

<p>
  Current timing:
  {$stopwatch}
</p>

<button
  on:click={() => {
    stopwatch.start();
  }}
>
  Start
</button>

<button
  on:click={() => {
    stopwatch.pause();
  }}
>
  Pause
</button>

<button
  on:click={() => {
    stopwatch.stop();
  }}
>
  Stop
</button>
