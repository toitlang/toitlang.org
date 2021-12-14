<script>
  import GetStartedIcon from '~icons/feather/play'
  import DownloadIcon from '~icons/feather/download-cloud'
  import DocumentationIcon from '~icons/feather/book'
  import ArrowRight from '~icons/feather/arrow-right'
  import { releases } from '$lib/releases'
</script>

<div class="actions">
  <div class="Action">
    <h3 class="Action-title SectionTitle"><GetStartedIcon /> Get started</h3>
    <div class="Action-body">
      <p>Some text about getting started and what the user can expect when clicking this button.</p>
    </div>
    <div class="Action__buttons">
      <a class="Button Button--primary" target="_blank" href="https://docs.toit.io/getstarted"
        >Beginners guide <ArrowRight /></a
      >
    </div>
  </div>
  <div class="Action">
    <h3 class="Action-title SectionTitle"><DownloadIcon /> Download</h3>
    <div class="Action-body">
      <p>Download and get started with the latest version of Toit.</p>
    </div>
    <div class="Action__buttons">
      <a class="Button" target="_blank" href={releases[0].url}
        >Download Toit {releases[0].tag} <ArrowRight /></a
      >
    </div>
  </div>
  <div class="Action">
    <h3 class="Action-title SectionTitle"><DocumentationIcon /> Documentation</h3>
    <div class="Action-body">
      <p>Learn how to code with Toit and how you can use it in your IoT projects.</p>
    </div>
    <div class="Action__buttons">
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
  .Action {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 13rem;
  }
  .Action-body {
    flex: 1;
    & p {
      margin: 1.5rem 0;
    }
  }
</style>
