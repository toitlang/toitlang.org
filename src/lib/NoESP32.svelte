<script>
  import PrimaryActions from '$lib/PrimaryActions.svelte'
</script>

<div class="intro">
  <h1>No ESP32?</h1>

  <p>
    The Toit language can also be used on the desktop. In fact, we use it to develop many of the
    tools that come with the SDK.
  </p>
</div>

<PrimaryActions />

<style lang="postcss">
  .intro {
    text-align: center;
    & p {
      margin: 3rem auto;
      font-size: 1.125em;
      max-width: 30em;
    }
  }
</style>
