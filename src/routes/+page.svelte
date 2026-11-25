<script lang="ts">
  let { data } = $props()
</script>

<section class="space-y-4">
  <p class="max-w-2xl text-sm text-muted-foreground">
    Every example from the Shadcn Table library, implemented with Svelte 5,
    Tailwind CSS and the native <code>@tanstack/svelte-table</code> v9 adapter. Pick an
    example from the sidebar or the list below.
  </p>
  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/animated-icons"
      >
        <p class="font-medium">Animated icons</p>
        <p class="mt-1 text-sm text-muted-foreground">animated-icons</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/async-actions"
      >
        <p class="font-medium">Async row actions</p>
        <p class="mt-1 text-sm text-muted-foreground">async-actions</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/basic"
      >
        <p class="font-medium">Data table</p>
        <p class="mt-1 text-sm text-muted-foreground">basic</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/column-pinning"
      >
        <p class="font-medium">Column pinning</p>
        <p class="mt-1 text-sm text-muted-foreground">column-pinning</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/comparison"
      >
        <p class="font-medium">Comparison</p>
        <p class="mt-1 text-sm text-muted-foreground">comparison</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/conditional-formatting"
      >
        <p class="font-medium">Conditional formatting</p>
        <p class="mt-1 text-sm text-muted-foreground">conditional-formatting</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/deployments"
      >
        <p class="font-medium">Deployments</p>
        <p class="mt-1 text-sm text-muted-foreground">deployments</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/editable"
      >
        <p class="font-medium">Editable</p>
        <p class="mt-1 text-sm text-muted-foreground">editable</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/export-config"
      >
        <p class="font-medium">Export configuration</p>
        <p class="mt-1 text-sm text-muted-foreground">export-config</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/export-selected"
      >
        <p class="font-medium">Export selected</p>
        <p class="mt-1 text-sm text-muted-foreground">export-selected</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/filter-state-shape"
      >
        <p class="font-medium">Filter state shape</p>
        <p class="mt-1 text-sm text-muted-foreground">filter-state-shape</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/filter-toolbar"
      >
        <p class="font-medium">Toolbar filter</p>
        <p class="mt-1 text-sm text-muted-foreground">filter-toolbar</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/grouped"
      >
        <p class="font-medium">Grouped</p>
        <p class="mt-1 text-sm text-muted-foreground">grouped</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/heatmap"
      >
        <p class="font-medium">Heatmap</p>
        <p class="mt-1 text-sm text-muted-foreground">heatmap</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/infinite-scroll"
      >
        <p class="font-medium">Infinite scroll</p>
        <p class="mt-1 text-sm text-muted-foreground">infinite-scroll</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/inventory-allocation"
      >
        <p class="font-medium">Inventory allocation</p>
        <p class="mt-1 text-sm text-muted-foreground">inventory-allocation</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/kpi"
      >
        <p class="font-medium">Summary / KPI</p>
        <p class="mt-1 text-sm text-muted-foreground">kpi</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/live-status"
      >
        <p class="font-medium">Live status</p>
        <p class="mt-1 text-sm text-muted-foreground">live-status</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/logs"
      >
        <p class="font-medium">Logs</p>
        <p class="mt-1 text-sm text-muted-foreground">logs</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/master-detail"
      >
        <p class="font-medium">Master detail</p>
        <p class="mt-1 text-sm text-muted-foreground">master-detail</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/mobile-cards"
      >
        <p class="font-medium">Mobile cards</p>
        <p class="mt-1 text-sm text-muted-foreground">mobile-cards</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/params-filter"
      >
        <p class="font-medium">Params filter</p>
        <p class="mt-1 text-sm text-muted-foreground">params-filter</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/pivot"
      >
        <p class="font-medium">Pivot</p>
        <p class="mt-1 text-sm text-muted-foreground">pivot</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/production-dashboard"
      >
        <p class="font-medium">Production dashboard</p>
        <p class="mt-1 text-sm text-muted-foreground">production-dashboard</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/reorder"
      >
        <p class="font-medium">Reorder</p>
        <p class="mt-1 text-sm text-muted-foreground">reorder</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/resizable-reorder"
      >
        <p class="font-medium">Resizable / reorder</p>
        <p class="mt-1 text-sm text-muted-foreground">resizable-reorder</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/spreadsheet"
      >
        <p class="font-medium">Spreadsheet</p>
        <p class="mt-1 text-sm text-muted-foreground">spreadsheet</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/ssr"
      >
        <p class="font-medium">SSR</p>
        <p class="mt-1 text-sm text-muted-foreground">ssr</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/toolbar-filter"
      >
        <p class="font-medium">Filter toolbar</p>
        <p class="mt-1 text-sm text-muted-foreground">toolbar-filter</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/tree"
      >
        <p class="font-medium">Tree table</p>
        <p class="mt-1 text-sm text-muted-foreground">tree</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/tree-reorder"
      >
        <p class="font-medium">Tree reorder</p>
        <p class="mt-1 text-sm text-muted-foreground">tree-reorder</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/tree-select"
      >
        <p class="font-medium">Tree selection</p>
        <p class="mt-1 text-sm text-muted-foreground">tree-select</p>
      </a>
      <a
        class="rounded-lg border p-4 transition-colors hover:bg-muted/50"
        href="/utility"
      >
        <p class="font-medium">Utility</p>
        <p class="mt-1 text-sm text-muted-foreground">utility</p>
      </a>
  </div>
</section>
