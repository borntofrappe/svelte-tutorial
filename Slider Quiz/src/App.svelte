<script>
  import Slider from "./lib/Slider.svelte";
  import Quiz from "./lib/Quiz.svelte";
</script>

<!-- <div style:max-width="40rem">
  <Slider
    on:change={(e) => {
      console.log(e.detail.value);
    }}
  />
</div> -->

<Quiz
  title="Drinking"
  question="How many liters of tap water drinks a person per day?"
  answer={1.5}
  details="1.5 liters of tap water are devoted to drinking in a day."
/>
