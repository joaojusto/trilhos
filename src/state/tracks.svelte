<script context="module">
  import firebase from 'firebase';
  import { writable } from 'svelte/store';
  import { uid as userId } from './auth.svelte';
  import { v4 as uuidv4 } from 'uuid';

  let tracks = {};
  let tracksRef = null;
  const store = writable(tracks);
  store.subscribe((value) => (tracks = value));

  const onError = ({ code, message }) => {
    console.error(code, message);
  };

  export const subscribe = (cb) => {
    if (tracksRef) return store.subscribe(cb);

    tracksRef = firebase.database().ref(`tracks`);

    store.subscribe(cb);
    tracksRef.on('value', (snapshot) => store.set(snapshot.val()));
  };

  export const newTrack = () => {
    const trackId = uuidv4();
    firebase.database().ref(`tracks/${trackId}`).set([]).catch(onError);
    return trackId;
  };

  export const savePosition = (trackId, position) => {
    firebase.database().ref(`tracks/${trackId}`).push(position).catch(onError);
  };
</script>
