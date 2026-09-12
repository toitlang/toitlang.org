<script>
  import { page } from '$app/stores'
  import ToitLogo from '/static/images/toit-logo.svg'
</script>

<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <a class="logo" href="/" aria-label="Toit home"><ToitLogo /></a>
  <nav aria-label="Main navigation">
    <a href="/scripting/" aria-current={$page.path === '/scripting/' ? 'page' : undefined}
      >Scripting</a
    >
    <a href="/embedded/" aria-current={$page.path === '/embedded/' ? 'page' : undefined}>Embedded</a
    >
    <a href="https://docs.toit.io/">Docs <span aria-hidden="true">↗</span></a>
    <a href="/project/" aria-current={$page.path === '/project/' ? 'page' : undefined}>Project</a>
    <a href="https://github.com/toitlang/toit">GitHub <span aria-hidden="true">↗</span></a>
  </nav>
</header>
