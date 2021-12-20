<script lang="ts">
  import GdprBanner from '@beyonk/gdpr-cookie-consent-banner'
  import '@beyonk/gdpr-cookie-consent-banner/dist/style.css'

  function initAnalytics() {
    const id = 'G-0R2MLL2NPR'
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?${id}`
    script.defer = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []

    /* eslint-disable */
    function gtag(...args: unknown[]) {
      // The Google implementation of gtag requires the original `arguments`
      // object to be passed.
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', id)
  }
</script>

<GdprBanner
  cookieName="toit_analytics"
  heading=""
  description="We use cookies to offer a better browsing experience and analyze site traffic."
  choices={{ tracking: false, marketing: false }}
  on:analytics={initAnalytics}
/>
