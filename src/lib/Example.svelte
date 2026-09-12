<script lang="ts">
  export let code: string
  export let filename: string
  export let command = ''
  export let output = ''
</script>

<figure class="example">
  <figcaption>{filename}</figcaption>
  <pre aria-label={filename}><code>{@html code}</code></pre>
  {#if command}
    <div class="terminal">
      <pre><code><span class="muted">$ </span>{command}</code></pre>
      {#if output}<pre class="output"><samp>{output}</samp></pre>{/if}
    </div>
  {/if}
</figure>
