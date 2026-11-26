import { createRawSnippet } from 'svelte'
import {
  renderComponent,
  renderSnippet,
  type ColumnDef,
} from '@tanstack/svelte-table'
import type { V9Features } from '$lib/table-v9-features'
import AmountCell from './AmountCell.svelte'
import CustomerCell from './CustomerCell.svelte'
import StatusBadge from './StatusBadge.svelte'
import type { Invoice } from './data'

export const columns: ColumnDef<V9Features, Invoice>[] = [
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ row }) =>
      renderComponent(CustomerCell, {
        customer: row.original.customer,
        email: row.original.email,
      }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      renderComponent(StatusBadge, { status: row.original.status }),
  },
  {
    accessorKey: 'amount',
    header: () =>
      renderSnippet(
        createRawSnippet(() => ({
          render: () => `<div class="text-right">Amount</div>`,
        })),
      ),
    cell: ({ row }) =>
      renderComponent(AmountCell, { amount: row.original.amount }),
  },
  { accessorKey: 'dueDate', header: 'Due' },
]
