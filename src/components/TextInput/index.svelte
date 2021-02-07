<style>
  input {
    border: 1px solid #9e9d9e;
    box-sizing: border-box;
    border-radius: 5px;

    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #f5fafe;

    padding: 16px;

    background: none;
    outline: none;
  }

  input:blank {
    color: #9e9d9e;
  }

  input:invalid {
    border-color: #ff5154;
  }

  .error {
    margin-top: 4px;

    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    text-align: right;

    color: #ff5154;
  }
</style>

<script>
  export let error;
  export let type = 'text';
  export let value = '',
    placeholder = '';
</script>

<input type="{type}" value="{value}" placeholder="{placeholder}" on:change />
{#if error}
  <p class="error">{error}</p>
{/if}
