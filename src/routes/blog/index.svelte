<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    const response = await fetch('/blog/posts.json')
    if (!response.ok) return { status: response.status, error: 'Could not load blog posts' }
    return { props: await response.json() }
  }
</script>

<script lang="ts">
  import PageMeta from '$lib/PageMeta.svelte'
  import { formatDate } from '$lib/releases'
  import type { BlogPost } from '$lib/server/blog'

  export let posts: BlogPost[]
</script>

<PageMeta
  title="Toit blog"
  description="Articles about the Toit programming language, runtime, and tools, from the people building them."
  path="/blog/"
/>

<section class="intro">
  <p class="eyebrow">From the contributors</p>
  <h1>The Toit blog.</h1>
  <p class="lead">Ideas, explanations, and updates from the people building Toit.</p>
  <a href="/blog/feed.xml">Subscribe via RSS →</a>
</section>

<section class="blog-list" aria-label="Articles">
  {#each posts as post (post.slug)}
    <article class="blog-summary">
      <p class="muted blog-byline">
        <time datetime={post.date}>{formatDate(new Date(post.date))}</time> · {post.author}
      </p>
      <h2><a href={`/blog/${post.slug}/`}>{post.title}</a></h2>
      <p>{post.description}</p>
      <a class="blog-read" href={`/blog/${post.slug}/`} aria-label={`Read ${post.title}`}
        >Read article <span aria-hidden="true">→</span></a
      >
    </article>
  {:else}
    <div class="prose">
      <h2>More to come.</h2>
      <p>New articles will appear here. In the meantime, explore earlier writing in the archive.</p>
    </div>
  {/each}
</section>

<section class="prose section-rule">
  <h2>Earlier writing</h2>
  <p>
    Read the <a href="https://blog.toit.io/">blog archive on Medium</a> for more about the work behind
    Toit. Older articles also describe the project’s earlier commercial services.
  </p>
</section>
