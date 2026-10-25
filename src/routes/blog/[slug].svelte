<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import type { BlogPost } from '$lib/server/blog'

  export const load: Load = async ({ page, fetch }) => {
    const response = await fetch('/blog/posts.json')
    if (!response.ok) return { status: response.status, error: 'Could not load blog posts' }
    const { posts }: { posts: BlogPost[] } = await response.json()
    const post = posts.find((post) => post.slug === page.params.slug)
    if (!post) return { status: 404, error: 'Article not found' }
    return { props: { post } }
  }
</script>

<script lang="ts">
  import PageMeta from '$lib/PageMeta.svelte'
  import { formatDate } from '$lib/releases'

  export let post: BlogPost
</script>

<PageMeta
  title={`${post.title} — Toit blog`}
  description={post.description}
  path={`/blog/${post.slug}/`}
  type="article"
/>

<svelte:head>
  <meta name="author" content={post.author} />
  <meta property="article:published_time" content={`${post.date}T00:00:00Z`} />
</svelte:head>

<article class="blog-post">
  <header class="blog-post-header">
    <a class="eyebrow" href="/blog/">← The Toit blog</a>
    <h1>{post.title}</h1>
    <p class="lead">{post.description}</p>
    <p class="muted blog-byline">
      <time datetime={post.date}>{formatDate(new Date(post.date))}</time> · {post.author}
    </p>
  </header>
  <div class="markdown blog-body">{@html post.html}</div>
  <footer class="blog-post-footer section-rule">
    <a href="/blog/">← All articles</a>
    <a href="/blog/feed.xml">Subscribe via RSS</a>
  </footer>
</article>
