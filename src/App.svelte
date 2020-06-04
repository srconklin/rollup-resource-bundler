<script>
  import Button from "./UI/Button.svelte";

  let clicked = 0;
</script>

<style>
  .grayed {
    opacity: 0.7;
  }
</style>

<section class="section">
  <Button classes="button is-primary is-inverted" on:click={() => clicked++}>
    <i class="fas fa-thumbs-up" />
    &nbsp; Click Me
  </Button>

  <p class="is-size-6 has-text-grey-darker">
    {#if clicked}
      You've clicked the button {clicked} time{clicked === 1 ? '' : 's'}.
    {:else}
      <span class="grayed">You haven't clicked the button.</span>
    {/if}
  </p>
</section>
