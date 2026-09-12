<script>
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '../style/app.css'
</script>

<Header />
<main id="main" tabindex="-1"><slot /></main>
<Footer />
