<script lang="ts">
  import {
    columnFilteringFeature,
    createColumnHelper,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    createTable,
    filterFns,
    FlexRender,
    globalFilteringFeature,
    rowPaginationFeature,
    rowSortingFeature,
    sortFns,
    tableFeatures,
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
  } from '@tanstack/svelte-table'

  import { employees, type Employee } from './data'

  const features = tableFeatures({
    columnFilteringFeature,
    globalFilteringFeature,
    rowPaginationFeature,
    rowSortingFeature,
    filterFns,
    sortFns,
    // The factory order mirrors the pipeline: filter, sort, then paginate
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
  })

  const columnHelper = createColumnHelper<typeof features, Employee>()

  const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Name', sortFn: 'alphanumeric' }),
    columnHelper.accessor('email', { header: 'Email', sortFn: 'text' }),
    columnHelper.accessor('department', {
      header: 'Department',
      sortFn: 'alphanumeric',
      filterFn: 'equalsString',
    }),
    columnHelper.accessor('role', { header: 'Role', sortFn: 'alphanumeric' }),
    columnHelper.accessor('status', { header: 'Status', sortFn: 'alphanumeric' }),
    columnHelper.accessor('salary', { header: 'Salary', sortFn: 'basic' }),
  ])

  let sorting = $state<SortingState>([])
  let columnFilters = $state<ColumnFiltersState>([])
  let globalFilter = $state('')
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 5 })

  const table = createTable({
    features,
    get data() {
      return employees
    },
    get columns() {
      return columns
    },
    onSortingChange: (updater) => {
      sorting = typeof updater === 'function' ? updater(sorting) : updater
    },
    onColumnFiltersChange: (updater) => {
      columnFilters =
        typeof updater === 'function' ? updater(columnFilters) : updater
    },
    onGlobalFilterChange: (updater) => {
      globalFilter =
        typeof updater === 'function' ? updater(globalFilter) : updater
    },
    onPaginationChange: (updater) => {
      pagination =
        typeof updater === 'function' ? updater(pagination) : updater
    },
    // v9 resets the page index when the filtered row count changes
    autoResetPageIndex: true,
    state: {
      get sorting() {
        return sorting
      },
      get columnFilters() {
        return columnFilters
      },
      get globalFilter() {
        return globalFilter
      },
      get pagination() {
        return pagination
      },
    },
  })

  const pageCount = $derived(table.getPageCount())
</script>

<div class="mb-3 flex flex-wrap items-center gap-2">
  <input
    type="text"
    placeholder="Search all columns"
    class="h-9 rounded-md border bg-transparent px-3 text-sm"
    value={globalFilter}
    oninput={(event) => table.setGlobalFilter(event.currentTarget.value)}
  />
  <span class="text-sm text-muted-foreground">
    Page {pagination.pageIndex + 1} of {pageCount}
  </span>
</div>

<table class="w-full border-collapse text-sm">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <tr class="border-b text-left">
        {#each headerGroup.headers as header (header.id)}
          <th class="px-3 py-2 font-medium">
            <button
              type="button"
              onclick={header.column.getToggleSortingHandler()}
            >
              <FlexRender {header} />
              {header.column.getIsSorted() === 'asc'
                ? '↑'
                : header.column.getIsSorted() === 'desc'
                  ? '↓'
                  : '↕'}
            </button>
          </th>
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody>
    {#each table.getRowModel().rows as row (row.id)}
      <tr class="border-b last:border-0">
        {#each row.getAllCells() as cell (cell.id)}
          <td class="px-3 py-2"><FlexRender {cell} /></td>
        {/each}
      </tr>
    {:else}
      <tr>
        <td class="px-3 py-6 text-center text-muted-foreground" colspan={columns.length}>
          No results
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<div class="mt-3 flex items-center justify-end gap-2 text-sm">
  <button
    class="h-8 rounded-md border px-3 disabled:opacity-40"
    disabled={!table.getCanPreviousPage()}
    onclick={() => table.previousPage()}
  >
    Previous
  </button>
  <button
    class="h-8 rounded-md border px-3 disabled:opacity-40"
    disabled={!table.getCanNextPage()}
    onclick={() => table.nextPage()}
  >
    Next
  </button>
  <select
    class="h-8 rounded-md border bg-transparent px-2"
    value={pagination.pageSize.toString()}
    onchange={(event) => table.setPageSize(Number(event.currentTarget.value))}
  >
    {#each ['5', '10', '20'] as size (size)}
      <option value={size}>{size} rows</option>
    {/each}
  </select>
</div>
