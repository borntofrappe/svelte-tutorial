<script>
  import Slider from "./lib/Slider.svelte";
  // import Quiz from "./lib/Quiz.svelte";
</script>

<div style:max-width="40rem">
  <Slider
    on:change={(e) => {
      console.log(e.detail.value);
    }}
  />
</div>
