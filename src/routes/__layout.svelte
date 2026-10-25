<script>
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '../style/app.css'
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title="Toit blog" href="/blog/feed.xml" />
</svelte:head>

<Header />
<main id="main" tabindex="-1"><slot /></main>
<Footer />
