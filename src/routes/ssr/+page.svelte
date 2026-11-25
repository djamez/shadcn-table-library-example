<script lang="ts">
  import Demo0 from '$lib/examples/ssr/pagination-example/ServerPaginationDemo.svelte'
  import Demo1 from '$lib/examples/ssr/filter-example/ServerFilterDemo.svelte'
  import Demo2 from '$lib/examples/ssr/combined-example/ServerCombinedDemo.svelte'
</script>

<section class="space-y-3">
  <h2 class="text-lg font-medium">Pagination</h2>
  <Demo0 />
</section>
<section class="space-y-3">
  <h2 class="text-lg font-medium">Filter</h2>
  <Demo1 />
</section>
<section class="space-y-3">
  <h2 class="text-lg font-medium">Sort + filter + pagination</h2>
  <Demo2 />
</section>
