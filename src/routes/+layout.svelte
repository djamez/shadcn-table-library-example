<script lang="ts">
  import { page } from '$app/state'
  import '../app.css'

  let { children } = $props()
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
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/animated-icons">Animated icons</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/async-actions">Async row actions</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/basic">Data table</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/column-pinning">Column pinning</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/comparison">Comparison</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/conditional-formatting">Conditional formatting</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/deployments">Deployments</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/editable">Editable</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/export-config">Export configuration</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/export-selected">Export selected</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/filter-state-shape">Filter state shape</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/filter-toolbar">Toolbar filter</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/grouped">Grouped</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/heatmap">Heatmap</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/infinite-scroll">Infinite scroll</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/inventory-allocation">Inventory allocation</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/kpi">Summary / KPI</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/live-status">Live status</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/logs">Logs</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/master-detail">Master detail</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/mobile-cards">Mobile cards</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/params-filter">Params filter</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/pivot">Pivot</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/production-dashboard">Production dashboard</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/reorder">Reorder</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/resizable-reorder">Resizable / reorder</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/spreadsheet">Spreadsheet</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/ssr">SSR</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/toolbar-filter">Filter toolbar</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/tree">Tree table</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/tree-reorder">Tree reorder</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/tree-select">Tree selection</a>
        <a class="block rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" href="/utility">Utility</a>
      </nav>
    </aside>
    <main class="min-w-0 flex-1">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold tracking-tight">{page.data.title}</h1>
      </div>
      {@render children()}
    </main>
  </div>
</div>
