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

<Quiz />

<Quiz
  title="A taste for precision"
  question="If you were to limit PI to 4 digits after the decimal point, what number would you find?"
  answer={parseFloat(Math.PI.toFixed(4))}
  details="{Math.PI.toFixed(
    4
  )}, precise enough? If you were to ask JavaScript for the full answer, by happenstance, you'd find {Math.PI}."
  min={3.14}
  max={3.1499}
  value={3.14}
  precision={4}
/>
