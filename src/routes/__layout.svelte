<script>
  import Header from '$lib/Header.svelte'

  import '../style/app.scss'
</script>

<Header />

<main>
  <slot />
</main>

<!-- This needs to be included like this, otherwise postcss doesn't handle it -->
<style lang="scss" src="../style/config.scss"></style>
