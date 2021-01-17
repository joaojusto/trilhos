<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    padding: 0;
    margin: 0 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  import Map from './components/Map.svelte';
  import Auth from './components/Auth.svelte';
  import { initialize, isSignedIn } from './state/auth.svelte';
  import { subscribe, newTrack } from './state/tracks.svelte';

  let tracks = {};
  let recording = false;
  const store = writable(recording);
  store.subscribe((value) => (recording = value));

  const start = () => store.set(newTrack());

  const stop = () => store.set(null);

  const onTracks = (value) => (tracks = value);

  onMount(() => {
    initialize();
    subscribe(onTracks);
  });
</script>

<main>
  <section>
    {#if isSignedIn()}
      {#if recording}
        <button on:click="{stop}">Stop</button>
      {:else}
        <button on:click="{start}">New</button>
      {/if}

      <div>
        {#each Object.keys(tracks) as trackId}
          <p>{trackId}</p>
        {/each}
      </div>
      <Map recording="{recording}" />
    {:else}
      <Auth />
    {/if}
  </section>
</main>
