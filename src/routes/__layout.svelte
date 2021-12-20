<script>
  import CookieConsent from '$lib/CookieConsent.svelte'
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '../style/app.css'
</script>

<Header />

<main>
  <slot />
</main>

<footer>
  <Footer />
</footer>

<CookieConsent />

<style lang="postcss">
  main {
    background: url('/images/illustrations/symbols.svg') no-repeat -3rem bottom;
  }
  main > :global(section),
  footer {
    padding: var(--content-vertical-padding) var(--calculated-content-padding);
  }
</style>
