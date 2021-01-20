<style>
  :global(.ol-viewport) {
    flex: 1;
  }

  :global(.ol-overlaycontainer-stopevent) {
    display: none;
  }

  :global(.ol-zoom-in, .ol-zoom-out) {
    min-width: 40px;
    min-height: 40px;

    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>

<script>
  import { onMount } from 'svelte';

  import { Map, View, Feature, Geolocation } from 'ol';
  import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
  import Point from 'ol/geom/Point';
  import MultiLineString from 'ol/geom/MultiLineString';
  import LineString from 'ol/geom/LineString';
  import { XYZ, OSM, Vector as VectorSource } from 'ol/source';
  import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';

  import { savePosition } from '../state/tracks.svelte';

  export let track;
  export let recording;

  let map = null;
  let previousM = 0;
  let geolocation = null;

  const deltaMean = 250; // the geolocation sampling period mean in ms
  const positions = new LineString([], 'XYZM');

  const trackFeature = new Feature();
  const accuracyFeature = new Feature();
  const positionFeature = new Feature({
    style: {
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
    },
  });

  const view = new View({ center: [0, 0], zoom: 18, tilePixelRatio: 2 });
  const tileLayer = new TileLayer({ source: new OSM({ tilePixelRatio: 2 }) });
  const outdoorsLayer = new TileLayer({
    source: new XYZ({
      url:
        'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f22952a25e0249e8995aac2c056e0f1d',
      tilePixelRatio: 2,
    }),
  });

  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [accuracyFeature, positionFeature, trackFeature],
    }),
  });

  $: if (track) {
    const points = Object.values(track, ([x, y]) => [x, y]);
    const polygon = new MultiLineString([points]);
    trackFeature.setGeometry(polygon);
    trackFeature.setStyle(new Style({ stroke: new Stroke({ width: 4 }) }));
    view.fit(polygon, { padding: [10, 10, 10, 10] });
  }

  const mod = (n) => ((n % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  const getCorrectedHeading = (heading, prevHeading) => {
    let headingDiff = heading - mod(prevHeading);

    // force the rotation change to be less than 180°
    if (Math.abs(headingDiff) > Math.PI) {
      const sign = headingDiff >= 0 ? 1 : -1;
      headingDiff = -sign * (2 * Math.PI - Math.abs(headingDiff));
    }

    return prevHeading + headingDiff;
  };

  // recenters the view by putting the given coordinates at 3/4 from the top or
  // the screen
  const getCenterWithHeading = ([x, y], rotation, resolution) => {
    const [, height] = map.getSize();

    return [
      x - (Math.sin(rotation) * height * resolution * 1) / 4,
      y + (Math.cos(rotation) * height * resolution * 1) / 4,
    ];
  };

  const addPosition = (position, altitude, heading, speed, accuracy, m) => {
    const x = position[0];
    const y = position[1];
    const fCoords = positions.getCoordinates();
    const previous = fCoords[fCoords.length - 1];
    const prevHeading = previous && previous[2];

    const correctedHeading = !prevHeading
      ? heading
      : getCorrectedHeading(heading, prevHeading);

    positions.appendCoordinate([x, y, correctedHeading, m]);
    // only keep the 20 last coordinates
    positions.setCoordinates(positions.getCoordinates().slice(-20));

    if (recording) {
      const location = [...position, altitude, heading, speed, accuracy, m];
      console.log('saving:', location);
      savePosition(recording, location);
    }
  };

  const onChangePosition = () => {
    const speed = geolocation.getSpeed() || 0;
    const heading = geolocation.getHeading() || 0;
    const position = geolocation.getPosition();
    const altitude = geolocation.getAltitude();
    const accuracy = geolocation.getAccuracy();

    addPosition(position, altitude, heading, speed, accuracy, Date.now());
  };

  const onChangeAccuracyGeometry = () => {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  };

  const update = () => {
    const m = Math.max(Date.now() - deltaMean * 1.5, previousM);
    previousM = m;

    const resolution = view.getResolution();
    const coordinates = positions.getCoordinateAtM(m, true);

    if (!coordinates) return;

    positionFeature.setGeometry(new Point(coordinates));

    if (!track) {
      const [, , z] = coordinates;
      view.setRotation(-z);
      view.setCenter(getCenterWithHeading(coordinates, -z, resolution));
    }
  };

  onMount(() => {
    map = new Map({
      view,
      layers: [tileLayer, outdoorsLayer, vectorLayer],
      target: 'map',
    });

    geolocation = new Geolocation({
      projection: view.getProjection(),
      trackingOptions: { enableHighAccuracy: true },
    });

    geolocation.setTracking(true);
    geolocation.on('change:position', onChangePosition);
    geolocation.on('change:accuracyGeometry', onChangeAccuracyGeometry);
    tileLayer.on('prerender', update);
  });
</script>

<div id="map" class="map"></div>
