<script>
  import ToitLogo from '/static/images/toit-logo.svg'
</script>

<header>
  <nav>
    <ToitLogo />
    <ul>
      <li><a target="_blank" href="https://docs.toit.io/language">Documentation</a></li>
      <li><a target="_blank" href="https://blog.toit.io">Blog</a></li>
      <li><a target="_blank" href="https://github.com/toitlang/toit">GitHub</a></li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: var(--header-height);
    color: white;
    padding: 0 var(--calculated-content-padding);
    & :global(svg) {
      width: 6rem;
      height: auto;
    }
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & ul {
      display: flex;
      gap: 1.5rem;
      & li {
        display: inline-block;
        & a {
          text-decoration: none;
          &:hover {
            text-decoration: var(--primary-color) solid underline;
            text-underline-position: under;
            text-decoration-thickness: 3px;
          }
        }
      }
    }
  }
</style>
