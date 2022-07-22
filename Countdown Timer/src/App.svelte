<script>
  import CountdownTimer from "./lib/CountdownTimer.svelte";

  const handleEnd = () => {
    console.log("Countdown timer is over");
  };
</script>

<CountdownTimer countdown={5} timer={10} on:end={handleEnd} />
