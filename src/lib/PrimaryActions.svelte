<script>
  import GetStartedIcon from '~icons/feather/play'
  import DownloadIcon from '~icons/feather/download-cloud'
  import DocumentationIcon from '~icons/feather/book'
  import ArrowRight from '~icons/feather/arrow-right'
  import { releases } from '$lib/releases'
</script>

<div class="actions">
  <div class="Feature">
    <h3 class="Feature-title"><GetStartedIcon /> Get started</h3>
    <div class="Feature-body">
      <p>Follow this easy step-by-step guide to get up and running with Toit.</p>
    </div>
    <div class="Feature-actions">
      <a
        class="Button Button--primary"
        target="_blank"
        href="https://github.com/toitlang/toit#installation">Installation guide <ArrowRight /></a
      >
    </div>
  </div>
  <div class="Feature">
    <h3 class="Feature-title"><DownloadIcon /> Download</h3>
    <div class="Feature-body">
      <p>Download and get started with the latest version of Toit.</p>
    </div>
    <div class="Feature-actions">
      <a class="Button" target="_blank" href={releases[0].url}
        >Download Toit {releases[0].tag} <ArrowRight /></a
      >
    </div>
  </div>
  <div class="Feature">
    <h3 class="Feature-title"><DocumentationIcon /> Documentation</h3>
    <div class="Feature-body">
      <p>Learn how to code with Toit and how you can use it in your IoT projects.</p>
    </div>
    <div class="Feature-actions">
      <a class="Button" target="_blank" href="https://docs.toit.io/language"
        >Visit documentation <ArrowRight /></a
      >
    </div>
  </div>
</div>

<style lang="postcss">
  .actions {
    display: flex;
    gap: 3rem;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
  }
</style>
