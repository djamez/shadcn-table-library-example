import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:5188'

const routes = [
  '',
  'animated-icons',
  'async-actions',
  'basic',
  'column-pinning',
  'comparison',
  'conditional-formatting',
  'deployments',
  'editable',
  'export-config',
  'export-selected',
  'filter-state-shape',
  'filter-toolbar',
  'grouped',
  'heatmap',
  'infinite-scroll',
  'inventory-allocation',
  'kpi',
  'live-status',
  'logs',
  'master-detail',
  'mobile-cards',
  'params-filter',
  'pivot',
  'production-dashboard',
  'reorder',
  'resizable-reorder',
  'spreadsheet',
  'ssr',
  'toolbar-filter',
  'tree',
  'tree-reorder',
  'tree-select',
  'utility',
  'anomaly-investigation',
  'change-review',
  'cohort-retention',
  'crm-employees',
  'crm-employees-multi',
  'csv-import',
  'draft-rows',
  'empty-state',
  'error-state',
  'file-browser',
  'job-queue',
  'loading-state',
  'permissions-matrix',
  'schedule-matrix',
  'split-detail',
]

const browser = await chromium.launch()
const page = await browser.newPage()

const problems = []
page.on('console', (message) => {
  if (message.type() === 'error') problems.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))

let failures = 0
for (const route of routes) {
  problems.length = 0
  const response = await page.goto(`${BASE}/${route}`, {
    waitUntil: 'networkidle',
  })
  const status = response?.status()
  const rows = await page.locator('tbody tr').count()
  const isGallery = route === ''
  // These examples intentionally start with no rows
  const mayBeEmpty = ['empty-state', 'error-state', 'loading-state'].includes(route)

  if (status !== 200 || (!isGallery && !mayBeEmpty && rows === 0) || problems.length > 0) {
    failures += 1
    console.log(
      `FAIL /${route} status=${status} rows=${rows}\n  ${problems.join('\n  ')}`,
    )
  } else {
    console.log(`ok   /${route} rows=${rows}`)
  }
}

await browser.close()
console.log(failures === 0 ? '\nall routes passed' : `\n${failures} route(s) failed`)
process.exit(failures === 0 ? 0 : 1)
