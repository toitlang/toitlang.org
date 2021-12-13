<script>
  import ToitLogo from '/static/images/toit-logo.svg'
  import TwitterIcon from '~icons/feather/twitter'
  import LinkedInIcon from '~icons/feather/linkedin'
  import RedditIcon from '~icons/ps/reddit'
</script>

<nav>
  <div class="toit-logo">
    <ToitLogo />
  </div>

  <div class="social">
    <a href="https://twitter.com/toitware"> <TwitterIcon /></a>
    <a href="https://www.linkedin.com/company/toitio"><LinkedInIcon /></a>
    <a href="https://www.reddit.com/r/toit/"><RedditIcon /></a>
  </div>

  <ul class="links">
    <li><a target="_blank" href="https://docs.toit.io/language">Documentation</a></li>
    <li><a target="_blank" href="https://blog.toit.io">Blog</a></li>
    <li><a target="_blank" href="https://github.com/toitlang/toit">GitHub</a></li>
  </ul>
</nav>

<style lang="postcss">
  nav {
    border-top: 2px solid black;
    margin-top: var(--content-vertical-padding);
    padding-top: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3rem;
  }
  .social,
  .links {
    display: flex;
    align-items: center;
    gap: 1rem;
    & a {
      text-decoration: none;
    }
  }
  .toit-logo {
    & :global(svg) {
      width: 6rem;
      height: auto;
    }
  }
</style>
