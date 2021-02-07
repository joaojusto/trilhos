<style>
  button {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    margin: 0;
    padding: 0;
    border: none;
    background: none;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #243556;

    cursor: pointer;
  }

  button.active {
    color: #0c090d;
  }

  :global(button.active path) {
    stroke: #0c090d;
  }

  :global(nav svg) {
    max-height: 32px;
    margin-bottom: 8px;
  }
</style>

<script>
  export let name,
    icon,
    active = null;
</script>

<button class:active on:click>
  {name}
  <svelte:component this="{icon}" />
</button>
