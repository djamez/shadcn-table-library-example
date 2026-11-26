<script lang="ts">
  import {
    FlexRender,
    createTable,
    type ExpandedState,
  } from '@tanstack/svelte-table'
  import { v9Features } from '$lib/table-v9-features'
  import * as Table from '$lib/components/ui/table/index.js'
  import * as Tooltip from '$lib/components/ui/tooltip/index.js'
  import { cn } from '$lib/utils.js'
  import { columns, rows } from './columns'
  import type { MatrixMeta } from './columns'

  let { roleId, grants, changed, setCells }: MatrixMeta = $props()

  let expanded = $state<ExpandedState>(true)

  const table = createTable({
    features: v9Features,
    data: rows,
    columns,
    getRowId: (row) => row.id,
    getSubRows: (row) => row.subRows,
    state: {
      get expanded() {
        return expanded
      },
    },
    onExpandedChange: (updater) => {
      expanded = typeof updater === 'function' ? updater(expanded) : updater
    },
    // A getter, so cells read the current role and grants on every render
    get meta() {
      return { roleId, grants, changed, setCells }
    },
  })
</script>

<Tooltip.Provider delayDuration={200}>
  <div class="overflow-x-auto rounded-md border">
    <Table.Root class="min-w-[600px]">
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row class="hover:bg-transparent">
            {#each headerGroup.headers as header (header.id)}
              <Table.Head
                class={cn(
                  'h-auto py-2.5',
                  header.column.id === 'resource'
                    ? 'sticky left-0 z-10 bg-background'
                    : 'w-20 text-center',
                  header.column.id === 'all' && 'border-l',
                )}
              >
                <FlexRender {header} />
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <!-- Cells paint the row color themselves: the pinned name column must be opaque -->
          <Table.Row
            class="group/row hover:bg-transparent has-aria-expanded:bg-transparent"
          >
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell
                class={cn(
                  row.getCanExpand()
                    ? 'bg-muted'
                    : 'bg-background group-hover/row:bg-[color-mix(in_oklab,var(--muted)_50%,var(--background))]',
                  cell.column.id === 'resource'
                    ? 'sticky left-0 z-10 max-w-40 sm:max-w-64'
                    : 'text-center [&>*]:align-middle',
                  cell.column.id === 'all' && 'border-l',
                )}
              >
                <FlexRender {cell} />
              </Table.Cell>
            {/each}
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</Tooltip.Provider>
