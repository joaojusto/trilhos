<style>
button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 48px;

  color: #F5FAFE;
  background: #004FFF;

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  border: 2px solid #004FFF;
  box-sizing: border-box;
  border-radius: 110px;
  cursor: pointer;
}

button:disabled {
  color: rgba(245, 250, 254, 0.3);
}

</style>

<script>
  export let disabled=false;

</script>

<button {disabled} on:click>
  <slot>Example</slot>
</button>
