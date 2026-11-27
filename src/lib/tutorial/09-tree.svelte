<script lang="ts">
  import {
    createColumnHelper,
    createExpandedRowModel,
    createTable,
    FlexRender,
    renderComponent,
    rowExpandingFeature,
    tableFeatures,
    type ExpandedState,
  } from '@tanstack/svelte-table'

  import TreeNameCell from './TreeNameCell.svelte'
  import { org, type OrgNode } from './data'

  const features = tableFeatures({
    rowExpandingFeature,
    expandedRowModel: createExpandedRowModel(),
  })

  const columnHelper = createColumnHelper<typeof features, OrgNode>()

  const columns = columnHelper.columns([
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ row }) =>
        renderComponent(TreeNameCell, {
          name: row.original.name,
          depth: row.depth,
          canExpand: row.getCanExpand(),
          expanded: row.getIsExpanded(),
          ontoggle: row.getToggleExpandedHandler(),
        }),
    }),
    columnHelper.accessor('role', { header: 'Role' }),
    columnHelper.accessor('status', { header: 'Status' }),
  ])

  let expanded = $state<ExpandedState>(true)

  const table = createTable({
    features,
    get data() {
      return org
    },
    get columns() {
      return columns
    },
    // Tells the tree where a row's children are
    getSubRows: (row) => row.children,
    onExpandedChange: (updater) => {
      expanded = typeof updater === 'function' ? updater(expanded) : updater
    },
    state: {
      get expanded() {
        return expanded
      },
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
