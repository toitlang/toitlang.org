<script>
  import PageMeta from '$lib/PageMeta.svelte'
  import { releases, formatDate } from '$lib/releases'
  import { renderMarkdown } from '$lib/markdown'
</script>

<PageMeta
  title="Toit release notes"
  description="Recent Toit language releases, changes, and downloads. Updated automatically when a language release is published."
  path="/releases/"
/>

<section class="intro">
  <p class="eyebrow">Development</p>
  <h1>Release notes</h1>
  <p class="lead">
    Recent changes to the Toit language and SDK, from the project’s GitHub releases.
  </p>
  <a href="https://github.com/toitlang/toit/releases">All releases and downloads →</a>
</section>

{#each releases as release (release.tag)}
  <article class="release section-rule" id={release.tag}>
    <header>
      <h2><a href={release.url}>Toit {release.tag}</a></h2>
      <p class="muted">
        <time datetime={release.createdAt.toISOString()}>{formatDate(release.createdAt)}</time
        >{release.prerelease ? ' · Prerelease' : ''}
      </p>
    </header>
    <div class="markdown">{@html renderMarkdown(release.body)}</div>
    <a href={release.url}>Downloads and discussion on GitHub →</a>
  </article>
{/each}
