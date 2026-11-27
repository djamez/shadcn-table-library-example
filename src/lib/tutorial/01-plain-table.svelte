<script lang="ts">
  import { employees } from './data'
</script>

<table class="w-full border-collapse text-sm">
  <thead>
    <tr class="border-b text-left">
      <th class="px-3 py-2 font-medium">Name</th>
      <th class="px-3 py-2 font-medium">Email</th>
      <th class="px-3 py-2 font-medium">Department</th>
      <th class="px-3 py-2 font-medium">Role</th>
      <th class="px-3 py-2 font-medium">Status</th>
      <th class="px-3 py-2 text-right font-medium">Salary</th>
    </tr>
  </thead>
  <tbody>
    {#each employees as employee (employee.id)}
      <tr class="border-b last:border-0">
        <td class="px-3 py-2">{employee.name}</td>
        <td class="px-3 py-2 text-muted-foreground">{employee.email}</td>
        <td class="px-3 py-2">{employee.department}</td>
        <td class="px-3 py-2">{employee.role}</td>
        <td class="px-3 py-2">{employee.status}</td>
        <td class="px-3 py-2 text-right tabular-nums">
          ${employee.salary.toLocaleString('en-US')}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
