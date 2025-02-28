import { test, expect } from '@playwright/test'

const buildSha = process.env.CI ? 'e2e' : 'dev'

test('header should contain "Daylight Visualizer"', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Daylight Visualizer')
})

test(`version should be "${buildSha}"`, async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1 > span')).toContainText(`- ${buildSha}`)
})
