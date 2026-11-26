import {
  createTable,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type Updater,
} from '@tanstack/svelte-table'
import { v9Features } from '$lib/table-v9-features'
import { columns } from './columns'
import type { TicketMeta, TicketRow } from './styles'

/**
 * The table lives in the demo, not in the component that draws it: the
 * panel's previous and next buttons need its sorted, filtered order.
 * Everything comes in through getters, so the table follows the demo's state.
 */
export function createTicketTable(state: {
  readonly data: TicketRow[]
  readonly sorting: SortingState
  readonly pagination: PaginationState
  /** Derived in the demo: a new array on every read would refilter */
  readonly columnFilters: ColumnFiltersState
  readonly meta: TicketMeta
  setSorting: (updater: Updater<SortingState>) => void
  setPagination: (updater: Updater<PaginationState>) => void
}) {
  return createTable({
    features: v9Features,
    get data() {
      return state.data
    },
    columns,
    getRowId: (ticket) => ticket.id,
    state: {
      get sorting() {
        return state.sorting
      },
      get pagination() {
        return state.pagination
      },
      get columnFilters() {
        return state.columnFilters
      },
    },
    onSortingChange: state.setSorting,
    onPaginationChange: state.setPagination,
    // Editing a ticket or opening one must not move you to page 1; the demo
    // resets the page itself when the filter changes
    autoResetPageIndex: false,
    get meta() {
      return state.meta
    },
  })
}
