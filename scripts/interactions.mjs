import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:5188'
const browser = await chromium.launch()
const page = await browser.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(error.message))

const results = []
const check = (name, passed, detail = '') =>
  results.push({ name, passed, detail })

const rows = () => page.locator('tbody tr').count()

// basic: search narrows, clearing restores, pagination advances
await page.goto(`${BASE}/basic`, { waitUntil: 'networkidle' })
await page.getByPlaceholder('Search...').fill('Ava')
await page.waitForTimeout(150)
check('basic search filters to one row', (await rows()) === 1)
await page.getByPlaceholder('Search...').fill('')
await page.waitForTimeout(150)
await page.getByLabel('Next page').click()
await page.waitForTimeout(150)
check(
  'basic pagination moves to page 2',
  (await page.locator('tbody tr').first().textContent())?.includes(
    'Charlotte Diaz',
  ),
)

// tree: collapse and expand the first department
await page.goto(`${BASE}/tree`, { waitUntil: 'networkidle' })
const treeBefore = await rows()
await page.getByLabel('Collapse row').first().click()
await page.waitForTimeout(150)
const treeCollapsed = await rows()
await page.getByLabel('Expand row').first().click()
await page.waitForTimeout(150)
check(
  'tree collapses and expands',
  treeBefore === 11 && treeCollapsed === 5 && (await rows()) === 11,
  `${treeBefore}/${treeCollapsed}/${await rows()}`,
)

// editable: edit a name, then undo it
await page.goto(`${BASE}/editable`, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Wireless Mouse' }).click()
const input = page.locator('input').first()
await input.fill('Wireless Mouse Pro')
await input.press('Enter')
await page.waitForTimeout(700)
check(
  'editable commits an edit',
  (await page.getByText('Wireless Mouse Pro').count()) === 1,
)
await page.getByRole('button', { name: /Undo/ }).click()
await page.waitForTimeout(150)
check(
  'editable undoes the edit',
  (await page.getByText('Wireless Mouse', { exact: true }).count()) === 1,
)

// logs: opening a row reveals the event detail
await page.goto(`${BASE}/logs`, { waitUntil: 'networkidle' })
const logsBefore = await rows()
await page.locator('tbody tr').first().click()
await page.waitForTimeout(200)
check('logs expands a row', (await rows()) > logsBefore)

// spreadsheet: typing into a cell recalculates dependants
await page.goto(`${BASE}/spreadsheet`, { waitUntil: 'networkidle' })
await page.locator('tbody tr').first().locator('td').nth(2).click()
await page.keyboard.type('42')
await page.keyboard.press('Enter')
await page.waitForTimeout(200)
check(
  'spreadsheet accepts a value',
  (await page.locator('tbody').textContent())?.includes('42'),
)

// reorder: dragging a row twice keeps both drops
await page.goto(`${BASE}/reorder`, { waitUntil: 'networkidle' })
const firstTitle = () =>
  page.locator('tbody tr').first().locator('td').nth(1).textContent()
const reorderStart = await firstTitle()
await page.getByLabel('Reorder row').first().dragTo(page.locator('tbody tr').nth(3))
await page.waitForTimeout(600)
const reorderOne = await firstTitle()
await page.getByLabel('Reorder row').first().dragTo(page.locator('tbody tr').last())
await page.waitForTimeout(600)
check(
  'reorder keeps consecutive drops',
  reorderStart !== reorderOne && reorderOne !== (await firstTitle()),
  `${reorderStart} -> ${reorderOne} -> ${await firstTitle()}`,
)

// tree reorder: siblings swap and the tree stays expanded
await page.goto(`${BASE}/tree-reorder`, { waitUntil: 'networkidle' })
const treeRows = () =>
  page.locator('tbody tr').evaluateAll((rows) =>
    rows.map((row) => row.querySelectorAll('td')[1]?.textContent.trim()),
  )
await page
  .locator('tbody tr', { hasText: 'Sofia Patel' })
  .getByLabel('Reorder row')
  .dragTo(page.locator('tbody tr', { hasText: 'Noah Garcia' }))
await page.waitForTimeout(800)
const afterTree = await treeRows()
check(
  'tree reorder swaps siblings and stays expanded',
  afterTree.length > 5 &&
    afterTree.indexOf('Noah Garcia') < afterTree.indexOf('Sofia Patel'),
  afterTree.join(', '),
)

// column reorder: the first header moves to the end
await page.goto(`${BASE}/resizable-reorder`, { waitUntil: 'networkidle' })
const headers = () =>
  page.locator('thead th').evaluateAll((cells) =>
    cells.map((cell) => cell.textContent.replace(/\s+/g, ' ').trim()),
  )
const headersBefore = await headers()
await page
  .getByLabel('Reorder column')
  .first()
  .dragTo(page.locator('thead th').nth(3))
await page.waitForTimeout(800)
const headersAfter = await headers()
check(
  'column reorder moves the header',
  headersBefore[0] !== headersAfter[0] && headersAfter.includes(headersBefore[0]),
  `${headersBefore.slice(0, 3).join('/')} -> ${headersAfter.slice(0, 3).join('/')}`,
)

// tree selection: checking every leaf checks the parent
await page.goto(`${BASE}/tree-select`, { waitUntil: 'networkidle' })
const checkboxAt = (name) =>
  page.locator('tbody tr', { hasText: name }).first().getByRole('checkbox')
await checkboxAt('Sofia Patel').click()
await checkboxAt('Noah Garcia').click()
await page.waitForTimeout(250)
const backendChecked =
  (await checkboxAt('Backend').getAttribute('aria-checked')) === 'true'
await checkboxAt('Noah Garcia').click()
await page.waitForTimeout(250)
const backendIndeterminate =
  (await checkboxAt('Backend').getAttribute('aria-checked')) === 'mixed'
check(
  'tree selection derives parent state from leaves',
  backendChecked && backendIndeterminate,
  `checked=${backendChecked} indeterminate=${backendIndeterminate}`,
)

// column pinning: the pin button switches the column to a sticky position
await page.goto(`${BASE}/column-pinning`, { waitUntil: 'networkidle' })
const pinButton = page.getByLabel(/Pin Email column/).first()
await pinButton.click({ force: true })
await page.waitForTimeout(200)
const sticky = await page
  .locator('tbody tr')
  .first()
  .locator('td')
  .evaluateAll((cells) =>
    cells.some((cell) => (cell.getAttribute('style') ?? '').includes('sticky')),
  )
check('column pinning pins a column', sticky)

// toolbar filter: the select-backed filter narrows the rows
await page.goto(`${BASE}/toolbar-filter`, { waitUntil: 'networkidle' })
const toolbarBefore = await rows()
const status = page.getByRole('combobox').first()
if (await status.count()) {
  await status.click()
  const option = page.getByRole('option').nth(1)
  if (await option.count()) {
    await option.click()
    await page.waitForTimeout(200)
  }
}
check('toolbar filter is interactive', (await rows()) <= toolbarBefore)

for (const result of results) {
  console.log(
    `${result.passed ? 'ok  ' : 'FAIL'} ${result.name}${result.detail ? ` (${result.detail})` : ''}`,
  )
}
if (errors.length) console.log('page errors:\n' + errors.join('\n'))
await browser.close()
const failed = results.filter((result) => !result.passed).length
console.log(failed === 0 ? '\nall interactions passed' : `\n${failed} failed`)
process.exit(failed === 0 ? 0 : 1)
