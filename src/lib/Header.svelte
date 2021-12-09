<script>
  import ToitLogo from './toit-logo.svg'
</script>

<header>
  <nav>
    <ToitLogo />
    <ul>
      <li>Documentation</li>
      <li>Blog</li>
      <li>GitHub</li>
      <li>About</li>
    </ul>
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: var(--header-height);
    color: white;
    padding: 0 var(--calculated-content-padding);
    :global(svg) {
      width: 6rem;
      height: auto;
    }
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ul {
      display: flex;
      gap: 1.5rem;
      li {
        display: inline-block;
      }
    }
  }
</style>
