<script>
  import DiscordIcon from '~icons/la/discord'
  import RedditIcon from '~icons/ps/reddit'
  import BSkyIcon from '/static/images/bsky-black.svg'
  import ToitLogo from '/static/images/toit-logo.svg'
</script>

<nav>
  <div class="toit-logo">
    <ToitLogo />
  </div>

  <div class="social">
    <a href="https://bsky.app/profile/toitlang.org">
      <span class="u-linkTitle">BlueSky</span>
      <span class="bsky-logo">
        <BSkyIcon />
      </span>
    </a>
    <a href="https://www.reddit.com/r/toitlang/">
      <span class="u-linkTitle">Reddit</span>
      <RedditIcon />
    </a>
    <a href="https://discord.gg/Q7Y9VQ5nh2">
      <span class="u-linkTitle">Discord</span>
      <DiscordIcon />
    </a>
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

  .bsky-logo {
    & :global(svg) {
      width: 1.2em;
      height: 1.2em;
    }
  }
</style>
