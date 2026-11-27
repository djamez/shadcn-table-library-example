<script lang="ts">
  import {
    columnPinningFeature,
    columnSizingFeature,
    createColumnHelper,
    createTable,
    FlexRender,
    tableFeatures,
    type Column,
    type ColumnPinningState,
  } from '@tanstack/svelte-table'

  import { employees, type Employee } from './data'

  const features = tableFeatures({ columnPinningFeature, columnSizingFeature })
  const columnHelper = createColumnHelper<typeof features, Employee>()

  const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('department', { header: 'Department' }),
    columnHelper.accessor('role', { header: 'Role' }),
    columnHelper.accessor('status', { header: 'Status' }),
    columnHelper.accessor('salary', { header: 'Salary' }),
  ])

  let columnPinning = $state<ColumnPinningState>({ start: [], end: [] })

  const table = createTable({
    features,
    get data() {
      return employees
    },
    get columns() {
      return columns
    },
    onColumnPinningChange: (updater) => {
      columnPinning =
        typeof updater === 'function' ? updater(columnPinning) : updater
    },
    state: {
      get columnPinning() {
        return columnPinning
      },
    },
  })

  // Pinned cells are sticky; the offset is the sum of the pinned widths
  // before them on the same side.
  function pinStyle(column: Column<typeof features, Employee>) {
    const isPinned = column.getIsPinned()
    if (!isPinned) return ''
    const offset =
      isPinned === 'start'
        ? column.getStart('start')
        : column.getAfter('end')
    return [
      'position: sticky',
      `${isPinned === 'start' ? 'left' : 'right'}: ${offset}px`,
      'z-index: 1',
      'background: var(--color-background, white)',
    ].join('; ')
  }
</script>

<table class="w-full border-collapse text-sm">
  <thead>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <tr class="border-b text-left">
        {#each headerGroup.headers as header (header.id)}
          <th class="px-3 py-2 font-medium" style={pinStyle(header.column)}>
            <span class="mr-1"><FlexRender {header} /></span>
            <button
              type="button"
              class="text-xs text-muted-foreground underline"
              onclick={() =>
                header.column.pin(
                  header.column.getIsPinned() === 'start' ? false : 'start',
                )}
            >
              pin
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
          <td class="px-3 py-2" style={pinStyle(cell.column)}>
            <FlexRender {cell} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
