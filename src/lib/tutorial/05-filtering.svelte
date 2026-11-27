<script lang="ts">
  import {
    columnFilteringFeature,
    createColumnHelper,
    createFilteredRowModel,
    createSortedRowModel,
    createTable,
    filterFns,
    FlexRender,
    globalFilteringFeature,
    rowSortingFeature,
    sortFns,
    tableFeatures,
    type ColumnFiltersState,
    type SortingState,
  } from '@tanstack/svelte-table'

  import { employees, type Employee } from './data'

  const features = tableFeatures({
    columnFilteringFeature,
    globalFilteringFeature,
    rowSortingFeature,
    filterFns,
    sortFns,
    // Filtering runs before sorting
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
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
    columnHelper.accessor('status', {
      header: 'Status',
      sortFn: 'alphanumeric',
      filterFn: 'equalsString',
    }),
    columnHelper.accessor('salary', { header: 'Salary', sortFn: 'basic' }),
  ])

  let sorting = $state<SortingState>([])
  let columnFilters = $state<ColumnFiltersState>([])
  let globalFilter = $state('')

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
    },
  })

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales'] as const
  const department = $derived(
    (table.atoms.columnFilters.get().find((filter) => filter.id === 'department')
      ?.value as string) ?? '',
  )
</script>

<div class="mb-3 flex flex-wrap items-center gap-2">
  <input
    type="text"
    placeholder="Search all columns"
    class="h-9 rounded-md border bg-transparent px-3 text-sm"
    value={globalFilter}
    oninput={(event) => table.setGlobalFilter(event.currentTarget.value)}
  />
  <select
    class="h-9 rounded-md border bg-transparent px-3 text-sm"
    value={department}
    onchange={(event) =>
      table.getColumn('department')?.setFilterValue(event.currentTarget.value || undefined)}
  >
    <option value="">All departments</option>
    {#each departments as name (name)}
      <option value={name}>{name}</option>
    {/each}
  </select>
  <span class="text-sm text-muted-foreground">
    {table.getRowModel().rows.length} of {employees.length} rows
  </span>
</div>

<table class="w-full border-collapse text-sm">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <tr class="border-b text-left">
        {#each headerGroup.headers as header (header.id)}
          {@const toggleSorting = header.column.getToggleSortingHandler()}
          <th class="px-3 py-2 font-medium">
            <button type="button" onclick={toggleSorting}>
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
