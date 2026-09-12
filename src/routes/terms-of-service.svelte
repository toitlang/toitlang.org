<script>
  import LegacyPolicy from '$lib/LegacyPolicy.svelte'
  import policies from '$lib/legacy-policies'
</script>

<LegacyPolicy title="Terms of service" text={policies['terms-of-service']} />
