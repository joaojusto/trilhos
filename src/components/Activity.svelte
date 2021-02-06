<style>
  button {
    flex: 1;
    display: flex;
    min-width: 100%;
    min-height: 150px;

    padding: 24px;

    cursor: pointer;
    text-decoration: none;

    border-radius: 10px;
    background: none;
  }

  .map {
    display: flex;
    flex-direction: column;
    flex: 1;

    pointer-events: none;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { Map, View, Feature } from 'ol';
  import { Stroke, Style } from 'ol/style';
  import { Vector as VectorLayer } from 'ol/layer';
  import { Vector as VectorSource } from 'ol/source';
  import MultiLineString from 'ol/geom/MultiLineString';

  let map;
  let size;
  export let id;
  export let track;

  const view = new View({ center: [0, 0], zoom: 18, tilePixelRatio: 2 });
  const trackFeature = new Feature();
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [trackFeature],
    }),
  });

  $: points = track.points.map(([x, y]) => [x, y]);
  $: geometry = new MultiLineString([points]);
  $: trackFeature.setGeometry(geometry);
  $: trackFeature.setStyle(new Style({ stroke: new Stroke({ width: 4 }) }));
  $: view.fit(geometry, { padding: [10, 10, 10, 10] });

  onMount(() => {
    map = new Map({
      view,
      layers: [vectorLayer],
      target: id,
    });

    $: size = geometry
      .getLineStrings()
      .reduce((size, line) => size + line.getLength(), 0);
  });
</script>

<button on:click>
  <div id="{id}" class="map">{size}m</div>
</button>
