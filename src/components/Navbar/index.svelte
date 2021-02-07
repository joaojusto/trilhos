<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 16px 32px;

    background: #f5fafe;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.15);
  }
</style>

<script>
  import Cell from './Cell.svelte';

  export let routes, active, navigateTo;
</script>

<nav>
  {#each routes as { name, icon } (name)}
    <Cell
      name="{name}"
      icon="{icon}"
      active="{active === name}"
      on:click="{navigateTo(name)}" />
  {/each}
</nav>
