<script lang="ts">
  export let title: string
  export let description: string
  export let path: string
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`https://toit.io${path}`} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={`https://toit.io${path}`} />
  <meta property="og:type" content="website" />
</svelte:head>
