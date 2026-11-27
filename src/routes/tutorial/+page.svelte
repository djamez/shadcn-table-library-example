<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte'

  import dataSource from '$lib/tutorial/data.ts?raw'
  import plainTableSource from '$lib/tutorial/01-plain-table.svelte?raw'
  import tableCoreSource from '$lib/tutorial/02-table-core.svelte?raw'
  import statusBadgeSource from '$lib/tutorial/StatusBadge.svelte?raw'
  import formattingSource from '$lib/tutorial/03-formatting.svelte?raw'
  import sortingSource from '$lib/tutorial/04-sorting.svelte?raw'
  import filteringSource from '$lib/tutorial/05-filtering.svelte?raw'
  import paginationSource from '$lib/tutorial/06-pagination.svelte?raw'
  import rowCheckboxSource from '$lib/tutorial/RowCheckbox.svelte?raw'
  import selectionSource from '$lib/tutorial/07-selection.svelte?raw'
  import editableCellSource from '$lib/tutorial/EditableCell.svelte?raw'
  import editingSource from '$lib/tutorial/08-editing.svelte?raw'
  import treeNameCellSource from '$lib/tutorial/TreeNameCell.svelte?raw'
  import treeSource from '$lib/tutorial/09-tree.svelte?raw'
  import visibilitySource from '$lib/tutorial/10a-visibility.svelte?raw'
  import pinningSource from '$lib/tutorial/10b-pinning.svelte?raw'
  import resizingSource from '$lib/tutorial/10c-resizing.svelte?raw'
  import groupingSource from '$lib/tutorial/11-grouping.svelte?raw'
  import serverSearchSource from '$lib/tutorial/search.ts?raw'
  import serverTableSource from '$lib/tutorial/12-server.svelte?raw'

  const remoteWrapper = `import { query } from '$app/server'

import { employeeQuery, searchEmployees } from './search'

export const searchEmployeesRemote = query(employeeQuery, searchEmployees)`

  type File = { filename: string; code: string }
  type Step = {
    id: string
    title: string
    files: File[]
    example?: { href: string; label: string }
  }

  const steps: Step[] = [
    {
      id: 'plain-table',
      title: '1. A data array and a plain table',
      files: [
        { filename: 'src/lib/tutorial/data.ts', code: dataSource },
        {
          filename: 'src/lib/tutorial/01-plain-table.svelte',
          code: plainTableSource,
        },
      ],
    },
    {
      id: 'table-core',
      title: '2. Render the same table with TanStack Table',
      files: [
        {
          filename: 'src/lib/tutorial/02-table-core.svelte',
          code: tableCoreSource,
        },
      ],
      example: { href: '/basic', label: 'Data table' },
    },
    {
      id: 'formatting',
      title: '3. Format cells',
      files: [
        {
          filename: 'src/lib/tutorial/StatusBadge.svelte',
          code: statusBadgeSource,
        },
        {
          filename: 'src/lib/tutorial/03-formatting.svelte',
          code: formattingSource,
        },
      ],
    },
    {
      id: 'sorting',
      title: '4. Add sorting',
      files: [
        { filename: 'src/lib/tutorial/04-sorting.svelte', code: sortingSource },
      ],
      example: { href: '/basic', label: 'Data table sorting' },
    },
    {
      id: 'filtering',
      title: '5. Add column and global filtering',
      files: [
        {
          filename: 'src/lib/tutorial/05-filtering.svelte',
          code: filteringSource,
        },
      ],
      example: { href: '/filter-toolbar', label: 'Toolbar filter' },
    },
    {
      id: 'pagination',
      title: '6. Add pagination',
      files: [
        {
          filename: 'src/lib/tutorial/06-pagination.svelte',
          code: paginationSource,
        },
      ],
      example: { href: '/basic', label: 'Data table pagination' },
    },
    {
      id: 'selection',
      title: '7. Add row selection',
      files: [
        {
          filename: 'src/lib/tutorial/RowCheckbox.svelte',
          code: rowCheckboxSource,
        },
        {
          filename: 'src/lib/tutorial/07-selection.svelte',
          code: selectionSource,
        },
      ],
      example: { href: '/export-selected', label: 'Export selected rows' },
    },
    {
      id: 'editing',
      title: '8. Edit cells outside table state',
      files: [
        {
          filename: 'src/lib/tutorial/EditableCell.svelte',
          code: editableCellSource,
        },
        { filename: 'src/lib/tutorial/08-editing.svelte', code: editingSource },
      ],
      example: { href: '/editable', label: 'Editable table' },
    },
    {
      id: 'tree',
      title: '9. Tree rows with expansion',
      files: [
        {
          filename: 'src/lib/tutorial/TreeNameCell.svelte',
          code: treeNameCellSource,
        },
        { filename: 'src/lib/tutorial/09-tree.svelte', code: treeSource },
      ],
      example: { href: '/tree', label: 'Tree table' },
    },
    {
      id: 'visibility',
      title: '10. Column visibility',
      files: [
        {
          filename: 'src/lib/tutorial/10a-visibility.svelte',
          code: visibilitySource,
        },
      ],
      example: { href: '/utility', label: 'Density and column controls' },
    },
    {
      id: 'pinning',
      title: '11. Column pinning',
      files: [
        { filename: 'src/lib/tutorial/10b-pinning.svelte', code: pinningSource },
      ],
      example: { href: '/column-pinning', label: 'Column pinning' },
    },
    {
      id: 'resizing',
      title: '12. Column resizing',
      files: [
        {
          filename: 'src/lib/tutorial/10c-resizing.svelte',
          code: resizingSource,
        },
      ],
      example: {
        href: '/resizable-reorder',
        label: 'Resizable and reorderable columns',
      },
    },
    {
      id: 'grouping',
      title: '13. Grouping and aggregation',
      files: [
        { filename: 'src/lib/tutorial/11-grouping.svelte', code: groupingSource },
      ],
      example: { href: '/grouped', label: 'Grouped table' },
    },
    {
      id: 'server',
      title: '14. Server-side search, filtering and pagination',
      files: [
        { filename: 'src/lib/tutorial/search.ts', code: serverSearchSource },
        { filename: 'src/lib/tutorial/search.remote.ts', code: remoteWrapper },
        {
          filename: 'src/lib/tutorial/12-server.svelte',
          code: serverTableSource,
        },
      ],
      example: { href: '/ssr', label: 'SSR examples' },
    },
  ]

  const featureIndex = `// feature                     row model factory            adds
columnVisibilityFeature     —                            getVisibleCells, toggleVisibility
rowSortingFeature           createSortedRowModel()       sorting state, getToggleSortingHandler
columnFilteringFeature      createFilteredRowModel()     columnFilters, setFilterValue
globalFilteringFeature      (needs filteredRowModel)     globalFilter, setGlobalFilter
rowPaginationFeature        createPaginatedRowModel()    pagination, nextPage, getPageCount
rowSelectionFeature         —                            rowSelection, getIsSelected, toggleSelected
rowExpandingFeature         createExpandedRowModel()     expanded, getSubRows, getToggleExpandedHandler
columnOrderingFeature       —                            columnOrder, getAllLeafColumns
columnPinningFeature        —                            columnPinning, pin('start' | 'end'), getIsPinned
columnSizingFeature         —                            columnSizing, getSize, getStart, getAfter
columnResizingFeature       —                            getResizeHandler, getIsResizing
columnGroupingFeature       createGroupedRowModel()      grouping, getIsGrouped, toggleGrouping
rowAggregationFeature       (needs groupedRowModel)      aggregationFn, getIsAggregated
columnFacetingFeature       createFacetedRowModel()      getFacetedUniqueValues, getFacetedMinMaxValues

// registries: filterFns, sortFns, aggregationFns (needed for string keys)
// manual modes: manualPagination, manualFiltering, manualSorting + pageCount/rowCount`
</script>

