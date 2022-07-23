<script>
  import DelayedCountdown from "./lib/DelayedCountdown.svelte";

  const handleEnd = () => {
    console.log("Countdown timer is over");
  };
</script>

<DelayedCountdown delay={5} countdown={10} on:end={handleEnd} />
