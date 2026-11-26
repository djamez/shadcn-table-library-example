import { query } from '$app/server'
import * as v from 'valibot'

import {
  getUserPageWithFilter as fetchUserPageWithFilter,
  getUsersPage as fetchUsersPage,
  getUsersPageCombined as fetchUsersPageCombined,
} from './data'

const pagination = {
  page: v.pipe(v.number(), v.integer(), v.minValue(0)),
  pageSize: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100)),
}

const filters = {
  ...pagination,
  role: v.optional(v.string(), ''),
  status: v.optional(v.string(), ''),
}

// These run on the server. The components call them with the URL state, so the
// filtering, sorting and slicing happen before a row reaches the browser.
export const getUsersPage = query(
  v.object(pagination),
  async (params) => fetchUsersPage(params),
)

export const getUserPageWithFilter = query(
  v.object(filters),
  async (params) => fetchUserPageWithFilter(params),
)

export const getUsersPageCombined = query(
  v.object({
    ...filters,
    sortBy: v.optional(v.string(), ''),
    sortDir: v.optional(v.picklist(['asc', 'desc']), 'asc'),
  }),
  async (params) => fetchUsersPageCombined(params),
)
