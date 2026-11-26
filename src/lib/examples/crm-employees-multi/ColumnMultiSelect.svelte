<script lang="ts" generics="TData extends RowData">
  import type { Column, RowData } from '@tanstack/svelte-table'
  import type { V9Features } from '$lib/table-v9-features'
  import MultiSelectFilter from './MultiSelectFilter.svelte'

  type Props = {
    column?: Column<V9Features, TData, unknown>
    title: string
    options: string[]
  }

  let { column, title, options }: Props = $props()

  // Counts come from the faceted model, which ignores this column's own filter,
  // so the numbers stay meaningful while you are still picking options.
  const facetedOptions = $derived.by(() => {
    const facets = column?.getFacetedUniqueValues()
    return options.map((option) => ({
      label: option,
      value: option,
      count: facets?.get(option) ?? 0,
    }))
  })

  const selected = $derived((column?.getFilterValue() as string[] | undefined) ?? [])

  // An empty array would still count as an active filter and hide every row,
  // so clearing the last option removes the filter entirely.
  function onChange(values: string[]) {
    column?.setFilterValue(values.length ? values : undefined)
  }
</script>

<MultiSelectFilter {title} options={facetedOptions} bind:selected={() => selected, onChange} />
