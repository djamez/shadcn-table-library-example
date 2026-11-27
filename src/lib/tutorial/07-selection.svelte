<script lang="ts">
  import {
    createColumnHelper,
    createTable,
    FlexRender,
    renderComponent,
    rowSelectionFeature,
    tableFeatures,
    type RowSelectionState,
  } from '@tanstack/svelte-table'

  import RowCheckbox from './RowCheckbox.svelte'
  import { employees, type Employee } from './data'

  const features = tableFeatures({ rowSelectionFeature })
  const columnHelper = createColumnHelper<typeof features, Employee>()

  const columns = columnHelper.columns([
    columnHelper.display({
      id: 'select',
      header: ({ table }) =>
        renderComponent(RowCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected(),
          onchange: (checked) => table.toggleAllPageRowsSelected(checked),
          label: 'Select all rows',
        }),
      cell: ({ row }) =>
        renderComponent(RowCheckbox, {
          checked: row.getIsSelected(),
          onchange: (checked) => row.toggleSelected(checked),
          label: `Select ${row.original.name}`,
        }),
    }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('department', { header: 'Department' }),
    columnHelper.accessor('role', { header: 'Role' }),
    columnHelper.accessor('status', { header: 'Status' }),
    columnHelper.accessor('salary', { header: 'Salary' }),
  ])

  let rowSelection = $state<RowSelectionState>({})

  const table = createTable({
    features,
    get data() {
      return employees
    },
    get columns() {
      return columns
    },
    onRowSelectionChange: (updater) => {
      rowSelection =
        typeof updater === 'function' ? updater(rowSelection) : updater
    },
    state: {
      get rowSelection() {
        return rowSelection
      },
    },
  })
</script>

<p class="mb-3 text-sm text-muted-foreground">
  {table.getSelectedRowModel().rows.length} selected
</p>

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
      <tr
        class="border-b last:border-0"
        data-state={row.getIsSelected() ? 'selected' : undefined}
      >
        {#each row.getAllCells() as cell (cell.id)}
          <td class="px-3 py-2"><FlexRender {cell} /></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
