<style>
  ul {
    display: flex;
    flex-direction: column;

    padding: 0;
    margin: 0;

    list-style: none;
  }

  li {
    padding: 0 32px;
    margin: 0;
  }

  div {
    display: flex;
    min-height: 100vh;
  }
</style>

<script>
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { writable } from 'svelte/store';

  import Activity from './Activity.svelte';
  import Track from './Track.svelte';
  import Map from './Map.svelte';

  export let tracks;

  const [send, receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  let selected = [];
  const selectedStore = writable(selected);
  selectedStore.subscribe((value) => (selected = value));

  const showTrack = (trackId) => () => {
    console.log('show track', trackId);
    selectedStore.set([tracks[trackId]]);
  };

  $: selectedTracks = Object.keys(tracks).filter(
    (trackId) => trackId === (selected[0] && selected[0].id)
  );
</script>

<!-- <li>
<Activity track="{tracks[id]}" id="{id}" on:click="{showTrack(id)}" />
</li> -->
<!-- <div
in:receive="{{ key: selected.id }}"
out:send="{{ key: selected.id }}" -->
<!-- animate:flip>{selected.id}</div> -->
<!-- <Map track="{selected}" recording="{false}" /> -->

<ul>
  selected:
  {#each selectedTracks as id (id)}
    <div in:receive="{{ key: id }}" out:send="{{ key: id }}" animate:flip>
      {id}
      <Map track="{tracks[id]}" recording="{false}" />
    </div>
  {/each}
</ul>
<ul>
  not selected:
  {#each Object.keys(tracks).filter((trackId) => trackId !== (selected[0] && selected[0].id)) as id (id)}
    <span in:receive="{{ key: id }}" out:send="{{ key: id }}" animate:flip>
      <Activity track="{tracks[id]}" id="{id}" on:click="{showTrack(id)}" />
    </span>
  {/each}
</ul>
