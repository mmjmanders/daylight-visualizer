import { test, expect } from '@playwright/test'

test.use({ locale: 'nl' })

test('submit button should contain "Verzenden"', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('button[type=submit]')).toContainText('Verzenden')
})
