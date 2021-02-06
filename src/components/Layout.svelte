<style>
  .root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .header {
    display: flex;
    justify-content: space-between;
    max-height: 48px;
    margin: 0 0 42px 0;
    padding: 44px 32px 0;
  }

  :global(.header svg) {
    max-width: 40px;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    background: #f5fafe;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.15);
  }

  .nav button {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  :global(.nav svg) {
    max-height: 32px;
    margin-bottom: 8px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
  }
</style>

<script>
  import * as Icons from './Icon/index.svelte';
</script>

<div class="root">
  <nav class="header">
    <slot name="header">
      <Icons.Start />
      <Icons.Bell />
    </slot>
  </nav>

  <section class="content">
    <slot />
  </section>

  <nav class="nav">
    <button>Home <Icons.Home /></button>
    <button>Search <Icons.Search /></button>
    <button on:click="{() => console.log('start')}"
      >Start <Icons.Start /></button>
    <button>Routes <Icons.Tracks /></button>
    <button>Profile</button>
  </nav>
</div>
