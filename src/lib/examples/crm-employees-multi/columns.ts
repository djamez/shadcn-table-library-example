import { createRawSnippet } from 'svelte'
import {
  renderComponent,
  renderSnippet,
  type ColumnDef,
} from '@tanstack/svelte-table'
import type { V9Features } from '$lib/table-v9-features'
import EmployeeCell from './EmployeeCell.svelte'
import HiredCell from './HiredCell.svelte'
import PerformanceCell from './PerformanceCell.svelte'
import RoleCell from './RoleCell.svelte'
import SalaryCell from './SalaryCell.svelte'
import SelectCheckbox from './SelectCheckbox.svelte'
import StatusBadge from './StatusBadge.svelte'
import type { Employee } from './data'

export const columns: ColumnDef<V9Features, Employee>[] = [
  {
    id: 'select',
    enableSorting: false,
    header: ({ table }) =>
      renderComponent(SelectCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected(),
        onchange: (value) => table.toggleAllPageRowsSelected(value),
        label: 'Select all rows on this page',
      }),
    cell: ({ row }) =>
      renderComponent(SelectCheckbox, {
        checked: row.getIsSelected(),
        onchange: (value) => row.toggleSelected(value),
        label: `Select ${row.original.name}`,
      }),
  },
  {
    accessorKey: 'name',
    header: 'Employee',
    cell: ({ row }) =>
      renderComponent(EmployeeCell, {
        name: row.original.name,
        email: row.original.email,
      }),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) =>
      renderComponent(RoleCell, {
        role: row.original.role,
        department: row.original.department,
      }),
  },
  {
    // Hidden in the table (shown under Role instead) but kept as a real column
    // so the toolbar can filter on it.
    accessorKey: 'department',
    header: 'Department',
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'arrIncludesSome',
    cell: ({ row }) =>
      renderComponent(StatusBadge, { status: row.original.status }),
  },
  { accessorKey: 'location', header: 'Location' },
  { accessorKey: 'manager', header: 'Manager' },
  {
    accessorKey: 'hireDate',
    header: 'Hired',
    cell: ({ row }) =>
      renderComponent(HiredCell, { hireDate: row.original.hireDate }),
  },
  {
    accessorKey: 'performance',
    header: 'Performance',
    cell: ({ row }) =>
      renderComponent(PerformanceCell, {
        performance: row.original.performance,
      }),
  },
  {
    accessorKey: 'salary',
    header: () =>
      renderSnippet(
        createRawSnippet(() => ({
          render: () => `<div class="text-right">Salary</div>`,
        })),
      ),
    cell: ({ row }) =>
      renderComponent(SalaryCell, { salary: row.original.salary }),
  },
]
