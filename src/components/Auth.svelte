<script>
  import { writable } from 'svelte/store';

  import { signIn, signUp } from '../state/auth.svelte';

  let state = {};
  const store = writable(state);
  store.subscribe((value) => (state = value));

  const onSubmit = (event) => event.preventDefault();

  const onChange = (event) => {
    const { name, value } = event.target;
    store.set({ ...state, [name]: value });
  };
</script>

<form on:submit="{onSubmit}" on:change="{onChange}">
  <label for="email">Email</label>
  <input type="email" name="email" placeholder="Email" />
  <label for="password">Password</label>
  <input type="password" name="password" />
  <div>
    <button type="button" on:click="{() => signIn(state)}">Sign In</button>
    <button type="button" on:click="{() => signUp(state)}">Sign Up</button>
  </div>
</form>
