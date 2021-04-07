<script>
  import Defs from './Defs.svelte';
  import Input from './Input.svelte';
  import Spreadsheet from './Spreadsheet.svelte';
  import Chart from './Chart.svelte';

  // data refers to an array in which to describe the words and their frequency
  let data = [];
  // highlightData is meant to describe the `x` most frequent words, as well as a catch-call category for every other value
  const highlightThreshold = 7;
  $: highlightData =
    data.length > highlightThreshold - 1
      ? [
          ...data.slice(0, highlightThreshold - 1),
          {
            word: '...',
            frequency: data
              .slice(highlightThreshold - 1)
              .reduce((acc, curr) => acc + curr.frequency, 0),
          },
        ]
      : data;

  // following the update event update the data with the value received in the detail property
  function update(event) {
    data = event.detail;
  }
</script>

<!-- svg defs block, injecting the symbols later used in the project -->
<Defs />
<div class="container">
  <!-- input component, featuring the textarea and controls' buttons -->
  <Input on:update={update} />

  <!-- assuming data describes a series of words and their absolute frequency
	the conditional allow to transition the components in and out of the page
	-->
  {#if data.length > 0}
    <!-- spreadsheet component, highlighting the data in a table element -->
    <Spreadsheet data={highlightData} />
    <!-- chart component, highlighting the data through a visualization -->
    <Chart data={highlightData} />
  {/if}
</div>
