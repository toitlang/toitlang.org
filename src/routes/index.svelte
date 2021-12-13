<script>
  import Hero from '$lib/Hero.svelte'
  import LatestNews from '$lib/LatestNews.svelte'
  import PrimaryActions from '$lib/PrimaryActions.svelte'
</script>

<section class="hero">
  <Hero />
</section>

<section>
  <PrimaryActions />
</section>

<section>
  <LatestNews />
</section>

<style lang="postcss">
  section.hero {
    color: white;
    padding-top: var(--header-height);
    background: black url('./images/illustrations/esp32.svg') no-repeat center;
  }
</style>
