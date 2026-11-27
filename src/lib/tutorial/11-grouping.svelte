<script lang="ts">
  import {
    aggregationFns,
    columnGroupingFeature,
    createColumnHelper,
    createExpandedRowModel,
    createGroupedRowModel,
    createTable,
    FlexRender,
    rowAggregationFeature,
    rowExpandingFeature,
    tableFeatures,
    type ExpandedState,
    type GroupingState,
  } from '@tanstack/svelte-table'

  import { cn } from '$lib/utils.js'
  import { employees, type Employee } from './data'

  const features = tableFeatures({
    columnGroupingFeature,
    rowAggregationFeature,
    rowExpandingFeature,
    aggregationFns,
    groupedRowModel: createGroupedRowModel(),
    expandedRowModel: createExpandedRowModel(),
  })

  const columnHelper = createColumnHelper<typeof features, Employee>()

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const columns = columnHelper.columns([
    columnHelper.accessor('department', {
      header: 'Department',
      enableGrouping: true,
    }),
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('role', { header: 'Role' }),
    columnHelper.accessor('status', { header: 'Status' }),
    columnHelper.accessor('salary', {
      header: 'Salary',
      // On a group row getValue() returns the aggregate
      aggregationFn: 'sum',
      cell: ({ getValue }) => money.format((getValue() as number | undefined) ?? 0),
    }),
  ])

  let grouping = $state<GroupingState>(['department'])
  let expanded = $state<ExpandedState>(true)

  const table = createTable({
    features,
    get data() {
      return employees
    },
    get columns() {
      return columns
    },
    onGroupingChange: (updater) => {
      grouping = typeof updater === 'function' ? updater(grouping) : updater
    },
    onExpandedChange: (updater) => {
      expanded = typeof updater === 'function' ? updater(expanded) : updater
    },
    state: {
      get grouping() {
        return grouping
      },
      get expanded() {
        return expanded
      },
    },
  })

  const groupable = $derived(
    table.getAllLeafColumns().filter((column) => column.getCanGroup()),
  )
</script>

<div class="mb-3 flex items-center gap-2 text-sm">
  <label for="group-by">Group by</label>
  <select
    id="group-by"
    class="h-8 rounded-md border bg-transparent px-2"
    value={grouping[0] ?? ''}
    onchange={(event) =>
      table.setGrouping(event.currentTarget.value ? [event.currentTarget.value] : [])}
  >
    <option value="">None</option>
    {#each groupable as column (column.id)}
      <option value={column.id}>{String(column.columnDef.header)}</option>
    {/each}
  </select>
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
      <tr
        class={cn(
          'border-b last:border-0',
          row.getIsGrouped() && 'bg-muted/50 font-medium',
        )}
      >
        {#each row.getAllCells() as cell (cell.id)}
          <td class="px-3 py-2" style="padding-left: {row.getIsGrouped() ? 12 : 12 + row.depth * 16}px">
            <FlexRender {cell} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
