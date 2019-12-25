<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { tweened } from "svelte/motion";
  import { circInOut } from "svelte/easing";

  export let checked = false;
  $: dispatch("toggle", checked);

  const sabers = [0, 60, 120, 200, 300];
  const randomUpTo = max => Math.floor(Math.random() * max);
  const randomItem = arr => arr[randomUpTo(arr.length)];
  let hue = randomItem(sabers);

  const options = {
    duration: 500,
    easing: circInOut
  };
  let translateText = tweened(0, options);
  let offsetStroke = tweened(49, options);

  $: if (checked) {
    hue = randomItem(sabers);
    translateText.set(45);
    offsetStroke.set(0);
  } else {
    translateText.set(0);
    offsetStroke.set(49);
  }
</script>
<style>
  label {
    position: relative;
  }
  label input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  label input + svg {
    height: 25px;
    width: auto;
    display: block;
    filter: drop-shadow(4px 0 8px hsla(0, 0%, 100%, 0));
    transition: filter 0.25s ease-in-out;
  }

  label input + svg #bands {
    transition: opacity 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  label input:hover + svg,
  label input:focus + svg {
    filter: drop-shadow(4px 0 8px hsla(0, 0%, 100%, 0.5));
  }

  label input:hover + svg #bands,
  label input:focus + svg #bands {
    opacity: 1;
  }
</style>

<label>
  <input bind:checked aria-label="Scroll opening crawls" type="checkbox" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 98 6">
    <g transform="translate(12.25 0)" stroke-linecap="round" fill="none" stroke="hsl({hue}, 100%, 65%)" stroke-width="3.5">
      <path id="saber" d="M 0 0 h 48" stroke-dasharray="49" stroke-dashoffset="{$offsetStroke}" />
    </g>
    <g fill="hsl(0, 0%, 80%)" stroke="none">
      <path d="M 0 0 a 2.5 2.5 0 0 1 2.5 -2.5 h 13 v 5 h -13 a 2.5 2.5 0 0 1 -2.5 -2.5" />
    </g>
    <g id="bands" opacity="0.75" fill="hsl(0, 0%, 40%)" stroke="none">
      <g transform="translate(5 0)">
        <rect y="-3" width="4" height="1.5" rx="0.75" />
        <rect y="-0.75" width="4" height="1.5" rx="0.75" />
        <rect y="1.5" width="4" height="1.5" rx="0.75" />
      </g>
      <rect x="11" y="-3" width="2.5" height="6" rx="1.25" />
    </g>
    <g transform="translate(20 0)">
      <g id="text" transform="translate({$translateText} 0)">
        <text fill="hsl(0, 0%, 100%)" y="1.2" font-size="4" style="font-family: monospace; letter-spacing: 0.5px;">{checked ? 'Edit' : 'Show'} Crawl</text>
      </g>
    </g>
  </svg>
</label>
