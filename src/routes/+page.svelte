<script lang="ts">
  import { getExamples } from '$lib/examples.remote'

  const examples = await getExamples()
</script>

<section class="space-y-4">
  <p class="max-w-2xl text-sm text-muted-foreground">
    Every example from the Shadcn Table library, implemented with Svelte 5,
    Tailwind CSS and the native <code>@tanstack/svelte-table</code> v9 adapter.
    Pick an example from the sidebar or the list below.
  </p>
  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {#each examples as example (example.slug)}
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/{example.slug}"
      >
        <p class="font-medium">{example.title}</p>
        <p class="mt-1 text-sm text-muted-foreground">{example.slug}</p>
      </a>
    {/each}
  </div>
</section>
