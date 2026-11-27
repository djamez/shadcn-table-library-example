<script lang="ts">
  import {
    createColumnHelper,
    createTable,
    FlexRender,
    renderComponent,
    tableFeatures,
  } from '@tanstack/svelte-table'

  import StatusBadge from './StatusBadge.svelte'
  import { employees, type Employee } from './data'

  const features = tableFeatures({})
  const columnHelper = createColumnHelper<typeof features, Employee>()

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('email', {
      header: 'Email',
      // A string return value is rendered as text
      cell: ({ getValue }) => getValue().toLowerCase(),
    }),
    columnHelper.accessor('department', { header: 'Department' }),
    columnHelper.accessor('status', {
      header: 'Status',
      // Components are mounted with renderComponent
      cell: ({ getValue }) =>
        renderComponent(StatusBadge, {
          status: getValue() as Employee['status'],
        }),
    }),
    columnHelper.accessor('salary', {
      header: 'Salary',
      cell: ({ getValue }) => money.format(getValue()),
    }),
  ])

  const table = createTable({
    features,
    get data() {
      return employees
    },
    get columns() {
      return columns
    },
  })
</script>

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
        {#each row.getAllCells() as cell (cell.id)}
          <td class="px-3 py-2"><FlexRender {cell} /></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
