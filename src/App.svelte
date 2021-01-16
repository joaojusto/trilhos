<style>
  main {
    text-align: center;
    padding: 0;
    max-width: 240px;
    margin: 0 auto;
  }

  div {
    min-height: 50vh;
  }

  :global(.ol-viewport) {
    min-height: 50vh;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<script>
  import { onMount } from 'svelte';

  import { Map, View, Feature, Geolocation } from 'ol';
  import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
  import Point from 'ol/geom/Point';
  import { OSM, Vector as VectorSource } from 'ol/source';
  import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';

  let map = null;
  let geolocation = null;
  const view = new View({
    center: [0, 0],
    zoom: 2,
  });

  onMount(() => {
    map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: document.getElementById('map'),
      view: view,
    });

    geolocation = new Geolocation({
      trackingOptions: { enableHighAccuracy: true },
      projection: view.getProjection(),
    });

    geolocation.setTracking(true);

    geolocation.on('change:position', function () {
      var coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    });

    let positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );

    var accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });
  });
</script>

<main>
  <div id="map" class="map"></div>
</main>
