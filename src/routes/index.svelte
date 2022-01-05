<script lang="ts">
  import Articles from '$lib/Articles.svelte'
  import Hero from '$lib/Hero.svelte'
  import Jaguar from '$lib/Jaguar.svelte'
  import LatestNews from '$lib/LatestNews.svelte'
  import PrimaryActions from '$lib/PrimaryActions.svelte'
</script>

<svelte:head>
  <title>Toit programming language</title>
  <meta
    name="description"
    content="Toit is a modern high-level language designed specifically for microcontrollers"
  />
  <meta
    name="keywords"
    content="toit programming language iot microcontrollers live reloading hot reloading"
  />
</svelte:head>

<section class="hero">
  <Hero />
</section>

<section>
  <PrimaryActions />
</section>

<section>
  <Jaguar />
</section>

<section>
  <div class="news-and-articles">
    <div class="news">
      <div class="news-container">
        <LatestNews />
      </div>
    </div>
    <div class="articles"><Articles /></div>
  </div>
</section>

<style lang="postcss">
  section.hero {
    color: white;
    padding-top: var(--header-height);
    background: black url('/images/illustrations/esp32.svg') no-repeat center 20%;
  }
  .news-and-articles {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3rem;
    & .news {
      flex: 1;
      min-width: 18rem;
      & .news-container {
        max-width: 22rem;
      }
    }
    & .articles {
      flex: 1;
      min-width: 18rem;
    }
  }
</style>
