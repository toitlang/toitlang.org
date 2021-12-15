<script>
  import ToitLogo from '/static/images/toit-logo.svg'
  import GithubIcon from '~icons/feather/github'
</script>

<header>
  <nav>
    <div class="toit">
      <ToitLogo />
    </div>
    <ul>
      <li><a target="_blank" href="https://docs.toit.io/language">Documentation</a></li>
      <li><a target="_blank" href="https://blog.toit.io">Blog</a></li>
      <li><a target="_blank" href="https://github.com/toitlang/toit"><GithubIcon /></a></li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  header {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: var(--header-height);
    color: white;
    padding: 0 var(--calculated-content-padding);
    z-index: 1000;
  }
  .toit :global(svg) {
    width: 6rem;
    height: auto;
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & ul {
      display: flex;
      align-items: center;
      margin-left: 1.5rem;
      gap: 1.5rem;
      & li {
        display: inline-block;
        & a {
          display: block;
          text-decoration: none;
          & :global(svg) {
            vertical-align: middle;
          }
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
