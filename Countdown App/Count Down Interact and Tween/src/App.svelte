<script>
  import Input from './Input.svelte';
  import Output from './Output.svelte';

  let countdown;
</script>

{#if countdown}
  <Output
    {countdown}
    on:back={() => {
      countdown = null;
    }}
  />
{:else}
  <Input on:submit={(e) => (countdown = e.detail)} />
{/if}
