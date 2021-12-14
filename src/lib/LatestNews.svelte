<script lang="ts">
  import { releases } from '$lib/releases'
  import { format } from 'date-fns'
  import NewsIcon from '~icons/feather/speaker'
</script>

<h3 class="SectionTitle"><NewsIcon /> Latest news</h3>

{#each releases as release (release.name)}
  <div class="Entry">
    <h3 class="Entry-title">
      Toit {release.tag} release
      <span class="Entry-date">{format(release.createdAt, 'MMM. do, yyyy')}</span>
    </h3>

    <p class="Entry-body">
      {release.body}
    </p>
    <p class="Entry-actions">
      <a href={release.url} target="_blank">Get it!</a>
    </p>
  </div>
{/each}

<style lang="postcss">
  .Entry {
    margin-top: 1.5rem;
  }
  .Entry-title {
    display: flex;
    font-weight: bold;
    justify-content: space-between;
  }
  .Entry-date {
    font-weight: normal;
    opacity: 0.5;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: bold;
  }
</style>
