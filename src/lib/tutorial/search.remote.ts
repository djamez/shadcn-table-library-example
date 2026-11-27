import { query } from '$app/server'

import { employeeQuery, searchEmployees } from './search'

// The query wrapper is the only part that has to run through SvelteKit — the
// search logic itself is a plain function in search.ts.
export const searchEmployeesRemote = query(employeeQuery, searchEmployees)
