<script lang="ts">
  import {
    columnResizingFeature,
    columnSizingFeature,
    createColumnHelper,
    createTable,
    FlexRender,
    tableFeatures,
    type ColumnSizingState,
  } from '@tanstack/svelte-table'

  import { employees, type Employee } from './data'

  const features = tableFeatures({
    columnSizingFeature,
    columnResizingFeature,
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

  let columnSizing = $state<ColumnSizingState>({})

  const table = createTable({
    features,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    get data() {
      return employees
    },
    get columns() {
      return columns
    },
    onColumnSizingChange: (updater) => {
      columnSizing =
        typeof updater === 'function' ? updater(columnSizing) : updater
    },
    state: {
      get columnSizing() {
        return columnSizing
      },
    },
  })
</script>

<div class="overflow-x-auto rounded-md border">
  <table class="border-collapse text-sm" style="width: {table.getTotalSize()}px">
    <thead>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <tr class="border-b text-left">
          {#each headerGroup.headers as header (header.id)}
            <th
              class="relative px-3 py-2 font-medium"
              style="width: {header.getSize()}px"
            >
              <FlexRender {header} />
              <!-- Drag this edge to resize the column -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class="absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none select-none bg-border opacity-0 hover:opacity-100"
                class:bg-primary={header.column.getIsResizing()}
                onmousedown={header.getResizeHandler()}
                ontouchstart={header.getResizeHandler()}
              ></div>
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each table.getRowModel().rows as row (row.id)}
        <tr class="border-b last:border-0">
          {#each row.getAllCells() as cell (cell.id)}
            <td class="px-3 py-2" style="width: {cell.column.getSize()}px">
              <FlexRender {cell} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
