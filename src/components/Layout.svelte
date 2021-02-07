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
</style>

<script>
  import { writable } from 'svelte/store';

  import * as Icons from './Icon/index.svelte';
  import Navbar from './Navbar/index.svelte';

  const ROUTES = [
    { name: 'Home', component: null, icon: Icons.Home },
    { name: 'Search', component: null, icon: Icons.Search },
    { name: 'Start', component: null, icon: Icons.Start },
    { name: 'Routes', component: null, icon: Icons.Tracks },
    { name: 'Profile', component: null, icon: null },
  ];

  let active = ROUTES[0].name;
  const activeRouteStore = writable(active);
  activeRouteStore.subscribe((value) => (active = value));

  const navigateTo = (routeName) => () => activeRouteStore.set(routeName);
  $: console.log(active);
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

  <Navbar routes="{ROUTES}" active="{active}" navigateTo="{navigateTo}" />
</div>
