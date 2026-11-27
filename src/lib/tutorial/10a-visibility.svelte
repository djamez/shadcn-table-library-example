<script lang="ts">
  import {
    columnVisibilityFeature,
    createColumnHelper,
    createTable,
    FlexRender,
    tableFeatures,
    type ColumnVisibilityState,
  } from '@tanstack/svelte-table'

  import { employees, type Employee } from './data'

  const features = tableFeatures({ columnVisibilityFeature })
  const columnHelper = createColumnHelper<typeof features, Employee>()

  const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('department', { header: 'Department' }),
    columnHelper.accessor('role', { header: 'Role' }),
    columnHelper.accessor('status', { header: 'Status' }),
    columnHelper.accessor('salary', { header: 'Salary' }),
  ])

  let columnVisibility = $state<ColumnVisibilityState>({})

  const table = createTable({
    features,
    get data() {
      return employees
    },
    get columns() {
      return columns
    },
    onColumnVisibilityChange: (updater) => {
      columnVisibility =
        typeof updater === 'function' ? updater(columnVisibility) : updater
    },
    state: {
      get columnVisibility() {
        return columnVisibility
      },
    },
  })
</script>

<div class="mb-3 flex flex-wrap gap-3 text-sm">
  {#each table.getAllLeafColumns() as column (column.id)}
    <label class="flex items-center gap-1.5">
      <input
        type="checkbox"
        checked={column.getIsVisible()}
        onchange={column.getToggleVisibilityHandler()}
      />
      {String(column.columnDef.header)}
    </label>
  {/each}
</div>

<table class="w-full border-collapse text-sm">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <tr class="border-b text-left">
        {#each headerGroup.headers as header (header.id)}
          <th class="px-3 py-2 font-medium"><FlexRender {header} /></th>
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody>
    {#each table.getRowModel().rows as row (row.id)}
      <tr class="border-b last:border-0">
        <!-- The visibility feature provides getVisibleCells() -->
        {#each row.getVisibleCells() as cell (cell.id)}
          <td class="px-3 py-2"><FlexRender {cell} /></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
