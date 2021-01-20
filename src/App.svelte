<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    height: 100%;
    padding: 0;
    margin: 0 0;
    background: #f5fafe;
  }

  a {
    cursor: pointer;
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
  import Layout from './components/Layout.svelte';
  import {
    initialize,
    subscribe as onUserChange,
    signOut,
  } from './state/auth.svelte';
  import { subscribe as onTracksChange, newTrack } from './state/tracks.svelte';

  let recording = false;
  const store = writable(recording);
  store.subscribe((value) => (recording = value));

  let isSignedIn = false;
  onUserChange((value) => (isSignedIn = !!value));

  let tracks = {};
  const onTracks = (value) => (tracks = value);

  let selected = null;
  const selectedStore = writable(selected);
  selectedStore.subscribe((value) => (selected = value));

  const start = () => {
    const id = newTrack();
    store.set(id);
    selectedStore.set(null);
  };

  const stop = () => store.set(null);

  const showTrack = (trackId) => selectedStore.set(tracks[trackId]);

  onMount(() => {
    initialize();
    onTracksChange(onTracks);
  });
</script>

<main>
  <Layout>
    {#if isSignedIn}
      <!-- {#if recording}
        <button on:click="{stop}">Stop</button>
      {:else}
        <button>New</button>
      {/if} -->
      <!-- <button on:click="{signOut}">Sign Out</button> -->

      <div>
        {#each Object.keys(tracks) as trackId}
          <ul>
            <li><a on:click="{() => showTrack(trackId)}">{trackId}</a></li>
          </ul>
        {/each}
      </div>
      <!-- <Map recording="{recording}" track="{selected}" /> -->
    {:else}
      <Auth />
    {/if}
  </Layout>
</main>
