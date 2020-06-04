<script>
  export let type = "submit";
  export let href = "";
  export let classes = "button";
  export let color = null;
  export let disabled = false;
</script>

{#if href}
  <a {href}>
    <slot />
  </a>
{:else}
  <!-- on:click is shorthand for event delegation -->
  <button {type} class="{classes} {color}" on:click {disabled}>
    <slot />
  </button>
{/if}
