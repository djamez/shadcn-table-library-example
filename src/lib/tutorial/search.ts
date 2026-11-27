import * as v from 'valibot'

import { employees, type Employee } from './data'

const sortKeys = [
  'name',
  'email',
  'department',
  'role',
  'status',
  'salary',
] as const

export const employeeQuery = v.object({
  page: v.pipe(v.number(), v.integer(), v.minValue(0)),
  pageSize: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(50)),
  q: v.optional(v.string(), ''),
  department: v.optional(v.string(), ''),
  sortBy: v.optional(v.picklist(sortKeys), 'name'),
  sortDir: v.optional(v.picklist(['asc', 'desc']), 'asc'),
})

export type EmployeeQuery = v.InferOutput<typeof employeeQuery>

export function searchEmployees({
  page,
  pageSize,
  q,
  department,
  sortBy,
  sortDir,
}: EmployeeQuery) {
  const query = q.trim().toLowerCase()

  const filtered = employees.filter((employee) => {
    if (department && employee.department !== department) return false
    if (!query) return true
    return [employee.name, employee.email, employee.role].some((field) =>
      field.toLowerCase().includes(query),
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    const key = sortBy as keyof Employee
    const aValue = a[key]
    const bValue = b[key]
    if (aValue < bValue) return sortDir === 'desc' ? 1 : -1
    if (aValue > bValue) return sortDir === 'desc' ? -1 : 1
    return 0
  })

  const start = page * pageSize
  return {
    rows: sorted.slice(start, start + pageSize),
    rowCount: sorted.length,
    pageCount: Math.max(1, Math.ceil(sorted.length / pageSize)),
  }
}
