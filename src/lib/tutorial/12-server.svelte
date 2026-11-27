<script lang="ts">
  import {
    createColumnHelper,
    createTable,
    FlexRender,
    rowPaginationFeature,
    rowSortingFeature,
    tableFeatures,
    type PaginationState,
    type SortingState,
  } from '@tanstack/svelte-table'

  import { searchEmployeesRemote } from './search.remote'
  import type { EmployeeQuery } from './search'
  import { employees, type Employee } from './data'

  // With manual modes the tables do not slice, sort or filter; the server does.
  // The features are still registered so the pagination/sorting state and APIs
  // exist on the table.
  const features = tableFeatures({
    rowPaginationFeature,
    rowSortingFeature,
  })

  const columnHelper = createColumnHelper<typeof features, Employee>()

  const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('department', { header: 'Department' }),
    columnHelper.accessor('role', { header: 'Role' }),
    columnHelper.accessor('status', { header: 'Status' }),
    columnHelper.accessor('salary', { header: 'Salary' }),
  ])

  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 5 })
  let sorting = $state<SortingState>([{ id: 'name', desc: false }])
  let search = $state('')
  let department = $state('')

  const sortBy = $derived(
    (sorting[0]?.id ?? 'name') as EmployeeQuery['sortBy'],
  )
  const sortDir = $derived(sorting[0]?.desc ? 'desc' : 'asc')

  // The remote query runs on the server. During SSR the first page is rendered
  // with the response; on the client, changing args re-runs it.
  const response = $derived(
    await searchEmployeesRemote({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      q: search,
      department,
      sortBy,
      sortDir,
    }),
  )

  const table = createTable({
    features,
    manualPagination: true,
    manualSorting: true,
    get pageCount() {
      return response.pageCount
    },
    get rowCount() {
      return response.rowCount
    },
    get data() {
      return response.rows
    },
    get columns() {
      return columns
    },
    onPaginationChange: (updater) => {
      pagination =
        typeof updater === 'function' ? updater(pagination) : updater
    },
    onSortingChange: (updater) => {
      sorting = typeof updater === 'function' ? updater(sorting) : updater
    },
    state: {
      get pagination() {
        return pagination
      },
      get sorting() {
        return sorting
      },
    },
  })

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales'] as const

  function changeSearch(value: string) {
    search = value
    table.setPageIndex(0)
  }

  function changeDepartment(value: string) {
    department = value
    table.setPageIndex(0)
  }
</script>

<div class="mb-3 flex flex-wrap items-center gap-2">
  <input
    type="text"
    placeholder="Search name, email or role"
    class="h-9 rounded-md border bg-transparent px-3 text-sm"
    value={search}
    oninput={(event) => changeSearch(event.currentTarget.value)}
  />
  <select
    class="h-9 rounded-md border bg-transparent px-3 text-sm"
    value={department}
    onchange={(event) => changeDepartment(event.currentTarget.value)}
  >
    <option value="">All departments</option>
    {#each departments as name (name)}
      <option value={name}>{name}</option>
    {/each}
  </select>
  <span class="text-sm text-muted-foreground">
    {response.rowCount} of {employees.length} rows
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
  <span class="text-muted-foreground">
    Page {pagination.pageIndex + 1} of {response.pageCount}
  </span>
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
</div>
