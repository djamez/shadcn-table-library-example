<script lang="ts">
  import { columns } from './columns'
  import { departments, employees as initialEmployees, statuses } from './data'

  const employees = $state(initialEmployees)
  import DataTable from './DataTable.svelte'
</script>

<DataTable {columns} data={employees} {departments} {statuses} />
