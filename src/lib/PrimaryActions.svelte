<script>
  import GetStartedIcon from '~icons/feather/play'
  import DownloadIcon from '~icons/feather/download-cloud'
  import DocumentationIcon from '~icons/feather/book'
  import ArrowRight from '~icons/feather/arrow-right'
</script>

<div class="actions">
  <div class="Action">
    <h3 class="Action-title SectionTitle"><GetStartedIcon /> Get started</h3>
    <div class="Action-body">
      <p>Some text about getting started and what the user can expect when clicking this button.</p>
    </div>
    <div class="Action__buttons">
      <a class="Button Button--primary" href="/">Beginners guide <ArrowRight /></a>
    </div>
  </div>
  <div class="Action">
    <h3 class="Action-title SectionTitle"><DownloadIcon /> Download</h3>
    <div class="Action-body">
      <p>Some text about getting started and what the user can expect when clicking this button.</p>
    </div>
    <div class="Action__buttons">
      <a class="Button" href="/">Download Toit v1.1.9 <ArrowRight /></a>
    </div>
  </div>
  <div class="Action">
    <h3 class="Action-title SectionTitle"><DocumentationIcon /> Documentation</h3>
    <div class="Action-body">
      <p>Some text about the documentation.</p>
    </div>
    <div class="Action__buttons">
      <a class="Button" href="/">Visit documentation <ArrowRight /></a>
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
