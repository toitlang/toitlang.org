<script lang="ts">
  import { renderMarkdown } from '$lib/markdown'
  export let title: string
  export let text: string
</script>

<svelte:head>
  <title>{title} (archive) — Toit</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="intro prose">
  <p class="eyebrow">Previous website · Archive</p>
  <h1>{title}</h1>
  <p>
    This is the policy published on the previous Toit website, last updated February 26, 2025. It is
    retained here for historical reference and describes that site and its services.
  </p>
  <a href="/project/">About the project today →</a>
</section>
<section class="prose section-rule markdown">{@html renderMarkdown(text)}</section>
