# Writing a blog post

Each post lives in `content/blog/<slug>/index.md`. The folder name becomes its
permanent URL: `content/blog/my-post/index.md` is published at
`https://toit.io/blog/my-post/`. Use lowercase words separated by hyphens. Keep
the folder name stable after publication, even when changing the title or date.

Copy `example-post/` to a new folder and replace its contents:

```markdown
---
title: Your article title
date: 2026-10-25
author: Your name
description: A short summary for the listing, RSS feed, and link previews.
draft: true
---

Start your article here.

## A section heading

Continue with ordinary Markdown.
```

`title`, `date` (YYYY-MM-DD), and `description` are required. `author` defaults to
“Toit contributors”. YAML multiline values are supported; quote titles containing
`: ` or other YAML punctuation. The page supplies the title, so start article
sections with `##` rather than repeating the title as `#`.

Images are optional. Both the listing and the article layout work with text
alone; there is no thumbnail, cover image, or empty image placeholder.

## Preview and publish

Run `npm run dev` and open `/blog/`. Save edits and reload the page to see them.
Set `draft: false` locally to preview a post. Drafts are excluded from the listing,
article URLs, attachments, RSS feed, and sitemap, including preview deployments.
Keep the checked-in example as a draft.

When ready, remove `draft: true` or change it to `draft: false`, then run:

```sh
npm run check
npm test
npm run build
node tool/check-build.mjs
```

The post is published with the next website deployment. A date is displayed and
used for sorting; future dates do **not** schedule publication. Use the draft flag
to keep unfinished articles unpublished.

## Optional images and attachments

Keep assets next to the Markdown or in subfolders:

```text
my-post/
  index.md
  overview.png
  images/
    details.svg
  notes.pdf
```

Reference them with ordinary relative links:

```markdown
![An overview of the system](overview.png)
![A closer look](images/details.svg)
[Download the notes](notes.pdf)
```

Supported local attachments: PNG, JPEG, GIF, SVG, WebP, AVIF, and PDF. Only assets
referenced by published pages are included in the static build. Missing relative
assets fail the build. Assets must stay inside their post's folder; link to other
articles with site-relative URLs such as `/blog/another-post/`. Raw HTML is disabled.

## Medium archive

The blog links to the existing archive at `blog.toit.io`. That subdomain continues
to serve Medium until older articles are imported and their redirects are ready.
Do not repoint it as part of publishing a new article.
