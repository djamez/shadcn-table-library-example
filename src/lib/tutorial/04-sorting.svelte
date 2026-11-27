<script lang="ts">
  import {
    createColumnHelper,
    createSortedRowModel,
    createTable,
    FlexRender,
    rowSortingFeature,
    sortFns,
    tableFeatures,
    type SortingState,
  } from '@tanstack/svelte-table'

  import { employees, type Employee } from './data'

  // Feature slots and their row models are registered together. `sortFns`
  // makes string values like 'alphanumeric' valid for `sortFn`.
  const features = tableFeatures({
    rowSortingFeature,
    sortFns,
    sortedRowModel: createSortedRowModel(),
  })

  const columnHelper = createColumnHelper<typeof features, Employee>()

  const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Name', sortFn: 'alphanumeric' }),
    columnHelper.accessor('email', { header: 'Email', sortFn: 'text' }),
    columnHelper.accessor('department', {
      header: 'Department',
      sortFn: 'alphanumeric',
    }),
    columnHelper.accessor('role', { header: 'Role', sortFn: 'alphanumeric' }),
    columnHelper.accessor('status', { header: 'Status', sortFn: 'alphanumeric' }),
    columnHelper.accessor('salary', { header: 'Salary', sortFn: 'basic' }),
  ])

  let sorting = $state<SortingState>([])

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
    state: {
      get sorting() {
        return sorting
      },
    },
  })
</script>

<table class="w-full border-collapse text-sm">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <tr class="border-b text-left">
        {#each headerGroup.headers as header (header.id)}
          {@const toggleSorting = header.column.getToggleSortingHandler()}
          <th class="px-3 py-2 font-medium">
            <button
              type="button"
              class="inline-flex items-center gap-1"
              onclick={toggleSorting}
            >
              <FlexRender {header} />
              {#if header.column.getIsSorted() === 'asc'}
                <span aria-hidden="true">↑</span>
              {:else if header.column.getIsSorted() === 'desc'}
                <span aria-hidden="true">↓</span>
              {:else}
                <span aria-hidden="true" class="opacity-40">↕</span>
              {/if}
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
    {/each}
  </tbody>
</table>
