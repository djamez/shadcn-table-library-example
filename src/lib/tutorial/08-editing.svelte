<script lang="ts">
  import {
    createColumnHelper,
    createTable,
    FlexRender,
    renderComponent,
    tableFeatures,
  } from '@tanstack/svelte-table'

  import EditableCell from './EditableCell.svelte'
  import { employees, type Employee } from './data'

  const features = tableFeatures({})
  const columnHelper = createColumnHelper<typeof features, Employee>()

  // Editing is not table state: the rows live in a rune, and a cell renders
  // an input while it is the active one. The table only reads `rows`.
  let rows = $state(employees.map((employee) => ({ ...employee })))
  let editingId = $state<number | null>(null)
  let draft = $state('')

  function start(id: number, value: string) {
    editingId = id
    draft = value
  }

  function commit(id: number, key: 'name' | 'salary') {
    if (editingId !== id) return
    rows = rows.map((row) =>
      row.id === id
        ? { ...row, [key]: key === 'salary' ? Number(draft) : draft }
        : row,
    )
    editingId = null
  }

  const editable = (key: 'name' | 'salary') => ({
    cell: ({ row }: { row: { original: Employee } }) => {
      const value = String(row.original[key])
      const editing = editingId === row.original.id

      return renderComponent(EditableCell, {
        value,
        editing,
        draft,
        onstart: () => start(row.original.id, value),
        ondraft: (next) => (draft = next),
        oncommit: () => commit(row.original.id, key),
        oncancel: () => (editingId = null),
      })
    },
  })

  const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Name', ...editable('name') }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('department', { header: 'Department' }),
    columnHelper.accessor('role', { header: 'Role' }),
    columnHelper.accessor('status', { header: 'Status' }),
    columnHelper.accessor('salary', { header: 'Salary', ...editable('salary') }),
  ])

  const table = createTable({
    features,
    get data() {
      return rows
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
          <td class="px-3 py-1"><FlexRender {cell} /></td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
