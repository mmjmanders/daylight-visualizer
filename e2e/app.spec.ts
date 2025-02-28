import { test, expect } from '@playwright/test'

test('header should contain "Daylight Visualizer"', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Daylight Visualizer')
})
