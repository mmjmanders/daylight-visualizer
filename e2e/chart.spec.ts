import { test, expect } from '@playwright/test';

test.use({
  permissions: ['geolocation'],
  geolocation: { latitude: 40.71427, longitude: -74.00597 },
});

test('show chart on valid data', async ({ page }) => {
  await page.goto('/');
  await page.locator('button[type=button]').click();
  await page.locator('button[type=submit]').click();
  await page.locator('div.highcharts-container').waitFor();
  await expect(page.locator('div.highcharts-container')).toBeVisible();
});

test('should switch chart type and css class', async ({ page, viewport }) => {
  test.skip(viewport != null && viewport.width < 992, 'Test only runs on wide screens');
  await page.goto('/');
  await page.locator('button[type=button]').click();
  await page.locator('button[type=submit]').click();
  await page.locator('div.highcharts-container').waitFor();
  await expect(page.locator('div.chart-container.polar')).toBeVisible();
  await page.locator('#chartType').selectOption('line');
  await expect(page.locator('div.chart-container.line')).toBeVisible();
});
