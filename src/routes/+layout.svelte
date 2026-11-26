<script lang="ts">
  import { page } from '$app/state'

  import { getExamples } from '$lib/examples.remote'
  import '../app.css'

  let { children } = $props()

  const examples = await getExamples()
  const title = $derived(
    page.url.pathname === '/'
      ? 'Examples'
      : (examples.find((example) => `/${example.slug}` === page.url.pathname)
          ?.title ?? 'Examples'),
  )
</script>

<svelte:head>
  <title>Shadcn Table — Svelte examples</title>
  <meta
    name="description"
    content="Every shadcn data table example implemented with Svelte 5 and TanStack Table v9."
  />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
  <header class="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
      <a href="/" class="text-sm font-semibold">Shadcn Table</a>
      <span class="text-sm text-muted-foreground">Svelte 5 examples</span>
    </div>
  </header>

  <div class="mx-auto flex max-w-7xl gap-8 px-4 py-6">
    <aside class="hidden w-56 shrink-0 md:block">
      <nav class="sticky top-16 space-y-0.5 text-sm">
        {#each examples as example (example.slug)}
          <a
            class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            class:bg-muted={page.url.pathname === `/${example.slug}`}
            class:text-foreground={page.url.pathname === `/${example.slug}`}
            href="/{example.slug}"
          >
            {example.title}
          </a>
        {/each}
      </nav>
    </aside>
    <main class="min-w-0 flex-1">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold tracking-tight">{title}</h1>
      </div>
      {@render children()}
    </main>
  </div>
</div>
