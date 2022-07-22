<script>
  import Countdown from "./Countdown.svelte";
  import Timer from "./Timer.svelte";

  export let countdown = 5;
  export let timer = 20;
</script>

<!-- <Countdown time={countdown} /> -->
<Timer time={timer} />