<svelte:head>
  <title>TanStack Table v9 with Svelte — Tutorial</title>
  <meta
    name="description"
    content="A code-first tutorial: build a Svelte 5 table with TanStack Table v9, one feature at a time, ending with server-side search, filtering and pagination."
  />
</svelte:head>

<section class="max-w-4xl space-y-10">
  <div class="space-y-3">
    <p class="text-sm text-muted-foreground">
      Build one table from a plain HTML table to a server-driven table. Every
      snippet below is a complete, type-checked file from
      <code>src/lib/tutorial</code>.
    </p>
    <nav class="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
      {#each steps as step (step.id)}
        <a
          class="rounded px-1.5 py-0.5 hover:bg-muted hover:text-foreground"
          href="#{step.id}"
        >
          {step.title}
        </a>
      {/each}
      <a
        class="rounded px-1.5 py-0.5 hover:bg-muted hover:text-foreground"
        href="#feature-index"
      >
        15. Feature index
      </a>
    </nav>
  </div>

  {#each steps as step (step.id)}
    <section id={step.id} class="scroll-mt-20 space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h2 class="text-lg font-medium">{step.title}</h2>
        {#if step.example}
          <a
            class="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            href={step.example.href}
          >
            Companion example: {step.example.label}
          </a>
        {/if}
      </div>
      {#each step.files as file (file.filename)}
        <CodeBlock filename={file.filename} code={file.code} />
      {/each}
    </section>
  {/each}

  <section id="feature-index" class="scroll-mt-20 space-y-3">
    <h2 class="text-lg font-medium">15. Feature index</h2>
    <CodeBlock
      filename="feature → row model → APIs"
      language="ts"
      code={featureIndex}
    />
  </section>
</section>
