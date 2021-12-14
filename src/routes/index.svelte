<!-- <script context="module" lang="ts">
  export async function load({ fetch }) {
    // const response = await fetch('https://api.github.com/repos/toitlang/toit/releases')
    // const releases: { [key: string]: string }[] = await response.json()
    const releases = []
    // const releases = await octokit.rest.repos.listReleases({
    //   owner: 'toitware',
    //   repo: 'toit',
    // })
    console.log(releases)
    const minifiedReleases: Release[] = releases.map<Release>((release) => ({
      name: release.name,
      tag: release.tag_name,
      createdAt: new Date(release.created_at),
      body: release.body,
      url: release.html_url,
    }))
    return {
      props: {
        releases: minifiedReleases,
      },
    }
  }
</script> -->
<script lang="ts">
  import Articles from '$lib/Articles.svelte'
  import Hero from '$lib/Hero.svelte'
  import LatestNews from '$lib/LatestNews.svelte'
  import PrimaryActions from '$lib/PrimaryActions.svelte'
</script>

<section class="hero">
  <Hero />
</section>

<section>
  <PrimaryActions />
</section>

<section>
  <div class="news-and-articles">
    <div class="news">
      <div class="news-container">
        <LatestNews />
      </div>
    </div>
    <div class="articles"><Articles /></div>
  </div>
</section>

<style lang="postcss">
  section.hero {
    color: white;
    padding-top: var(--header-height);
    background: black url('/images/illustrations/esp32.svg') no-repeat center;
  }
  .news-and-articles {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3rem;
    & .news {
      flex: 1;
      min-width: 18rem;
      & .news-container {
        max-width: 22rem;
      }
    }
    & .articles {
      flex: 1;
      min-width: 18rem;
    }
  }
</style>
