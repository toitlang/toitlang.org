<script>
  import GetStartedIcon from '~icons/feather/play'
  import DownloadIcon from '~icons/feather/download-cloud'
  import DocumentationIcon from '~icons/feather/book'
  import ArrowRight from '~icons/feather/arrow-right'
</script>

<section>
  <div class="action">
    <h3 class="action__title"><GetStartedIcon /> Get started</h3>
    <div class="action__body">
      <p>Some text about getting started and what the user can expect when clicking this button.</p>
    </div>
    <div class="action__buttons">
      <a class="btn btn--primary" href="/">Beginners guide <ArrowRight /></a>
    </div>
  </div>
  <div class="action">
    <h3 class="action__title"><DownloadIcon /> Download</h3>
    <div class="action__body">
      <p>Some text about getting started and what the user can expect when clicking this button.</p>
    </div>
    <div class="action__buttons">
      <a class="btn" href="/">Download Toit v1.1.9 <ArrowRight /></a>
    </div>
  </div>
  <div class="action">
    <h3 class="action__title"><DocumentationIcon /> Documentation</h3>
    <div class="action__body">
      <p>Some text about the documentation.</p>
    </div>
    <div class="action__buttons">
      <a class="btn" href="/">Visit documentation <ArrowRight /></a>
    </div>
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    gap: 3rem;
    justify-content: space-between;
    align-items: stretch;
  }
  .action {
    flex: 1;
    display: flex;
    flex-direction: column;
    &__title {
      font-weight: bold;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    &__body {
      flex: 1;
      p {
        margin: 1.5rem 0;
      }
    }
  }
</style>
