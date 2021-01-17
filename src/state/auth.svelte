<script context="module">
  import firebase from 'firebase';
  import { writable } from 'svelte/store';

  let user = null;
  const userStore = writable(user);
  userStore.subscribe((value) => {
    user = value;
  });

  const SETTINGS = {
    projectId: 'trilhos-2d2ef',
    measurementId: 'G-EN5WT801KX',
    messagingSenderId: '457658473177',
    storageBucket: 'trilhos-2d2ef.appspot.com',
    databaseURL:
      'https://trilhos-2d2ef-default-rtdb.europe-west1.firebasedatabase.app/',
    authDomain: 'trilhos-2d2ef.firebaseapp.com',
    apiKey: 'AIzaSyD-SYWfNzMuLdMS4ITKrXyVkk32MDGNKU8',
    appId: '1:457658473177:web:e6b1cf14d16ebab90bbcc8',
  };

  const onError = ({ code, message }) => {
    console.error(code, message);
  };

  const onAuthStateChanged = (user) => {
    user ? console.log('user:', user.email) : console.log('Not signed in :(');

    userStore.set(user);
  };

  export const isSignedIn = () => !!!user;

  export const signIn = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(onAuthStateChanged)
      .catch(onError);
  };

  export const signOut = () => {
    firebase.auth().signOut().then(onAuthStateChanged).catch(onError);
  };

  export const signUp = ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(onAuthStateChanged)
      .catch(onError);
  };

  export const uid = () => user.uid;

  export const initialize = () => {
    firebase.initializeApp(SETTINGS);
    firebase.analytics();
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  };
</script>
