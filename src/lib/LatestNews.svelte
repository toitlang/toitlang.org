<script>
  import { releases, formatDate } from '$lib/releases'
  import { releaseExcerpt } from '$lib/markdown'
  const latest = releases[0]
</script>

<div class="latest-release">
  <p class="eyebrow">Latest language release</p>
  {#if latest}
    <h2><a href={`/releases/#${latest.tag}`}>Toit {latest.tag}</a></h2>
    <p class="muted">
      <time datetime={latest.createdAt.toISOString()}>{formatDate(latest.createdAt)}</time
      >{latest.prerelease ? ' · Prerelease' : ''}
    </p>
    <div class="markdown excerpt">{@html releaseExcerpt(latest.body)}</div>
    <a href={`/releases/#${latest.tag}`}>Read the release notes →</a>
  {:else}
    <p>
      Follow development and find downloads on <a href="https://github.com/toitlang/toit/releases"
        >GitHub Releases</a
      >.
    </p>
  {/if}
</div>
