import { renderComponent, type ColumnDef } from '@tanstack/svelte-table'
import type { V9Features } from '$lib/table-v9-features'
import NameCell from './NameCell.svelte'
import SelectCheckbox from './SelectCheckbox.svelte'

export type OrgNode = {
  id: string
  name: string
  role: string
  status: string
  children?: OrgNode[]
}

export const columns: ColumnDef<V9Features, OrgNode>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      renderComponent(SelectCheckbox, {
        checked: table.getIsAllRowsSelected(),
        indeterminate:
          !table.getIsAllRowsSelected() && table.getIsSomeRowsSelected(),
        onchange: (value) => table.toggleAllRowsSelected(value),
        label: 'Select all rows',
      }),
    cell: ({ row }) => {
      // v9 only reports a row itself as selected; a parent is also checked
      // when every selectable descendant is
      const checked = row.getIsSelected() || row.getIsAllSubRowsSelected()
      return renderComponent(SelectCheckbox, {
        checked,
        indeterminate: !checked && row.getIsSomeSelected(),
        // A parent cascade writes the parent id into selection state; drop
        // ancestors when a child is deselected so the parent derives again
        onchange: (value) =>
          row.toggleSelected(value, { deselectParents: true }),
        label: 'Select row',
      })
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) =>
      renderComponent(NameCell, {
        name: row.original.name,
        depth: row.depth,
        canExpand: row.getCanExpand(),
        expanded: row.getIsExpanded(),
        onToggle: row.getToggleExpandedHandler(),
      }),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    sortFn: 'alphanumeric',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    sortFn: 'basic',
  },
]
