<script lang="ts">
  import { FlexRender, createTable } from '@tanstack/svelte-table'
  import { v9Features } from '$lib/table-v9-features'
  import * as Table from '$lib/components/ui/table/index.js'
  import ErrorState from './ErrorState.svelte'
  import { columns } from './columns'
  import type { Invoice } from './data'

  type Props = {
    data: Invoice[]
    error?: Error | null
    isRetrying?: boolean
    onretry?: () => void
  }

  let { data, error = null, isRetrying = false, onretry }: Props = $props()

  const table = createTable({
    features: v9Features,
    get data() {
      return data
    },
    columns,
  })

  // With rows already on screen, keep them and show the error as a banner;
  // with nothing to show, the error takes the place of the body.
  const hasStaleData = $derived(table.getRowModel().rows.length > 0)
</script>

<div class="space-y-3">
  {#if error && hasStaleData}
    <ErrorState
      variant="banner"
      title="Couldn't refresh invoices"
      description="{error.message}. Showing the last loaded data."
      {isRetrying}
      {onretry}
    />
  {/if}
  <div class="overflow-hidden rounded-md border">
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head>
                {#if !header.isPlaceholder}
                  <FlexRender {header} />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#if hasStaleData}
          {#each table.getRowModel().rows as row (row.id)}
            <Table.Row>
              {#each row.getVisibleCells() as cell (cell.id)}
                <Table.Cell>
                  <FlexRender {cell} />
                </Table.Cell>
              {/each}
            </Table.Row>
          {/each}
        {:else}
          <Table.Row class="hover:bg-transparent">
            <Table.Cell colspan={columns.length} class="p-0">
              {#if error}
                <ErrorState
                  title="Something went wrong"
                  description="{error.message}. Check your connection and try again."
                  {isRetrying}
                  {onretry}
                />
              {/if}
            </Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>
  </div>
</div>
